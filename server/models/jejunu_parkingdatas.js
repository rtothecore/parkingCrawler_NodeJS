var mongoose = require("mongoose")
var Schema = mongoose.Schema

var Jejunu_ParkingDataSchema = new Schema({
	entrance: String,
	time: Date,
	divide: Number
})

var Jejunu_ParkingData = mongoose.model("Jejunu_ParkingData", Jejunu_ParkingDataSchema)
module.exports = Jejunu_ParkingData