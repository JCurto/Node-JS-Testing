
var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#content").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height,0]);

var parseDate = d3.time.format("%Y-%b").parse;
var formatDate = d3.time.format("%Y-%b");

var color = d3.scale.category10();

// Axis Variables
var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");
	
var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

// Line Variables
var line = d3.svg.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.value); });

// Hull Variables	
var hull = d3.geom.hull()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.value); });
	
// Tooltip Variables
var tooltip = d3.select('#content')
	.append('div')
	.attr('class', 'tooltip');

tooltip.append('div')
	.attr('class', 'date');

tooltip.append('div')
	.attr('class', 'label');

tooltip.append('div')
	.attr('class', 'amount');

var tooltipLine = svg
	.append('line')
	.attr('class', 'line');
	
// Voronoi Variables
var voronoi = d3.geom.voronoi()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.value); })
	.clipExtent([[-margin.left, -margin.top], [width + margin.right, height]]);
	
// Load Data		
function datatesting(rent_data){
	color.domain(d3.keys(rent_data[0]).filter(function(key) { return key !== "month"; }));
	
	rent_data.forEach(function(d) {
		d.date = parseDate(d.month);
	});
	
	var utilities = color.domain().map(function(name) {
		return {
			name: name,
			values: rent_data.map(function(d) {
				return {date: d.date, value: +d[name], name: name};
			})
		};
	});
		
	x.domain(d3.extent(rent_data, function(d) { return d.date; }));
	y.domain([
		d3.min(utilities, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
		d3.max(utilities, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
	]);
	
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
	
	svg. append("g")
		.attr("class", "y axis")
		.call(yAxis);
	
	var utility = svg.selectAll(".utility")
			.data(utilities)
		.enter().append("g")
			.attr("class", "utility");
	
	var paths = utility.append("path")
		.attr("class", "line")
		.attr("d", function(d) { return line(d.values); })
		.style("stroke", function(d) { return color(d.name); });
		
	var points = utility.selectAll("circle")
		.data(function(d) { return d.values; })
	  .enter().append("circle")
		.attr("r", 2)
      	.attr("cx", function(d) { return x(d.date); })
		.attr("cy", function(d) { return y(d.value); });
	
	var voronoiGroup = svg.append("g")
		.attr("class", "voronoi");
		
	var voronoiData = d3.nest()
				.key(function(d) { return x(d.date) + "," + y(d.value); })
				.rollup(function(v) { return v[0]; })
				.entries(d3.merge(utilities.map(function(d) { return d.values; })))
				.map(function(d) { return d.values; });
		
	voronoiGroup.selectAll("path")
		.data(voronoi(voronoiData))
	  .enter().append("path")
		.attr("d", function(d) { return "M" + d.join("L") + "Z"; })
		.datum(function(d) { return d.point; })
		.on("mousemove", mousemove)
		.on("mouseout", mouseout);
	
	function mousemove(d) {
		tooltip.select('.date').html(formatDate(d.date));
		tooltip.select('.label').html(d.name);
		tooltip.select('.amount').html("$" + d.value);
		tooltip.style('top', (d3.event.pageY - 50) + 'px')
			.style('left', (d3.event.pageX + 10) + 'px');
		tooltip.style('display', 'block');
		
		tooltipLine
			.style("display", "block")
			.style("stroke", "black")
			.style("stroke-width", "5px")
			.attr("x1", x(d.date))
    		.attr("y1", y(d.value))
    		.attr("x2", (d3.event.pageX - 150) + 'px')
    		.attr("y2", (d3.event.pageY - 150) + 'px');
		
	}
	
	function mouseout(d) {
		tooltip.style('display', 'none');
		tooltipLine.style('display', 'none');
	}
		
	utility.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.value) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; })
	  .style("font-size", "12px")
	  .style("fill", function(d) { return color(d.name); });
		
}

d3.json("rent.json", datatesting);



