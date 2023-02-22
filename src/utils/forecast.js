import request from "postman-request"

export default function forecast(latitude, longitude, callback) {
    const url = 'http://api.weatherstack.com/current?access_key=aa71a9683b8c05624f0dbf9aea84a75c&query=' +
        latitude + ',' + longitude + '&units=f'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {

            const weather_description = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike

            callback(undefined, weather_description + ". It is currently " + temperature + " degrees outside. However, it feels like " +
                feelslike + " degrees outside.")
        }
    })
}