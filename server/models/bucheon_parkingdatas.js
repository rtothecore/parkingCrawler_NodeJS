var mongoose = require("mongoose")
var Schema = mongoose.Schema

var Bucheon_ParkingDataSchema = new Schema({
	car_no: String,
	in_time: Date,
	out_time: Date
})

var Bucheon_ParkingData = mongoose.model("Bucheon_ParkingData", Bucheon_ParkingDataSchema)
module.exports = Bucheon_ParkingData