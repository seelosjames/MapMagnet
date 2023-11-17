function map() {
    // Function to update and draw visulazation
    function update_data(data, id, path) {
        svg.selectAll(".counties")
            .data(averageRate)
            .join(function(enter){
                counties = enter.append("g").attr("class", "counties");
                counties.append("g")
                    .attr("class", function(d) { return d["county"] })
                    .selectAll("path")
                    .data(id.features)
                    .enter().append("path")
                    .attr("d", path)
                    .style("fill", function(d) {
                        currentCounty = -1;
                        averageRate.forEach(function(county, i) {
                            averageRate[i]["county"]
                            if(averageRate[i]["county"] == d.properties.NAME) {
                                currentCounty = i;
                            }
                        });

                        if(currentCounty == -1){
                            return "white";
                        } 
                        else {
                            // console.log(dataset[currentCounty]["county"])
                            return fill(averageRate[currentCounty][current]);
                        }
                    })
                    .on("dblclick", function() {
                        window.open("https://www.idaho.gov/")} )
                    .on("mouseenter", function(e, d) {
                        d3.select(this).style("fill", "red");

                        // console.log(current);
                    })
                    .on("mouseleave", function(e, d){
                        // console.log(d.properties.NAME)
                        d3.select(this).style("fill", function(d){
                            currentCounty = -1;
                            averageRate.forEach(function(county, i) {
                                if(averageRate[i]["county"] == d.properties.NAME) {
                                    
                                    currentCounty = i;
                                }
                            });
                
                            if(currentCounty == -1){
                                return "white";
                            } 
                            else {
                                return fill(averageRate[currentCounty][current]);
                            }
                        });

                    })
                },
                function(update){
                    update.select("counties").transition().duration(200)
                        .style("fill", function(d) {
                            currentCounty = -1;
                            averageRate.forEach(function(county, i) {
                                if(averageRate[i]["county"] == d.properties.NAME) {
                                    currentCounty = i;
                                }
                            });
        
                            if(currentCounty == -1){
                                return "white";
                            } 
                            else {
                                
                                return fill(averageRate[currentCounty][current]);
                            }
                        })
                },
                function(exit){
                  return exit.remove();
                }
        )
    }
    let path;
    let state;
    let current = "Rate";
    let dataset = [];
    let averageRate = [];
    let width = document.getElementById('middle-column').clientWidth
    let height = document.getElementById('middle-column').clientHeight

    let fill = d3.scaleLog()
            .range(["#eff3ff", "#08519c"]);

    let svg = d3.select("#middle-column").append("svg")
            .attr("width", '100%')
            .attr("height", '100%');

    d3.json("data/idaho-counties.json").then(function(id) {
        id = topojson.feature(id, id.objects.cb_2015_idaho_county_20m);

        let projection = d3.geoMercator()
                .scale(1)
                .translate([0, 0]);

        path = d3.geoPath()
                .projection(projection);

        let b = path.bounds(id),
                s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
                t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        projection
                .scale(s)
                .translate(t);

        d3.csv("data/output.csv").then(function(data){
            // console.log(data)
            // console.log(data.length)
            data.forEach(function(key) {
                
                // console.log(key)
                if(key.State == "Idaho") {
                        dataset.push({"county": key.County.replace(/ County$/, ''), "Rate": +key.Rate});
                    }                
            });

            // Average all the data
            let countyData = {};
            dataset.forEach(entry => {
                const { county, Rate } = entry;
            
                if (county in countyData) {
                    countyData[county].totalRate += Rate;
                    countyData[county].count += 1;
                } else {
                    countyData[county] = { totalRate: Rate, count: 1 };
                }
            });

            averageRate = Object.keys(countyData).map(county => ({
                county,
                Rate: countyData[county].totalRate / countyData[county].count,
            }));
            
            // console.log(averageRate);


            // fill
            fill.domain([d3.min(averageRate, function(d){
                return +d[current];
            }), d3.max(averageRate, function(d){
                // console.log(+d[current])
                return +d[current];
            })]);
            state = id;


            // Draw vis
            update_data(averageRate, state, path);


            // Legend
            let legendWidth = 300;
            let legendHeight = 100
            let colors = ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"];
            let fillRange = [];

            for(let i = 0; i <= colors.length; i++) {
                fillRange.push(legendWidth/colors.length * i);
            }

            let axisScale = d3.scaleQuantile().range(fillRange);
            let min = d3.min(averageRate, function(d){
                return +d[current];
            });
            let max = d3.max(averageRate, function(d){
                // console.log(+d[current])
                return +d[current];
            })

            let diff = (max - min)/colors.length;
            let LegendScale = [];
            for(let i = 0;i <= colors.length;i++) {
                LegendScale.push(diff * (i + 1) + min);
            }
                
            axisScale.domain(LegendScale);

            let legendaxis = d3.axisBottom(axisScale).tickFormat(x=>  x.toFixed(1) + "%");

            let legend = svg.selectAll(".legend").data(colors).enter().append("g").attr("transform", "translate(" + (width / 2 - legendWidth / 2) + ", " + (height - 40) + ")")

            legend.append("rect").attr("width", legendWidth/colors.length).attr("height", 20).style("fill", d=>d)
                .attr("x", (d,i)=> legendWidth/colors.length * i)

            svg.append("g").attr("class", "axis")
                .attr("transform", "translate(" + (width/2 - legendWidth/2) + ", " + (height - legendHeight + 80) + ")")
                .call(legendaxis);
                
        });
    });

    // highlight to fill with red
    this.highlight = function(d){
        svg.selectAll("." + d).style("fill", "red");
    }

    // unhighlight to return to original color
    this.unhighlight = function(d){
        svg.selectAll("." + d).style("fill", function(d){
            currentCounty = -1;
            averageRate.forEach(function(county, i) {
                // dataset[i]["county"]
                if(averageRate[i]["county"] == d) {
                    currentCounty = i;
                }
            });

            if(currentCounty == -1){
                return "white";
            } 
            else {
                return fill(averageRate[currentCounty][current]);
            }
        });
    }
}

map();