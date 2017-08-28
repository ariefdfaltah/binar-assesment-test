var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var drivers = new Schema({
    nama : String,
    no_plat : String,
    gender : String
});
module.exports = mongoose.model('drivers', drivers);