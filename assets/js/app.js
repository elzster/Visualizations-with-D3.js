//Initial Setup of Chart
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import CSV Data
d3.csv("assets/data/data.csv").then(function(healthData) {
    
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    healthData.forEach(function(data) {
        // console.log(data)//works.
        // console.log(data.abbr)//prints abbreviation
        // console.log(data.age)//prints age
        // console.log(data.state)
      });
});