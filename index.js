const express = require('express')
const app = express()
const port = 3000
const bind = '0.0.0.0'

/**
  * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Forwarded
  */
const filterHeaders = (headers) => {
  const filtered = {}
  for (let key in headers) {
    if (key.match(/forwarded/) || key === 'host') {
      filtered[key] = headers[key]
    }
  }
  return filtered
}

app.get('/', (req, res) => {
  const headers = filterHeaders(req.headers)
  res.send({
    'without-info-from-proxy': {
      host: req.headers.host,
      ip: req.socket.remoteAddress,
    },
    'with-info-from-proxy': {
      host: req.headers['x-forwarded-host'] || req.headers.host,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    },
    headers: headers,
  })
})

app.listen(port, bind, () => {
  console.log(`Example app listening on port ${port}`)
})
