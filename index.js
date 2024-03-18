const http = require('http');
const PORT = 3000;

const server = http.createServer((req, resp) => {
//stream - a flow of data that is flowing    
//req - is a readable stream
//resp - is a writable stream     

    if(req.url === '/friends')
    {

       /*  resp.writeHead(200, {
            'Content-Type' : 'application/json',
        });
     */
        // OR 
        resp.statusCode = 200;
        resp.setHeader('Content-Type', 'application/json');

        resp.end(JSON.stringify({
            id:1,
            name: 'Sir Isaac Newton!'
        }));
    } 
    else if (req.url === '/messages') 
    { 
        //resp.statusCode = 200; by default is 200
        resp.setHeader('Content-Type', 'text/html');

        resp.write('<html>');
        resp.write('<body>');
        resp.write('<ul>');
        resp.write('<li>Hello Isaac!</li>');
        resp.write('<li>What are you thoughts on astronomy?</li>');
        resp.write('</ul>');
        resp.write('</body>');
        resp.write('</html>');
        resp.end();
    }
    else
    {
        resp.statusCode = 404;
        resp.end();
    }
}); 

server.listen(PORT, () => { //127.0.0.1 => localhost, when we run an app it is important to set the port numnber to redirect the traffic to the correct application from a machine.
    console.log(`Listening on port ${PORT}...`)
});