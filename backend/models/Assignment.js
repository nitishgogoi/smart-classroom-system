const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({

student:{
type:String,
required:true
},

branch:String,

semester:Number,

subject:String,

title:String,

link:String,

submittedAt:{
type:Date,
default:Date.now
}

});

module.exports =
mongoose.model(
"Assignment",
assignmentSchema
);