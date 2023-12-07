function wordCloud(data) {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = document.getElementById('bottom-container-right').clientWidth - margin.left - margin.right,
        height = document.getElementById('bottom-container-right').clientHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select('#top-container-left').append("svg")
        .attr('width', '100%')
        .attr('height', '100%')
        .append("g")
        .attr("transform",
            "translate(" + -1.5 + "," + 0 + ")");

    // Constructs a new cloud layout instance. It runs an algorithm to find the position of words that suits your requirements
    // Wordcloud features that are different from one word to the other must be here
    var layout = d3.layout.cloud()
        .size([width, height])
        .padding(5)        // space between words
        .rotate(0)
        // .rotate(function () { return ~~(Math.random() * 2) * 90; })
        .fontSize(function (d) { return d.size; })      // font size of words
        .on("end", draw);

    // This function takes the output of 'layout' above and draws the words
    // Wordcloud features that are THE SAME from one word to the other can be here
    function draw(words) {
        svg.selectAll("*").remove(); // Clear previous drawings

        var wordLabels = []; // Array to store the labels

        svg.append("g")
            .attr("id", "words")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function (d) { return d.size; })
            .style("fill", "#69b3a2")
            .attr("text-anchor", "middle")
            .style("font-family", "Impact")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) { return d.text; })
            // .on("click", function (d) {
            //     var [clickX, clickY] = d3.mouse(this);

            //     // Adjust the coordinates to be relative to the #top-container-left div
            //     var containerLeft = document.getElementById('top-container-left').getBoundingClientRect().left;
            //     var containerTop = document.getElementById('top-container-left').getBoundingClientRect().top;

            //     var relativeClickX = clickX + containerLeft;
            //     var relativeClickY = clickY + containerTop;

            //     // Add a label when a word is clicked
            //     var label = svg.append("g")
            //         .attr("transform", "translate(" + relativeClickX + "," + relativeClickY + ")")
            //         .attr("class", "word-label");

            //         label.append("rect")
            //         .attr("width", 30)
            //         .attr("height", 20)
            //         .attr("x", -15)
            //         .attr("y", 5)
            //         .style("fill", "#fff")
            //         .style("stroke", "#000");

            //     label.append("text")
            //         .attr("x", 0)
            //         .attr("y", 20)
            //         .attr("text-anchor", "middle")
            //         .style("font-size", "12px")
            //         .text("X")
            //         .on("click", function () {
            //             // Remove the label when X is clicked
            //             label.remove();
            //         });
            //     wordLabels.push(label);
            // });
    }

    // Function to update the word cloud with new data
    function updateWordCloud(newData) {
        layout.words(newData.map(function (d) { return { text: d.word, size: d.size }; }));
        layout.start();
    }

    // Expose the updateWordCloud function if you want to update the word cloud externally
    this.updateWordCloud = updateWordCloud;
}