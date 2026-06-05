var mongoose = require("mongoose")

var ProductSchema = mongoose.Schema({
    pname : String,
    pprice:Number,
    pdetails:String
    
})
var Product =  mongoose.model("Product",ProductSchema)
module.exports = Product    
