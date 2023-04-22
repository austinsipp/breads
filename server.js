const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT
//console.log(PORT)
const app= express()
const methodOverride = require('method-override')

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))




app.get('/', (req,res) => {
    res.send('Welcome to an Awesome App about Bread!')
    //res.render('index')
})

const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)


// 404 Page
app.get('*', (req, res) => {
    res.send('404')
  })  


app.listen(PORT, () => {
    console.log('listening on port',PORT)
})