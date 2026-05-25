const router=
require("express").Router();

const c=
require("../controllers/teacherController");

router.post(
"/assignment",
c.createAssignment
);

router.post(
"/attendance",
c.markAttendance
);

router.post(
"/notes",
c.uploadNote
);

router.get(
"/assignment",
c.getAssignments
);

router.get(
"/attendance",
c.getAttendance
);

router.get(
"/notes",
c.getNotes
);

module.exports=router;