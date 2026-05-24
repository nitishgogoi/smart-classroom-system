const router =
require("express").Router();

const {

uploadNote,
getNotes

}

=

require(
"../controllers/noteController"
);


router.post(
"/",
uploadNote
);


router.get(
"/",
getNotes
);


module.exports =
router;