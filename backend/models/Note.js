const mongoose =
require("mongoose");

const noteSchema =
new mongoose.Schema({

title:{
type:String
},

subject:{
type:String
},

branch:{
type:String
},

semester:{
type:String
},

teacher:{
type:String
},

file:{
type:String
}

},
{
timestamps:true
}

);

module.exports =
mongoose.model(
"Note",
noteSchema
);