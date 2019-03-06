const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const axios = require('axios')
const CircularJSON = require('circular-json')
// https://www.npmjs.com/package/crypto-js
const CryptoJS = require("crypto-js")
var cryptoKey = "doraemon"
/*
// Encrypt
var ciphertext = CryptoJS.AES.encrypt('Hello~ Doraemon', cryptoKey);
console.log("ciphertext:" + ciphertext);

// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), cryptoKey);
var plaintext = bytes.toString(CryptoJS.enc.Utf8);
console.log("plaintext:" + plaintext);
*/

// https://momentjs.com/docs/
const moment = require('moment')

//////////////////////////////////////////////FOR HTTPS
// http://blog.saltfactory.net/implements-nodejs-based-https-server/
// https://coderwall.com/p/yo4mqw/creating-a-nodejs-express-https-server
var http = require('http'),
	// https = require('https'),
	fs = require('fs')

axios.defaults.timeout = 20000;

/*
var httpsOptions = {
	key: fs.readFileSync('key.pem')
	, cert: fs.readFileSync('cert.pem')
}
*/

var port1 = 10081
// var port2 = 443

var app = express()
// app.use(express.urlencoded())
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

http.createServer(app).listen(port1, function () {
	console.log('Http server listening on port ' + port1)
})

/*
https.createServer(httpsOptions, app).listen(port2, function () {
	console.log('Https server listening on port ' + port2)
})
*/

var schedule = require('node-schedule');

///////////////////////////////////////////////////////

var mongoose = require('mongoose')
// https://www.zerocho.com/category/MongoDB/post/59b6228e92f5830019d41ac4
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/fwjournal')
// mongoose.connect('mongodb://192.168.0.73:27017/fwjournal')
// http://mongoosejs.com/docs/connections.html
// mongoose.connect('mongodb://journal:journal**@192.168.66.30:27017/fwjournal')
mongoose.connect('mongodb://park:park**@192.168.66.30:27017/Parking')
var db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

var ParkingData = require("../models/parkingData")
var dynamic_parkingdata = null
var dynamic_parkingdataForInsert = null

// *******************************************************************************************************************************************
// *********************************************************** For Parking Crawler ***********************************************************

var rule = new schedule.RecurrenceRule();
// rule.second = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
rule.minute = [0, new schedule.Range(1, 59)];
 
var scheduleJob1 = schedule.scheduleJob(rule, function(){
      ParkingData.find({}, '', function (error, pds) {
        for (var i = 0; i < pds.length; i++) {
          // console.log(pds[i].parking_ip)
          if (pds[i].parking_ip !== undefined) {            
            checkExistDataInParkingData(pds[i])           
          }          
        }
      })
});

function checkExistDataInParkingData (pdsVal) {
  dynamic_parkingdata = require("../models/" + pdsVal.parking_data)
  dynamic_parkingdata.count({}, function(err, c) {    
    if (c === 0) {
      console.log('Count is ' + c)
      getPastData(pdsVal.parking_ip, pdsVal.parking_port, pdsVal.parking_id, pdsVal.parking_data)
      return false;
    } else {
      console.log('Count is ' + c)
      getRealTimeData(pdsVal.parking_ip, pdsVal.parking_port, pdsVal.parking_id, pdsVal.parking_data)
      return true;
    }
  });  
}

function getPastData (parking_ip, parking_port, parking_id, parking_data) {
  console.log('getPastData!')
  // var testTime = "2014-06-01 15:00:00"
  var nowDate = moment().format("YYYY-MM-DD HH:mm:ss")
  var before1month = moment().subtract(1, 'months').format("YYYY-MM-DD HH:mm:ss");  
  axios.get('http://' + parking_ip + ':' + parking_port + '/getParkingData/' + parking_id + '/' + before1month + '/' + nowDate)
    .then(function (response) {           
      console.log(response.data)
      if (response.data.length > 0) {
        insertData(response.data, parking_data)
      } else {
        console.log('No data to insert')
      }
  }).catch(function (error) {
    console.log(error)
  })
}

function getRealTimeData (parking_ip, parking_port, parking_id, parking_data) {
  console.log('getRealTimeData!')
  // var testTime = "2014-06-02 15:00:00"
  var nowDate = moment().format("YYYY-MM-DD HH:mm:ss")
  var before10sec = moment().subtract(1, 'minutes').format("YYYY-MM-DD HH:mm:ss");  
  axios.get('http://' + parking_ip + ':' + parking_port + '/getParkingData/' + parking_id + '/' + before10sec + '/' + nowDate)
    .then(function (response) {           
      console.log(response.data)
      if (response.data.length > 0) {
        insertData(response.data, parking_data)
      } else {
        console.log('No data to insert')
      }
  }).catch(function (error) {
    console.log(error)
  })
}

function insertData(dataVal, parking_data) {
  dynamic_parkingdataForInsert = require("../models/" + parking_data)
  for (var i = 0; i < dataVal.length; i++) {
    var parkingData = new dynamic_parkingdataForInsert(dataVal[i])    
    parkingData.save(function (err, results) {
      // console.log(results);
    });
  }
  console.log('Success - pushData!');
}

/////////////////////////////////////////////////// BULK JOB - PUSH TO ARRAY ////////////////////////////////////////////////////////////////////////////
/*
Jeju_ParkingDatas.find({}, '', function (error, pds) {
  console.log(pds.length)

  runProcess(pds)
})

function insertData (idVal, dataArray) {
  Jeju_ParkingDatas2.findById(idVal, '', function (error, jpds) {
    if (error) { console.error(error); }

    for (var i = 0; i < dataArray.length; i++) {
      jpds.parking_data.push(dataArray[i])
    }
    jpds.save(function (err) {
      if (err) { console.error(err); }
      console.log('Success!');
    });
  })
}

function pushNInsertData (pdsVal, startIndex, endIndex) {
  var tempPdsArray = []
  for (var i = startIndex; i < endIndex; i++) {        
    tempPdsArray.push({entrance: pdsVal[i].entrance, time: pdsVal[i].time, divide: pdsVal[i].divide});
  }

  insertData("5c7de31b5e958e3a64531757", tempPdsArray)
}

function runProcess (pds) {
  // pushNInsertData (pds, 0, 100000)
  // pushNInsertData (pds, 100000, 200000)
  pushNInsertData (pds, 200000, 250000)
}
*/