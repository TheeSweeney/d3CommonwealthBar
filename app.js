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
          .domain([1980, 2014])
          .range([0, width])
var y = d3.scale.linear()
          .domain([0, 18])
          .range([height, 0])
var xAxis = d3.svg.axis()
              .scale(x)
              .orient('bottom')
              .ticks(12)
              .tickSize(0)
              .tickFormat(function(d){
                return d.toString()
              })
var yAxis = d3.svg.axis()
              .scale(y)
              .orient('left')
var yGridlines = d3.svg.axis()
                  .scale(y)
                  .tickSize(-width, 0, 0)
                  .tickFormat('')
                  .orient('left')
var line = d3.svg.line()
            .x(function(d){
              return x(d.year)
            })
            .y(function(d){
              return y(d.value)
            })


function plotAxes(params){//TODO duplicated in ex4
  this.append('g')
      .classed('gridline y', true)
      .attr('transform','translate(0,0)')
      .call(params.axis.gridlines)


  this.append('g')
      .classed('x axis', true)
      .attr('transform','translate(0,' + (height + 10)+ ')')
      .call(params.axis.x)
  this.append('g')
      .classed('y axis', true)
      .call(params.axis.y)


}

function plotLine(params){//TODO plot points for countries like FR, with 1 datapoint paths
    //enter
  this.selectAll('.trendline' + params.Country)
      .data([params.data])
      .enter()
        .append('path')
        .classed('trendline', true)
        .attr('id', Country + 'line')
        .on('mouseover', function(d, i){
          d3.selectAll('.trendline').style('stroke-opacity', '.3')
          d3.select(this).style('stroke-opacity', '1')
          if(/\d/.exec(this.id)){//if line is part of a split dataset
            for(var i = 1; i < 4; i++){
              var prefix = this.id.split('').splice(0,3).join('')
            console.log('#' + prefix + i + 'line')
            d3.select('#' + prefix + i + 'line').style('stroke-opacity', '1')
            }
          }
        })
        .on('mouseout', function(d, i){
          d3.selectAll('.trendline').style('stroke-opacity', '1')
        })
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

plotAxes.call(chart, {
  axis: {
    x: xAxis,
    y: yAxis,
    gridlines: yGridlines
  }
})

for( var Country in data){
  plotLine.call(chart, {//TODO factor out params obj? somewhat duplicated with plotAxes
    country: Country,
    data: data[Country],
    axis: {
      x: xAxis,
      y: yAxis
    }
  })
}

