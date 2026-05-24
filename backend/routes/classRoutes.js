const express =
require("express");

const router =
express.Router();

const auth =
require("../middleware/authMiddleware");

const role =
require("../middleware/roleMiddleware");


const {

createClass,
getClasses,
dashboardStats

}

=
require(
"../controllers/classController"
);



// Teacher/Admin only
router.post(

"/",

auth,

role(
"teacher",
"admin"
),

createClass

);



// Everyone logged in
router.get(

"/",

auth,

getClasses

);



router.get(

"/stats",

auth,

dashboardStats

);



module.exports =
router;