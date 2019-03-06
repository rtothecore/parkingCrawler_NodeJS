var mongoose = require("mongoose")
var Schema = mongoose.Schema

var ParkingDataSchema = new Schema({
	parking_id: String,
	parking_address: String,
	parking_name: String,
	parking_data: String,
	type: String,
	parking_ip: String,
	parking_port: String
})

var ParkingData = mongoose.model("ParkingData", ParkingDataSchema)
module.exports = ParkingData