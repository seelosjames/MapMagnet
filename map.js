function map() {
    var svg = d3.select("#middle-column").append("svg")
    .attr("width", "100%")
    .attr("height", "100%")

    var path = d3.geoPath();
    
    d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
      if (error) throw error;
    
      svg.append("g")
          .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
          .attr("d", path);
    
      svg.append("path")
          .attr("class", "state-borders")
          .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
    });
}

map();