const Notification =
require("../models/Notification");



exports.createNotification =
async(req,res)=>{

const data =
await Notification.create(

req.body

);

res.json(
data
);

};



exports.getNotifications =
async(req,res)=>{

const data =
await Notification.find();

res.json(
data
);

};