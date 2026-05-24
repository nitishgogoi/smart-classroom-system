const express =
require("express");

const router =
express.Router();

const {

submitAssignment,
getAssignments

}

=
require(
"../controllers/assignmentController"
);


router.post(
"/",
submitAssignment
);

router.get(
"/",
getAssignments
);

module.exports =
router;