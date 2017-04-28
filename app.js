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
var x = d3.scale.linear()
          .domain(d3.extent(data, function(d){
            return d.rank
          }))
          .range([0, width])
var y = d3.scale.linear()
          .domain([0, d3.max(data, function(d){
            return d.value
          })])
          .range([height, 0])
var xAxis = d3.svg.axis()
              .scale(x)
              .orient('bottom')
              .ticks(0)
var yAxis = d3.svg.axis()
              .scale(y)
              .orient('left')
function plot(params){
  this.append('g')
      .classed('x axis', true)
      .attr('transform','translate(0,' + height + ')')
      .call(params.axis.x)
  this.append('g')
      .classed('y axis', true)
      .attr('transform','translate(0,0)')
      .call(params.axis.y)
  
  //enter
  this.selectAll('.point')
      .data(params.data)
      .enter()
        .append('circle')
        .classed('point', true)
        .attr('r', 2)
  //update
  this.selectAll('.point')
      .attr('cx', function(d){
        return x(d.rank)
      })
      .attr('cy', function(d){
        return y(d.value)
      })
  //exit
  this.selectAll('.point')
      .data(params.data)
      .exit()
      .remove();
}

plot.call(chart, {
  data: data,
  axis: {
    x: xAxis,
    y: yAxis
  }
})