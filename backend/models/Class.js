const mongoose =
require("mongoose");

const classSchema =
new mongoose.Schema({

subject:{
type:String,
required:true
},

teacher:{
type:String,
required:true
},

semester:{
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
"Class",
classSchema
);