const express = require('express')
const app = express()
const path =require('path');
const PORT = process.env.PORT || 3500;


//built in middleware for urlencoded data like form data
app.use(express.urlencoded({ extended : false}))

//built-in middleware for json
app.use(express.json())

//serve static files
app.use(express.static(path.join(__dirname, '/public')))

// Regex : begin with a / and end with a / or give us index.html
app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname})
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname})
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

//Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html')
}, (req, res) => {
    res.send('Hello, world!')
})


app.get('/old-page(.html) ?', (req, res) => {
    res.redirect(301, '/new-page.html'); // 302 default
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'))

})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))





