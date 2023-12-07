function areaLineChart() {
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 35, bottom: 40, left: 45},
    width = document.getElementById('bottom-container-right').clientWidth - margin.left - margin.right,
    height = document.getElementById('bottom-container-right').clientHeight - margin.top - margin.bottom;
    var data = [];
    var x, xAxis, y, yAxis;
    var svg;

    this.createAreaLineChart = function(dataset) {
        data = dataset;
        data.sort(sortByDate);
        console.log(data);

        svg = d3.select("#bottom-container-right")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // Create X scale
        x = d3.scaleTime()
        .domain([
            new Date(d3.min(dataset, function(date) {
                // console.log(date.month)
                return new Date(Date.parse(date.month));
            })),
            new Date(d3.max(dataset, function(date) {
                // console.log(date.month)
                return new Date(Date.parse(date.month));
            }))
        ])
        .range([ 1, width ]);
        xAxis = d3.axisBottom().scale(x).tickFormat(d3.timeFormat("%b %y"));
        svg.append("g") 
        .attr("transform", "translate(0," + height + ")")
        .attr("class","myXaxis");

        // Create Y scale
        y = d3.scaleLinear().range([ height, 0 ]);
        yAxis = d3.axisLeft().scale(y);

        // Place Y Axis
        svg.append("g")
        .attr("class","myYaxis");

        update(data);
    }

    function update(dataset) {

        // Update X axis:
        svg.selectAll(".myXaxis")
        .transition()
        .duration(1000)
        .call(xAxis);

        // Update Y axis
        y.domain([
            d3.min(dataset, function(d) {
                return d.minSalary
            }), 
            d3.max(dataset, function(d) {
                return d.averageMaxSalary + 10000
            })
        ]);
        svg.selectAll(".myYaxis")
        .transition()
        .duration(1000)
        .call(yAxis);

        // Update the path
        var v = svg.selectAll(".areaTest").data([dataset]);
        v
        .enter()
        .append("path")
        .attr("class","areaTest")
        .merge(v)
        .transition()
        .duration(1000)
        .attr("d", d3.area()
            .x(function(d) { return x(new Date(Date.parse(d.month))) })
            .y0(function(d) { return y(d.averageMinSalary) })
            .y1(function(d) { return y(d.averageMaxSalary) })
        )
        .attr("fill", "#cce5df")
        .attr("stroke", "none");

        // Update the line
        var u = svg.selectAll(".lineTest").data([dataset]);
        u
        .enter()
        .append("path")
        .attr("class","lineTest")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
        .x(function(d) { return x(new Date(Date.parse(d.month))) })
        .y(function(d) { return y((d.averageMaxSalary + d.averageMinSalary) / 2) })
        )
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5);
    }

    this.filterJobs = function(filters) {
        console.log(filters)
        filters.sort(sortByDate);        
        update(filters);
    };

    function sortByDate(a, b) {
        var dateA = new Date(a.month + " 1");
        var dateB = new Date(b.month + " 1");
        return dateA - dateB;
    };
}