import path, { dirname } from "path"
import express from "express"
import hbs from "hbs"
import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'

const app = express()
const __dirname = path.resolve();
const publicDirPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Greg"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Greg"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: "Greg",
        helpText: "The help page"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

})

app.get("/help/*", (req, res) => {
    res.render('error', {
        title: "404",
        name: "Greg",
        errorMsg: "Help article not found"
    })
})

app.get("*", (req, res) => {
    res.render('error', {
        title: "404",
        name: "Greg",
        errorMsg: "Page not found"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})