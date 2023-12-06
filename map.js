function map(data) {
    var map;
    var dataset = [];
    //updateMap(data);


    function formatMapData(data) {
        var base_data = [];
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
        mapdata['Virginia'] += mapdata['District of Columbia'];
        delete mapdata['District of Columbia']
        console.log(mapdata);
        return mapdata;

    }


    function updateMap(newData){
        console.log('MAP');
        //console.log(newData);
        dataset = formatMapData(newData);
        // if(map && typeof map.destroy === 'function'){
        //     map.destroy();
        //     console.log("destroyed");
        // };

        var colorScale = d3.scaleThreshold()
            .domain([0, 5000, 10000, 15000, 20000, 25000, 30000])
            .range(d3.schemeBlues[7]);

        var svg = d3.select("#middle-column").append("svg")
            .attr("width", document.getElementById('middle-column').clientWidth)
            .attr("height", document.getElementById('middle-column').clientHeight)

        var path = d3.geoPath();

        fips_dict = {}
        d3.csv("State FIPS Mapping.csv").then(function(fips){
            fips.forEach(function(d){
                fips_dict[d.Code] = d.State;
            })
        });
        console.log(fips_dict);

        d3.json("https://d3js.org/us-10m.v1.json").then(function(us) {

            svg.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d){
                    let state = fips_dict[+d.id];
                    if (state !== undefined){
                        console.log(state);
                        console.log(dataset[state]);
                        return colorScale(dataset[state]);
                    }
                });

            svg.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
        });

    }

    this.updateMap = updateMap;

}
