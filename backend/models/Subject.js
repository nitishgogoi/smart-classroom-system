const mongoose =
require("mongoose");

const subjectSchema =
new mongoose.Schema({

branch:{
type:String,
required:true
},

semester:{
type:Number,
required:true
},

code:{
type:String,
required:true
},

name:{
type:String,
required:true
}

},
{
timestamps:true
}

);

module.exports =
mongoose.model(
"Subject",
subjectSchema
);