/* This Project was made by SubjectRefresh.
We follow the standard[1] JS Style 
[1] https://github.com/feross/standard */

var config = require('./config.js')
var logger = require('./modules/logger.js')
var mongo = require('./modules/mongo.js')
var shortener = require('./modules/shortener.js')

var express = require('express')
var path = require('path')
var useragent = require('express-useragent')
var mongodb = require('mongodb')
var http = require('http').Server(app)
var io = require('socket.io')(http)
var MongoClient = mongodb.MongoClient
var app = express()

var l = 'APP'

app.use('/', express.static(path.resolve('./static')))
app.use(useragent.express())

app.get("/favicon.ico", function(req, res) {
  res.sendStatus(404);
});

app.get('/', function (req, res) {
  res.sendFile(path.resolve('./index.html'))
})

app.get('/:short', function(req, res) {
  shortener.logStats(req.useragent)
  logger.debug(l, JSON.stringify(stats))
  // res.send(stats)
})

MongoClient.connect(config.url, function (err, db) {
  if (err) logger.error(l, "Unable to connect to the MongoDB server. Error: " + err);
  var URLCollection = db.collection("url");
  URLCollection.createIndex({ short: 1, }, { unique: true });
  logger.success(l, "Connected to MongoDB server " + config.url)

  io.on('connection', function (socket) {
    socket.on('url', function (url, callback) {
      shortener.checkURL(url, function(status) {
        if (status.status) {
          shortener.shorten(url, null, function (status) {
            if (status.status) {
              logger.success(l, 'Converted ' + url + ' to ' + status.short)
              callback({ status: true, shortlink: status.short })
              io.sockets.emit('increment count')
            } else {
              logger.error(l, 'We ran into a problem')
            }
          })
        } else {
          callback({ status: false, message: "Invalid URL" })
        }
      })
    })
    socket.on('data', function (data, callback) {
      logger.debug(l, JSON.stringify(data))
        var userData = db.collection('userData')
        userData.insert(data, function (err, result) {
          shortener.retrieve(data.url, function (retrieval) {
            console.log(retrieval)
            if (retrieval.status) {
              logger.success(l, 'Redirecting ' + data.url + ' to ' + retrieval.stats)
              // res.redirect(302, data.long); // 302 means browsers don't bypass us next time
              callback(retrieval.stats)
            } else {
              logger.warn('Unknown short URL: ' + data.url)
              callback('http://subr.pw/')
            }
          })
        })
    })
  })

})

app.listen(3004)


