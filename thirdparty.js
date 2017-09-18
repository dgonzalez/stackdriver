require('@google-cloud/trace-agent').start()

const express = require('express')
const bunyan = require('bunyan')
const LoggingBunyan = require('@google-cloud/logging-bunyan')
const request = require('request')

const loggingBunyan = LoggingBunyan()

const URL = "https://www.googleapis.com/discovery/v1/apis"

const log = bunyan.createLogger({
  name: "stackdriver",
  streams: [
    {stream: process.stdout},
    loggingBunyan.stream()
  ],
  level: 'info'
})

const app = express()

app.get('/', (req, res) => {
  log.info(`request from ${req.connection.remoteAddress}`)
  res.send('Hello World!')

})

app.get('/discovery', (req, res) => {
  request(URL, (error, response, body) => {
    return res.send(body)
  })
})

app.listen(3000, () => {
  console.log('Listening in port 3000')
})
