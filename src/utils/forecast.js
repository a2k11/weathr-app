const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/b7fda66edc27ed621a5f700b5cab321b/' + latitude + ',' + longitude

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location!', undefined)
    } else {
      const temp = body.currently.temperature
      const precip = body.currently.precipProbability
      const summary = body.daily.data[0].summary
      callback(undefined, summary + ' It is currently ' + temp + ' degrees out.  There is a ' + precip + '% chance of rain.')
    }
  })
}

module.exports = forecast