import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
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
default:"student"
},

branch:{
type:String,
default:""
},

semester:{
type:Number,
default:1
},

phone:String,

gender:String

},

{
timestamps:true
}

);

export default mongoose.model(
"User",
userSchema
);