function areaLineChart() {
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 45, bottom: 40, left: 45},
    width = document.getElementById('bottom-container-right').clientWidth - margin.left - margin.right,
    height = document.getElementById('bottom-container-right').clientHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#bottom-container-right")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.json("test_data/data.json").then(
        function(data) {
            data = data.jobs;

            // Get max, min, and mean salary for each year
            let max = [];
            let min = [];
            let mean = [];
            data.forEach(function(d) {
                max.push(d3.max(d.jobs, function(j) { return j.salary; }));

                min.push(d3.min(d.jobs, function(j) { return j.salary; }));

                mean.push(d3.mean(d.jobs, function(j) { return j.salary; }));
            })

            // Add X scale
            var x = d3.scaleTime()
            .domain([
                new Date(data[0].year, 0, 1), 
                new Date(data[data.length - 1].year, 0, 1)
            ])
            .range([ 0, width ]);

            // Add Y scale
            var y = d3.scaleLinear()
            .domain([d3.min(min) - 10000, d3.max(max) + 10000])
            .range([ height, 0 ]);

            // Show confidence interval
            svg.append("path")
            .datum(data)
            .attr("fill", "#cce5df")
            .attr("stroke", "none")
            .attr("d", d3.area()
                .x(function(d) { return x(new Date(d.year, 0, 1)) })
                .y0(function(d, i) { return (y(min[i]) + y(mean[i])) / 2})
                .y1(function(d, i) { return (y(max[i]) + y(mean[i])) / 2})
                )

            // Add the line
            svg
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(new Date(d.year, 0, 1)) })
                .y(function(d, i) { return y(mean[i])})
            )

            // Add Y axis
            svg.append("g")
            .call(d3.axisLeft(y));

            // Add X axis
            svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        }
    )
}