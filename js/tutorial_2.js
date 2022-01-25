const margin = { top: 20, right: 30, bottom: 30, left: 50 };
const quarterlyReport = [
  { month: "May", sales: 6900 },
  { month: "June", sales: 14240 },
  { month: "July", sales: 25000 },
  { month: "August", sales: 17500 },
];

const months = quarterlyReport.map((d) => d.month);
const salesExtent = d3.extent(quarterlyReport, (d) => d.sales);

const width = 500;
const height = 120;

const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(quarterlyReport, (d) => d.sales)])
  .range([0, width]);

const yScale = d3
  .scaleBand()
  .domain(months)
  .range([0, height])
  .paddingInner(0.1);

const xAxis = d3.axisBottom().scale(xScale).tickSizeOuter(0).ticks(6);
const yAxis = d3.axisLeft().scale(yScale).tickSizeOuter(0);

// Draw axis
const xAxisGroup = svg
  .append("g")
  .attr("class", "axis x-axis")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);
const yAxisGroup = svg.append("g").attr("class", "axis y-axis").call(yAxis);

const bars = svg
  .selectAll("rect")
  .data(quarterlyReport)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("fill", "steelblue")
  .attr("width", (d) => xScale(d.sales))
  .attr("height", yScale.bandwidth())
  .attr("y", (d) => yScale(d.month))
  .attr("x", 0);

/**
 * Load data from CSV file asynchronously and render bar chart
 */
d3.csv('data/sales.csv')
  .then(data => {
    // Convert sales strings to numbers
    data.forEach(d => {
      d.sales = +d.sales;
    });
    
    // Initialize chart
    const barchart = new Barchart({ parentElement: '#barchart'}, data);
    
    // Show chart
    barchart.updateVis();
  })
  .catch(error => console.error(error));