function areaLineChart() {
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 45, bottom: 40, left: 45},
    width = document.getElementById('bottom-container-right').clientWidth - margin.left - margin.right,
    height = document.getElementById('bottom-container-right').clientHeight - margin.top - margin.bottom;
    var data = [];
    var x, xAxis, y, yAxis;
    var svg;
    var max = [];
    var min = [];
    var mean = [];



    //Read the data
    d3.json("test_data/data.json").then(
        function(dataset) {
            data = dataset.jobs;

            // console.log(data)

            // append the svg object to the body of the page
            svg = d3.select("#bottom-container-right")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Get max, min, and mean salary for each year
            data.forEach(function(d) {
                max.push(d3.max(d.jobs, function(j) { return j.salary; }));
                min.push(d3.min(d.jobs, function(j) { return j.salary; }));
                mean.push(d3.mean(d.jobs, function(j) { return j.salary; }));
            })

            // Create X scale
            x = d3.scaleTime()
            .domain([
                new Date(data[0].year, 0, 1), 
                new Date(data[data.length - 1].year, 0, 1)
            ])
            .range([ 1, width ]);
            xAxis = d3.axisBottom().scale(x);
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
    );

    function update(dataset) {

        // Update X axis:
        svg.selectAll(".myXaxis")
        .transition()
        .duration(1000)
        .call(xAxis);

        // Update Y axis
        y.domain([d3.min(min), d3.max(max)]);
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
            .x(function(d) { return x(new Date(d.year, 0, 1)) })
            .y0(function(d, i) { return (y(min[i]) + y(mean[i])) / 2})
            .y1(function(d, i) { return (y(max[i]) + y(mean[i])) / 2})
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
        .x(function(d) { return x(new Date(d.year, 0, 1)) })
        .y(function(d, i) { return y(mean[i]) })
        )
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5);
    }

    this.filterJobs = function(filters) {
        var temp = [];

        data.forEach(element => {
            temp.push({"year": element.year, "jobs": element.jobs.filter(job => {
                return (
                    (!filters.department || job.department === filters.department || filters.department === 'None') &&
                    (!filters.minSalary || job.salary >= filters.minSalary) &&
                    (!filters.maxSalary || job.salary <= filters.maxSalary) &&
                    (!filters.securityClearance || job.securityClearance === filters.securityClearance) &&
                    (!filters.telework || job.telework === filters.telework) &&
                    (!filters.relocationReimbursement || job.relocationReimbursement === filters.relocationReimbursement)
                );
            })})
        });

        // Update max, min, and mean salary for each year
        max = [];
        min = [];
        mean = [];        
        temp.forEach(function(d) {
            max.push(d3.max(d.jobs, function(j) { return j.salary; }));
            min.push(d3.min(d.jobs, function(j) { return j.salary; }));
            mean.push(d3.mean(d.jobs, function(j) { return j.salary; }));
        })

        update(temp);
    };
}