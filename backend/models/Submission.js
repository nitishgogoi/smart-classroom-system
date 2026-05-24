const mongoose =
require("mongoose");

const submissionSchema =
new mongoose.Schema({

student:String,

assignment:String,

branch:String,

semester:String,

link:String,

createdAt:{
type:Date,
default:Date.now
}

});

module.exports =
mongoose.model(
"Submission",
submissionSchema
);