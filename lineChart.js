function lineChart() {
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 45, bottom: 40, left: 45};
    var width = document.getElementById('bottom-container-right').clientWidth - margin.left - margin.right;
    var height = document.getElementById('bottom-container-right').clientHeight - margin.top - margin.bottom;
    var data = [];
    var x, xAxis, y, yAxis;
    var svg;

    //Read the data
    d3.json("test_data/data.json").then(
        function(dataset) {
            data = dataset.jobs;

            // console.log(data)

            // append the svg object to the body of the page
            svg = d3.select("#top-container-right")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Create X axis
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

            // Create Y axis
            y = d3.scaleLinear().range([ height, 0 ]);
            yAxis = d3.axisLeft().scale(y);
            svg.append("g")
            .attr("class","myYaxis");

            update(data)
        }
    );

    function update(dataset) {

        // Update X axis:
        svg.selectAll(".myXaxis")
        .transition()
        .duration(1000)
        .call(xAxis);

        // Update Y axis
        y.domain([d3.min(dataset, 
            function(d) {
                return d.jobs.length
            }
        ), d3.max(dataset, 
            function(d) {
                return d.jobs.length
            }
        )])
        svg.selectAll(".myYaxis")
        .transition()
        .duration(1000)
        .call(yAxis);
        
        // Create a update selection: bind to the new data
        var u = svg.selectAll(".lineTest").data([dataset]);
        
        // Update the line
        u
        .enter()
        .append("path")
        .attr("class","lineTest")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
        .x(function(d) { return x(new Date(d.year, 0, 1)) })
        .y(function(d) { return y(d.jobs.length) }))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
    }
    
    this.filterJobs = function(filters) {
        var temp = [];

        data.forEach(element => {
            temp.push({"year": element.year, "jobs": element.jobs.filter(job => {
                return (
                    (!filters.department || job.department === filters.department || filters.department === 'None') &&
                    (!filters.location || job.location === filters.location || filters.location === 'None') &&
                    (!filters.minSalary || job.salary >= filters.minSalary) &&
                    (!filters.maxSalary || job.salary <= filters.maxSalary) &&
                    (!filters.securityClearance || job.securityClearance === filters.securityClearance) &&
                    (!filters.telework || job.telework === filters.telework) &&
                    (!filters.relocationReimbursement || job.relocationReimbursement === filters.relocationReimbursement)
                );
            })})
        });
        
        update(temp);
    };
}