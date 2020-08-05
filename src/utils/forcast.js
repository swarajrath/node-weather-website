const request = require('postman-request')


const forcast = (Latitude, Longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=be9f3f0e57640bf1a1960a1cf881a8a8&query=' + Latitude + ',' + Longitude + '&units=m'

    //body is a part of responce object
    request({ url: url, json: true }, (error, { body }) => {

        if (error) {
            callback("Unable to connect to weather API", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions + ". Its Currently " + body.current.temperature + " degree celcius. But it feels like " + body.current.feelslike + ". The Humidity is "+body.current.humidity)

        }

    })
}

module.exports = forcast