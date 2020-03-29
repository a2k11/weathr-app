const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/b7fda66edc27ed621a5f700b5cab321b/' + latitude + ',' + longitude

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location!', undefined)
    } else {
      const currentTemp = body.currently.temperature
      const lowTemp = body.daily.data[0].temperatureLow
      const highTemp = body.daily.data[0].temperatureHigh
      const probability = body.currently.precipProbability
      const summary = body.daily.data[0].summary

      const linePartOne = summary + ' '
      const linePartTwo = 'High Temperature: ' + highTemp + ' degrees. '
      const linePartThree = 'Low Temperature: ' + lowTemp + ' degrees. '
      const linePartFour = 'It is currently ' + currentTemp + ' degrees.  There is a ' + probability + '% chance of rain.'
      
      callback(undefined, linePartOne + linePartTwo + linePartThree + linePartFour)
    }
  })
}

module.exports = forecast