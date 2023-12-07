function lineChart() {
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 45, bottom: 40, left: 45};
    var width = document.getElementById('bottom-container-right').clientWidth - margin.left - margin.right;
    var height = document.getElementById('bottom-container-right').clientHeight - margin.top - margin.bottom;
    var data = [];
    var x, xAxis, y, yAxis;
    var svg;

    //Read the data

    this.createLineChart = function(dataset) {

        data = dataset;
        data.sort(sortByDate);

        // console.log(data);

        // append the svg object to the body of the page
        svg = d3.select("#top-container-right")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // console.log(new Date(d3.min(data, function(date) {
        //     console.log(date.month)
        //     return new Date(Date.parse(date.month));
        //   })))

        // Create X axis
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

    function update(dataset) {

        // Update X axis:
        svg.selectAll(".myXaxis")
        .transition()
        .duration(1000)
        .call(xAxis);

        // console.log(dataset)

        // Update Y axis
        y.domain([d3.min(dataset, 
            function(d) {
                // console.log(d.count)
                return d.count
            }
        ), d3.max(dataset, 
            function(d) {
                return d.count
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
        .x(function(d) { return x(new Date(Date.parse(d.month))) })
        .y(function(d) { return y(d.count) }))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
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