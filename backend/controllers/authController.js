const User =
require("../models/User");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");



exports.register =
async(req,res)=>{

try{

const {

name,
email,
password,
role,
branch,
semester

}

=
req.body;



const existing =
await User.findOne({

email

});


if(existing){

return res
.status(400)
.json({

message:
"User exists"

});

}



const hash =
await bcrypt.hash(

password,
10

);



const user =
await User.create({

name,
email,

password:
hash,

role,
branch,
semester

});



res.json({

message:
"Registered",

user

});

}

catch(err){

res
.status(500)
.json(err);

}

};





exports.login =
async(req,res)=>{

try{

const {

email,
password

}

=
req.body;



const user =
await User.findOne({

email:
email.trim()

});



if(!user){

return res
.status(400)
.json({

message:
"User not found"

});

}



const match =
await bcrypt.compare(

password,

user.password

);



if(!match){

return res
.status(400)
.json({

message:
"Wrong password"

});

}



const token =
jwt.sign(

{

id:user._id,
role:user.role

},

process.env.JWT_SECRET,

{

expiresIn:"1d"

}

);



res.json({

token,

user

});

}

catch(err){

res
.status(500)
.json(err);

}

};