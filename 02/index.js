//we use commonjs import in node as against es6 in js
const fsPromises  = require('fs').promises;
const path  =  require('path')



 const fileOps = async () =>{
try {
const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt' ), 'utf8');
console.log(data);
await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));


await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n Nice to meet you');
await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));
const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt' ), 'utf8')
console.log(newData)


} catch (error) {
    console.error(error)

}
 }

fileOps();



// fs.readFile(path.join(__dirname, 'files', 'starter.txt' ), 'utf8', (err, data) => {
//     if(err) throw err;
//     console.log(data)
// })

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt' ), 'Node from scratch',(err) => {
//     if(err) throw err;
//     console.log('Write complete')

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt' ), '\n\n Very explanatory',(err) => {
//     if(err) throw err;
//     console.log('Append complete')

//     fs.rename(path.join(__dirname, 'files', 'reply.txt' ), path.join(__dirname, 'files', 'new_reply.txt' ), (err) => {
//         if(err) throw err;
//         console.log('Rename complete')
// })
// })
// })


//exit on uncaught errors
process.on('uncaughtException', err =>{
    console.error(`There was an uncaught error': ${err}`)
    process.exit(1)
})


