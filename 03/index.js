const logEvents =require('./logEvents');


const EventEmitter = require('events');


class MyEmitter extends EventEmitter{};

//initialize object
const myEmitter = new MyEmitter();


//add a listener for the log events
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() =>{
    //Emit events
myEmitter.emit('log', 'Log event emitted');
}, 2000)