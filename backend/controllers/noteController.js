const Note =
require("../models/Note");



exports.uploadNote =
async(req,res)=>{

try{

const note =
new Note({

title:
req.body.title,

subject:
req.body.subject,

branch:
req.body.branch,

semester:
req.body.semester,

teacher:
req.body.teacher,

file:
req.body.file

});


await note.save();

res.json({

message:
"Uploaded",

note

});

}

catch(err){

console.log(err);

res
.status(500)
.json(err);

}

};



exports.getNotes =
async(req,res)=>{

try{

const notes =
await Note.find();

res.json(notes);

}

catch(err){

res
.status(500)
.json(err);

}

};