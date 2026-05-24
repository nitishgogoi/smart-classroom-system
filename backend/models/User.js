const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

email:{
type:String,
required:true,
unique:true
},

password:{
type:String,
required:true
},

role:{
type:String,
enum:["student","teacher","admin"],
default:"student"
},

branch:{
type:String,
enum:[
"Computer Engineering",
"Printing Technology",
"Electrical Engineering"
],
default:null
},

semester:{
type:Number,
min:1,
max:6,
default:null
}

},
{
timestamps:true
});

module.exports =
mongoose.model(
"User",
userSchema
);