const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forcast = require('./utils/forcast')
const { read } = require('fs')

console.log(__dirname) //Path to src folder
console.log(path.join(__dirname, '../public'))

const app = express()

//Define Path for express config
const publicDirectoritory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')


//Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoritory))

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        author: "Swaraj Rath"
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Swaraj Rath",
        author: "Bruce Wayne"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        msg: "This is the help page",
        author: "Batman"
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geoCode(req.query.address, (error, { Latitude, Longitude, Location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forcast(Latitude, Longitude, (error, forcastData) => {
            if (error) {
                return read.send({ error })
            }
            res.send({
                forecast: forcastData,
                Location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 ERROR",
        author: "Swaraj Rath",
        errorMessage: "Help Article not found"
    })
})

//it needs to come last
app.get('*', (req, res) => {
    res.render('404', {
        title: "404 ERROR",
        author: "Swaraj Rath",
        errorMessage: "This page not found"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})