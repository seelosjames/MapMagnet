function lineChart() {
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 45, bottom: 40, left: 45};
    var width = document.getElementById('bottom-container-right').clientWidth - margin.left - margin.right;
    var height = document.getElementById('bottom-container-right').clientHeight - margin.top - margin.bottom;
    var data = [];
    var x, y;
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

            // Add X axis
            x = d3.scaleTime()
            .domain([
                new Date(data[0].year, 0, 1), 
                new Date(data[data.length - 1].year, 0, 1)
            ])
            .range([ 0, width ]);
            svg.append("g") 
            .attr("transform", "translate(0," + height + ")")
            .attr("class","myXaxis")
            .call(d3.axisBottom(x));

            // Add Y axis
            y = d3.scaleLinear()
            .domain([d3.min(data, 
                function(d) {
                    return d.jobs.length
                }
            ) - 10, d3.max(data, 
                function(d) {
                    return d.jobs.length
                }
            ) + 10])
            .range([ height, 0 ]);
            svg.append("g")
            .attr("class","myYaxis")
            .call(d3.axisLeft(y));

            update(data)
        }
    );

    function update(dataset) {
        // Update Y axis
        y.domain([d3.min(dataset, 
            function(d) {
                return d.jobs.length
            }
        ) - 10, d3.max(dataset, 
            function(d) {
                return d.jobs.length
            }
        ) + 10])
        svg.selectAll(".myYaxis").transition()
        .duration(3000)
        .call(y);
      
        // Create a update selection: bind to the new data
        var u = svg.selectAll(".lineTest")
          .data([dataset]);
      
        // UpdatE the line
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
        console.log(filters)
        var temp = [];

        data.forEach(element => {
            temp.push({"year": element.year, "jobs": element.jobs.filter(job => {
                return (
                    (!filters.title || job.title === filters.title) &&
                    (!filters.department || job.department === filters.department || filters.department === 'None') &&
                    (!filters.minGrade || job.grade >= filters.minGrade) &&
                    (!filters.maxGrade || job.grade <= filters.maxGrade) &&
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