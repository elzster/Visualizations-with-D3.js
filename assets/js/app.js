//Initial Setup of Chart
var svgWidth = 960;
var svgHeight = 580;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("div")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import CSV Data
d3.csv("assets/data/data.csv").then( healthData => {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    healthData.forEach( data => {
        data.state = data.state
        data.poverty = +data.poverty
        data.healthcare= +data.healthcare
        data.abbr = data.abbr
        });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(healthData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([3, d3.max(healthData, d => d.healthcare)])
      .range([height, 0]);
    
    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
      .data(healthData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "15")
      .attr("fill", "purple")
      .style("text-anchor", "middle")
      .attr("opacity", ".85");

    //append text to all circles in chart.
    var circlesGroup = chartGroup.selectAll()
      .data(healthData)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d.poverty))
      .attr("y", d => yLinearScale(d.healthcare))
      .style("font-size", "13px")
      .style("text-anchor", "middle")
      .style('fill', 'white')
      .text(d => (d.abbr))


    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function (d) {
          return (`${d.state}<br>Poverty: ${d.poverty}%<br>HealthCare
          : ${d.healthcare}%`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    //refers to "this element"

    circlesGroup.on("click", data => {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", (data, index) => {
        toolTip.hide(data);
      });
      // // Create axes labels
      chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", -50 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
      .style('stroke', 'Black')
      .text("Lacks Healthcare %");

      chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
      .style('stroke', 'Black')
      .text("Poverty %");
  }).catch(function(error) {
    console.log(error);
  });
    