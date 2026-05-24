const mongoose=require("mongoose");

const attendanceSchema=
new mongoose.Schema({

student:String,

branch:String,

semester:Number,

subject:String,

present:Number,

total:Number,

percent:Number

});

module.exports=
mongoose.model(
"Attendance",
attendanceSchema
);