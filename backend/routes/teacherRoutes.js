const express =
require("express");

const router =
express.Router();

const User =
require("../models/User");

const Assignment =
require("../models/Assignment");

const Note =
require("../models/Note");



router.get(

"/students",

async(req,res)=>{

try{

const {

branch,
semester

}

=

req.query;



const students=

await User.find({

role:"student",

branch,

semester:Number(
semester
)

})

.select("-password");



res.json(
students
);

}

catch(err){

res.status(500)
.json(err);

}

}

);



router.get(

"/dashboard",

async(req,res)=>{

try{

const {

branch,
semester

}

=

req.query;



const students=

await User.countDocuments({

role:"student",

branch,

semester

});


const assignments=

await Assignment.countDocuments({

branch,
semester

});


const notes=

await Note.countDocuments({

branch,
semester

});


res.json({

students,
assignments,
notes

});

}

catch(err){

res.status(500)
.json(err);

}

}

);



module.exports=
router;