var data = [
  {key: "Jelly", value: 60, rank: 1 },
  {key: "Jelly", value: 58, rank: 2 },
  {key: "Jelly", value: 59, rank: 3 },
  {key: "Jelly", value: 56, rank: 4 },
  {key: "Jelly", value: 57, rank: 5 },
  {key: "Jelly", value: 55, rank: 6 },
  {key: "Jelly", value: 56, rank: 7 },
  {key: "Jelly", value: 52, rank: 8 },
  {key: "Jelly", value: 54, rank: 9 },
  {key: "Jelly", value: 57, rank: 10 },
  {key: "Jelly", value: 56, rank: 11 }
];
var w = 800;
var h = 450;
var margin = {
  top: 58,
  bottom: 100,
  left: 80,
  right: 40
};
var width = w - margin.left - margin.right;
var height = h - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
      .attr("id", "chart")
      .attr("width", w)
      .attr("height", h);
var chart = svg.append("g")
      .classed("display", true)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
