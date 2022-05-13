const http = require('http');
const path =require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter{};
//initialize object
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;

const serveFile = async(filePath, contentType, response)=>{
try {

    const rawData =  await fsPromises.readFile(
        filePath,
        !contentType.includes('image') ? 'utf8' :''
        );
    const data =contentType === 'application/json'? JSON.parse(rawData):rawData;
    response.writeHead(
        filePath.includes('404.html') ? 404 : 200,
         {'content-type': contentType});
    response.end(
      contentType === 'application/json'? JSON.stringify(data) : data
    )

} catch (error) {
    console.log(error)
    myEmitter.emit('log', `${err.name}: ${err.message}`,'errLog.txt' );
    response.statusCode =500;
    response.end();

}
}

const server = http.createServer((req, res) => {
      console.log(req.url, req.method);
      myEmitter.emit('log', `${req.url}\t${req.method}`,'reqLog.txt' );

const extension = path.extname(req.url);

     let contentType;

     switch(extension) {
        case '.css':
        contentType = 'text/css';
        break;
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.json':
          contentType = 'application/json';
          break;
        case '.jpg':
          contentType = 'image/jpeg';
          break;
        case '.png':
           contentType = 'text/png';
           break;
        case '.txt':
           contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html'
     }


     //everything that starts with content type here is a conditional statement
    //while everything that starts with content type is a result
let filePath =
    contentType === 'text/html' && req.url === '/' ? path.join(__dirname, 'views', 'index.html')
    : contentType === 'text/html'&&req.url.slice(0, -1) === '/' ? path.join(__dirname, 'views', req.url, 'index.html')
    :contentType === 'text/html'
    ? path.join(__dirname, 'views', req.url)
    : path.join(__dirname, req.url);


    //req.url.slice(-1) refers to the last character of the request url ie.html
if(!extension && req.url.slice(-1) !== '/') filePath += '.html';

const fileExists = fs.existsSync(filePath);

if(fileExists){
    //serve the file
    serveFile(filePath, contentType, res)
}else{
        switch(path.parse(filePath).base){
        case 'old-page.html':
            res.writeHead(301, {'location' : '/new-page.html'});
            res.end();
            break;

        case 'www-page.html':
            res.writeHead(301, {'location' : '/'});
            res.end();
            break;
        default:
        //serve a 404 response
        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);


        }
}

})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))





