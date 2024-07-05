const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const hostName = '127.0.0.1';

const handleReadFile = (fileName, statusCode, req, res) => {

    fs.readFile(fileName, "utf-8", (err, data) => {

        if(err) {
            console.log(err);
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.write("<h1>500 Internal Server Error</h1>");
            res.end();
        }
        else {
            res.writeHead(statusCode, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }

    });
};

const server = http.createServer((req, res) => {

    if(req.url === '/') {
        handleReadFile('index.html', 200, req, res);
    }
    else if(req.url === '/about') {
        handleReadFile('about.html', 200, req, res);
    }
    else if(req.url === '/contact') {
        handleReadFile('contact.html', 200, req, res);
    }
    else {
        handleReadFile('404.html', 404, req, res);
    }
    
});

server.listen(PORT, hostName, () => {
    console.log(`Server is running at http://${hostName}:${PORT}`);
});