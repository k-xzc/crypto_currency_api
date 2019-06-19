var crpto_currency_port  = process.env.crpto_currency_port
var keeper_host = process.env.keeper_host
var keeper_port = process.env.keeper_port
var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var rp = require('request-promise');
app.use(bodyParser.json());
app.use(require('express-promise')());

app.post('/getcurrency', function (req, res) {
getBx().then(function(curs){
for(var i in curs){
   for(var j in req.body.focus){
   if(curs[i].secondary_currency == req.body.focus[j] && curs[i].primary_currency == "THB"){
	postToKeeper(jsonFormatter(curs[i]))
      }
    }
  }
 })
res.send("done")
})

function getBx() {
  url = "https://bx.in.th/api/"
  return rp({
        uri: url,
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET",
        json: true
    })
}

function postToKeeper(json) {
  url = "http://" +keeper_host + ":" + keeper_port + "/keep_this_data"
  return rp({
        uri: url,
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: json,
        json: true
    })
}

function jsonFormatter(json) {
  return {
    "currency_name": json.secondary_currency,
    "last_price": json.last_price,
    "bids":json.orderbook.bids.highbid,
    "asks":json.orderbook.asks.highbid,
    "timestamp": dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM:ss'Z'")
  }
}

app.listen(crpto_currency_port, () => console.log(`listening on port ${crpto_currency_port}!`))
