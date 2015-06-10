var http = require('http'),
	fs = require('fs');

http.createServer(function(request, response)
{
	//d3
	if(request.url.indexOf('/d3.min.js') != -1){
		fs.readFile(__dirname + '/d3.min.js', function(err, data){
			if (err) console.log(err);
			response.writeHead(200, {'Content-Type': 'text/javascript'});
			response.write(data);
			response.end();
		});
	}
	if(request.url.indexOf('/rent.json') != -1){
		fs.readFile(__dirname + '/js/rent.json', function(err, data){
			if (err) console.log(err);
			response.writeHead(200, {'Content-Type': 'application/json'});
			response.write(data);
			response.end();
		});
	}
	
	//index.html css, and js
	if(request.url.indexOf('/index.html') != -1){
		fs.readFile(__dirname + '/index.html', function(err, data){
			if (err) console.log(err);
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(data);
			response.end();
		});
	}
	if(request.url.indexOf('/css/index_topbar.css') != -1){
		fs.readFile(__dirname + '/css/index_topbar.css', function(err, data){
			if (err) console.log(err);
			response.writeHead(200, {'Content-Type': 'text/css'});
			response.end(data);
		});
	}
	if(request.url.indexOf('/css/index_sidebar.css') != -1){
		fs.readFile(__dirname + '/css/index_sidebar.css', function(err, data){
			if (err) console.log(err);
			response.writeHead(200, {'Content-Type': 'text/css'});
			response.end(data);
		});
	}
	if(request.url.indexOf('/css/index_content.css') != -1){
		fs.readFile(__dirname + '/css/index_content.css', function(err, data){
			if (err) console.log(err);
			response.writeHead(200, {'Content-Type': 'text/css'});
			response.end(data);
		});
	}
	if(request.url.indexOf('/js/index_content.js') != -1){
		fs.readFile(__dirname + '/js/index_content.js', function(err, data){
			if (err) console.log(err);
			response.writeHead(200, {'Content-Type': 'text/javascript'});
			response.end(data);
		});
	}	
	
	
	//public pages and css
	if(request.url.indexOf('/Item1.html') != -1){
		fs.readFile(__dirname + '/public/Item1.html', function(err, data){
			if (err) console.log(err);
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(data);
		});
	}
	if(request.url.indexOf('/Item1.css') != -1){
		fs.readFile(__dirname + '/public/css/Item1.css', function(err, data){
			if (err) console.log(err);
			response.writeHead(200, {'Content-Type': 'text/css'});
			response.end(data);
		});
	}
	if(request.url.indexOf('/Item1.js') != -1){
		fs.readFile(__dirname + '/public/js/Item1.js', function(err, data){
			if (err) console.log(err);
			response.writeHead(200, {'Content-Type': 'text/javascript'});
			response.end(data);
		});
	}	
}).listen(8888);
console.log('Server running at http://192.168.1.5:8888');