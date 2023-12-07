function map(data) {
    var map;
    var rawData;
    var dataset = [];
    var projection = d3.geoAlbersUsa().scale(1300).translate([487.5, 305]);
    var path = d3.geoPath()//.projection(projection);
    var states;
    var svg;
    var g;
    var width = document.getElementById('middle-column').clientWidth;
    var height = document.getElementById('middle-column').clientHeight;
    var fips_dict;
    var symData;
    var coords = [];
    var circle_scale = d3.scaleSqrt().domain([0,1000]).range([2,20]);
    var t_form;
    var g_sym;
    var cities;

    var zoom = d3.zoom()
        .scaleExtent([1,8])
        .on("zoom", zoomed);
    //updateMap(data);
    var currentZoomState = d3.zoomIdentity;

    function filtByCity(e, d){
        console.log(d['City']);
    }

    function formatSymbolData(data, st_id){
        var dataTrim = {};
        coords = [];
        data.forEach(function(d) {
            var loc_len = d.PositionLocation.length;
            for(let i = 0; i < loc_len; i++) {
                let state = d.PositionLocation[i].CountrySubDivisionCode;
                let city = d.PositionLocation[i].CityName;
                if (state == fips_dict[+st_id]) {
                    if (dataTrim[city] == undefined){
                        dataTrim[city] = 1;
                        coords.push({"City":city, "Coords":projection([d.PositionLocation[i].Longitude,d.PositionLocation[i].Latitude]) })
                    }
                    else {
                        dataTrim[city]++;
                    }
                }
            }
        });
        return dataTrim
    }


    function map_symbols(st_id,x0,y0,x1,y1){
        symData = formatSymbolData(rawData, st_id);
        console.log(coords);
        console.log(coords[1]['Coords']);
        g_sym = svgMap.append('g');
        d3.selectAll('circle').remove();
        cities = g_sym.selectAll("circle")
            .attr("class", "cities")
            .data(coords)
            .enter()
            .append("circle")
            .attr("cx", function(d){return d['Coords'][0];})
            .attr("cy", function(d){return d['Coords'][1];})
            .attr("r", function(d){return circle_scale(symData[d['City']]);})
            .attr("fill", "red")
            .attr("stroke", "black")
            .attr("stroke-width", 0.25)
            .attr('transform', t_form)
            .call(zoom.on("zoom", zoomed))
            .on("click", filtByCity)
            .on("mouseenter", function(d) {
                d3.select(this).style("fill", "purple");
                d3.select(this)
                    .append("title")
                    .text(d => d['City'] + "\nJob Openings: " + symData[d['City']]);
            })
            .on("mouseleave", function(d){
                d3.select(this).style("fill", "red");
            });
    }

    function reset() {
        states.transition().style("fill", null);
        svgMap.selectAll('circle').remove();
        svgMap.transition().duration(750).call(
            zoom.transform,
            currentZoomState,
            d3.zoomTransform(svgMap.node()).invert([width / 2, height / 2])
        );
    }

    function create_reset(){
        svgMap.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 100)
            .attr('fill', 'green')
            .text('Reset')
            .on('click', reset);
    }

    function zoomed(e) {
        const {transform} = e;
        t_form = transform;
        g.attr("transform", transform);
        g.attr("stroke-width", 1 / transform.k);
        g_sym.attr("transform", transform);
    }

    async function clicked(e, d) {
        let filts = f.onFilterChange();
        filts.location = {"state": fips_dict[+d.id], "city": "None"};
        await applyFilters(filts);
        
        const [[x0,y0], [x1,y1]] = path.bounds(d);
        e.stopPropagation();
        states.transition()
            .style("fill", null);
        //d3.select(this).transition().style("fill", "red");
        map_symbols(d.id,x0,y0,x1,y1);
        create_reset();

        currentZoomState = d3.zoomTransform(svgMap.node());
        console.log(currentZoomState)

        svgMap.transition().duration(750).call(
            zoom.transform,
            currentZoomState
                .translate(width/2, height/2)
                .scale(Math.min(8, 0.9/Math.max((x1 - x0)/ width, (y1-y0)/height)))
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
            d3.pointer(e, svgMap.node())
        );

    }

    function formatMapData(data) {
        var mapdata = {};

        data.forEach(function(d) {
            var loc_len = d.PositionLocation.length;
            //console.log(loc_len);
            for(let i = 0; i < loc_len; i++) {
                let state = d.PositionLocation[i].CountrySubDivisionCode;
                //console.log(state);
                if (state == undefined) {
                    continue;
                }
                else if (mapdata[state] == undefined) {
                    mapdata[state] = 1;
                }
                else{
                    mapdata[state]++;
                }

            }
        });
        return mapdata;

    }


    this.setupMap = function(data){
        d3.select('map').remove();
        rawData = data
        dataset = formatMapData(data);

        var colorScale = d3.scaleLinear()
            .domain([0, 5000, 10000, 15000, 20000, 25000, 30000])
            .range(d3.schemeBlues[7]);

        svgMap = d3.select("#middle-column").append("svg")
            .attr("id", "map")
            .attr("width", document.getElementById('middle-column').clientWidth)
            .attr("height", document.getElementById('middle-column').clientHeight)
            .on("keydown", reset);

        fips_dict = {};
        d3.csv("State FIPS Mapping.csv").then(function(fips){
            fips.forEach(function(d){
                fips_dict[d.Code] = d.State;
            })
        });
        g = svgMap.append("g");
        d3.json("https://d3js.org/us-10m.v1.json").then(function(us) {

            states = g.append("g")
                .attr("class", "states")
                .attr("cursor", "pointer")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("fill", function(d){
                    let state = fips_dict[+d.id];
                    if (state !== undefined){
                        return colorScale(dataset[state]);
                    }
                })
                .join("path")
                .on("click", clicked)
                .attr("d", path)
                .append("title")
                .text(d => "Total Job Openings: " + dataset[fips_dict[+d.id]]+
                    "\nState: " + fips_dict[+d.id]);

            g.append("path")
                .attr("fill", "none")
                .attr("stroke", "white")
                .attr("stroke-linejoin", "round")
                .attr("d", path(topojson.mesh(us, us.objects.states, (a,b) => a !== b)));
            //svgMap.call(zoom);
        });

        return svgMap.node();
    }

    this.updateMap = function(newData) {
        rawData = newData
        dataset = formatMapData(newData);
        console.log("DATA MAP " + JSON.stringify(newData))
    
        // Update the color scale based on the new data
        var colorScale = d3.scaleLinear()
            .domain([0, 5000, 10000, 15000, 20000, 25000, 30000])
            .range(d3.schemeBlues[7]);
    
        // Update the fill attribute of the map paths
        states.attr("fill", function (d) {
            let state = fips_dict[+d.id];
            if (state !== undefined) {
                return colorScale(dataset[state]);
            }
        });
    
        // Update the title attribute of the map paths
        states.select("title")
            .text(d => "Total Job Openings: " + dataset[fips_dict[+d.id]] +
                "\nState: " + fips_dict[+d.id]);
    }

}
