function fillBoxesWithD3() {
    fillBoxWithD3('middle-column', 'Big Box');
  }
  
  function fillBoxWithD3(containerId, title) {
    const container = document.getElementById(containerId);
  
    const box = document.createElement('div');
    box.className = 'box';
    container.appendChild(box);
  
    const svg = d3.select(box)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');
  
    const width = box.clientWidth - 20;
    const height = box.clientHeight - 20;
  
    // Dummy data for the line chart
    const data = [1, 2, 3, 4, 5];
  
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, width]);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height, 0]);
  
    const line = d3.line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d));
  
    svg.append('path')
      .data([data])
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);
  
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .text(title);
  }
  
  fillBoxesWithD3();
  