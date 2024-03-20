const http = require('http');
const PORT = 3000;

const server = http.createServer();

const friends = [
    {
        id: 0,
        name: 'Nikola Tesla',
    },
    {
        id: 1,
        name: 'Sir Isaac Newtor',
    },
    {
        id: 2,
        name: 'Albert Einstein'
    }
]

server.on('request', (req, resp) => {
    const items = req.url.split('/');

//stream - a flow of data that is flowing    
//req - is a readable stream
//resp - is a writable stream     

    if(req.method === 'POST' && items[1] === 'friends')
    {
        /* From browser console run this to POST a new friend: 
        
        fetch('http://localhost:3000/friends', 
          {
              method: 'POST',
              body: JSON.stringify({id: 4, name: 'Elon Musk'})
           }) */
        req.on('data', (data) =>{
            const friend = data.toString();

            console.log('Request:', friend);

            friends.push(JSON.parse(friend));
        })
    }
    else if(req.method === 'GET' && items[1] === 'friends')
    {
       /*  resp.writeHead(200, {
            'Content-Type' : 'application/json',
        });
     */
        // OR 
        resp.statusCode = 200;
        resp.setHeader('Content-Type', 'application/json');

        if(items.length === 3)
        {
            const friendIndex = Number(items[2]); //from text to numnber + in front of variable OR use Number(items[2]);
            resp.end(JSON.stringify(friends[friendIndex]));
        }
        else
        {
            resp.end(JSON.stringify(friends));
        }
        
    } 
    else if (req.method === 'GET' && items[1] === 'messages') 
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