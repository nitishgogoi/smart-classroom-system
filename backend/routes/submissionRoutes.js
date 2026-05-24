const router =
require("express").Router();

const {

submit,
get

}

=

require(
"../controllers/submissionController"
);


router.post(
"/",
submit
);

router.get(
"/",
get
);

module.exports =
router;