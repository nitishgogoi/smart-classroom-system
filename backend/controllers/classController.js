const Class =
require("../models/Class");



exports.createClass =
async(req,res)=>{

try{

const {
subject,
teacher,
semester
}
=
req.body;


const newClass =
await Class.create({

subject,
teacher,
semester

});


res.json(
newClass
);

}

catch(err){

res.status(500)
.json(err);

}

};




exports.getClasses =
async(req,res)=>{

try{

const classes =
await Class.find();

res.json(
classes
);

}

catch(err){

res.status(500)
.json(err);

}

};




exports.dashboardStats =
async(req,res)=>{

try{

const totalClasses =
await Class.countDocuments();

res.json({

totalClasses

});

}

catch(err){

res.status(500).json({

message:
"Server Error"

});

}

};