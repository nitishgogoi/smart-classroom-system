const Assignment=
require("../models/Assignment");

const Attendance=
require("../models/Attendance");

const Note=
require("../models/Note");



exports.createAssignment=
async(req,res)=>{

const data=
await Assignment.create(req.body);

res.json(data);

};



exports.uploadNote=
async(req,res)=>{

const data=
await Note.create(req.body);

res.json(data);

};



exports.markAttendance=
async(req,res)=>{

const data=
await Attendance.create(req.body);

res.json(data);

};



exports.getAssignments=
async(req,res)=>{

res.json(
await Assignment.find()
);

};



exports.getNotes=
async(req,res)=>{

res.json(
await Note.find()
);

};



exports.getAttendance=
async(req,res)=>{

res.json(
await Attendance.find()
);

};