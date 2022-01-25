// Activity 1

// const sandwiches = [
//   { name: "Thesis", price: 7.95, size: "large" },
//   { name: "Dissertation", price: 8.95, size: "large" },
//   { name: "Highlander", price: 6.5, size: "small" },
//   { name: "Just Tuna", price: 6.5, size: "small" },
//   { name: "So-La", price: 7.95, size: "large" },
//   { name: "Special", price: 12.5, size: "small" },
// ];

// const svg = d3
//   .select("body")
//   .append("svg")
//   .attr("width", 500)
//   .attr("height", 500);

// svg
//   .selectAll("circle")
//   .data(sandwiches)
//   .enter()
//   .append("circle")
//   .attr("fill", (s) => {
//     if (s.price < 7.0) return "green";
//     return "yellow";
//   })
//   .attr("width", 50)
//   .attr("height", 50)
//   .attr("r", (s) => {
//     if (s.size === "large") return 30;
//     return 15;
//   })
//   .attr("stroke", "black")
//   .attr("cy", 50)
//   .attr("cx", (d, index) => index * 70 + 50);

// Activity 2

let geo = [];

d3.csv("data/cities_and_population.csv")
  .then((data) => {
    const europe = data.filter((d) => {
      return d.eu === "true";
    });
    d3.select("body")
      .append("p")
      .text("Cities count: " + europe.length);
    europe.forEach((city) => {
      city.population = parseInt(city.population);
      city.x = parseInt(city.x);
      city.y = parseInt(city.y);
    });

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", 700)
      .attr("height", 550);

    // Draw circles
    svg
      .selectAll("circle")
      .data(europe)
      .enter()
      .append("circle")
      .attr("fill", (c) => {
        if (c.population < 1000000) return "yelow";
        return "orange";
      })
      .attr("width", 50)
      .attr("height", 50)
      .attr("r", (c) => {
        if (c.population < 1000000) return "4px";
        return "8px";
      })
      .attr("stroke", "black")
      .attr("cy", (d) => d.y)
      .attr("cx", (d) => d.x);

    // Write text
    svg
      .selectAll("text")
      .data(europe)
      .enter()
      .append("text")
      .text((d) => {
        return d.city;
      })
      .attr("class", "city-label")
      .attr("font-size", 12)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + -12)
      .attr("text-anchor", "middle")
      .attr("opacity", (d) => {
        if (d.population < 1000000) return 0;
      });
  })
  .catch((error) => {
    console.log(error);
  });
