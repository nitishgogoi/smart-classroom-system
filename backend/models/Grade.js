const mongoose =
require("mongoose");

const gradeSchema =
new mongoose.Schema({

student:String,

branch:String,

semester:Number,

subject:String,

internal:Number,

exam:Number,

total:Number

},
{
timestamps:true
});

module.exports=
mongoose.model(
"Grade",
gradeSchema
);