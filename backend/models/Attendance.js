const mongoose=require("mongoose");

const attendanceSchema=
new mongoose.Schema({

student:String,

status:String,

date:{
type:Date,
default:Date.now
}

});

module.exports=
mongoose.model(
"Attendance",
attendanceSchema
);