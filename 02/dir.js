const fs = require('fs');



//create a directory
if(!fs.existsSync('./new')){
    fs.mkdir('./new', (err) => {
        if(err) throw err;
        console.log('Directory created')
    })
}


//delete directory
if(fs.existsSync('./new')){
    fs.rmdir('./new', (err) => {
        if(err) throw err;
        console.log('Directory removed')
    })
}
