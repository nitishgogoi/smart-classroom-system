const mongoose =
require("mongoose");


const notificationSchema =
new mongoose.Schema({

message:String,

role:String,

read:{

type:Boolean,
default:false

}

},

{

timestamps:true

}

);


module.exports =
mongoose.model(

"Notification",

notificationSchema

);