const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({

title:String,
description:String,
subject:String,

createdAt:{
type:Date,
default:Date.now
}

});

module.exports =
mongoose.model(
"Assignment",
assignmentSchema
);