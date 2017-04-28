

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
          .domain(d3.extent(data.AUS, function(d){
            return d.year
          }))
          .range([0, width])
var y = d3.scale.linear()
          .domain([0, d3.max(data.AUS, function(d){
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
var line = d3.svg.line()
            .x(function(d){
              return x(d.year)
            })
            .y(function(d){
              return y(d.value)
            })
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
  this.selectAll('.trendline')
      .data([params.data])
      .enter()
        .append('path')
        .classed('trendline', true)
  //update
  this.selectAll('.trendline')
      .attr('d', function(d){
        return line(d)
      })
  //exit
  this.selectAll('.point')
      .data([params.data])
      .exit()
      .remove()
}

plot.call(chart, {
  data: data.AUS,
  axis: {
    x: xAxis,
    y: yAxis
  }
})