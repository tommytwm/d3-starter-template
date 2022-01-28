class Barchart {
  constructor(_config, _data) {
    // ... Class constructor ...
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 1000,
      containerHeight: _config.containerHeight || 500,
      margin: _config.margin || { top: 20, right: 20, bottom: 30, left: 40 },
    };
    this.data = _data;
    this.initVis();
  }

  initVis() {
    let vis = this;

    vis.width =
      vis.config.containerWidth -
      vis.config.margin.left -
      vis.config.margin.right;
    vis.height =
      vis.config.containerHeight -
      vis.config.margin.top -
      vis.config.margin.bottom;

    vis.xScale = d3.scaleBand().range([0, vis.width]);
    vis.yScale = d3.scaleLinear().range([0, vis.height]);

    // Define axes
    vis.xAxis = d3.axisBottom(vis.xScale).tickSize(5).tickPadding(5);

    vis.yAxis = d3.axisLeft(vis.yScale).tickSize(5).tickPadding(10);

    // Append empty svg and define its dimensions
    vis.svg = d3
      .select(vis.config.parentElement)
      .attr("height", vis.config.containerHeight)
      .attr("width", vis.config.containerWidth);

    vis.chart = vis.svg
      .append("g")
      .attr(
        "transform",
        `translate(${vis.config.margin.left}, ${vis.config.margin.top})`
      );

    // Append axes
    vis.xAxisG = vis.chart
      .append("g")
      .attr("class", "axis x-axis")
      .attr("transform", `translate(0, ${vis.height})`);
    vis.yAxisG = vis.chart.append("g").attr("class", "axis y-axis");
  }

  updateVis() {
    let vis = this;

    vis.xValue = vis.data.map((d) => d.state);
    vis.yValue = vis.data.map((d) => d.percent);
    console.log(d3.max(vis.yValue));

    vis.xScale.domain(vis.xValue);
    vis.yScale.domain([d3.max(vis.yValue), 0]);

    vis.renderVis();
  }

  renderVis() {
    let vis = this;

    // Render the axes
    vis.xAxisG.call(vis.xAxis);
    // vis.chart
    //   .append("text")
    //   .attr("class", "x-axis label")
    //   .attr("text-anchor", "end")
    //   .attr("x", vis.width)
    //   .attr("y", vis.height)
    //   .attr("style", "color: black; font-weight: normal;")
    //   .text("State");
    vis.yAxisG.call(vis.yAxis);
    // vis.chart
    //   .append("text")
    //   .attr("class", "y-axis label")
    //   .attr("text-anchor", "end")
    //   .attr("y", vis.height)
    //   .attr("style", "color: black; font-weight: normal;")
    //   .text("Percent Drinking (female, binge)");
  }
}
