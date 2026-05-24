const Attendance=
require("../models/Attendance");


exports.addAttendance=
async(req,res)=>{

const data=
await Attendance.create(
req.body
);

res.json(data);

};



exports.getAttendance=
async(req,res)=>{

const data=
await Attendance.find();

res.json(data);

};