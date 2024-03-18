const http = require('http');

const PORT = 3000;

const server = http.createServer((req, resp) => {
//stream - a flow of data that is flowing    
//req - is a readable stream
//resp - is a writable stream     
    resp.writeHead(200, {
        'Content-Type' : 'application/json',
    });

    resp.end(JSON.stringify({
        id:1,
        name: 'Sir Isaac Newton!'
    }));
}); 

server.listen(PORT, () => { //127.0.0.1 => localhost, when we run an app it is important to set the port numnber to redirect the traffic to the correct application from a machine.
    console.log(`Listening on port ${PORT}...`)
});