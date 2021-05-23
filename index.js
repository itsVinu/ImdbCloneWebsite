const express = require('express')
const app = express()

app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//Routes
const homeRoute = require('./routes/home')
const movieRoute = require('./routes/movie')
const tvRoute = require('./routes/tvshows')

app.use(homeRoute)
app.use(movieRoute)
app.use(tvRoute)




app.listen(3000,(req,res)=>{
    console.log('server started at port 3000 successfully')
})
