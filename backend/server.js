const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB =
require("./config/db");



connectDB();

const app =
express();



/* ---------- MIDDLEWARE ---------- */

app.use(
express.json()
);

app.use(
cors({
origin:"*"
})
);



/* ---------- TEST ---------- */

app.get("/",(req,res)=>{

res.send(
"Backend Running"
);

});



/* ---------- ROUTES ---------- */

app.use(
"/api/auth",
require("./routes/authRoutes")
);


app.use(
"/api/users",
require("./routes/userRoutes")
);


app.use(
"/api/attendance",
require("./routes/attendanceRoutes")
);


app.use(
"/api/assignments",
require("./routes/assignmentRoutes")
);


app.use(
"/api/submissions",
require("./routes/submissionRoutes")
);


app.use(
"/api/grades",
require("./routes/gradeRoutes")
);


app.use(
"/api/notes",
require("./routes/noteRoutes")
);


app.use(
"/api/subjects",
require("./routes/subjectRoutes")
);



/* ---------- NEW TEACHER ROUTES ---------- */

app.use(
"/api/teacher",
require("./routes/teacherRoutes")
);



/* ---------- SERVER ---------- */

const PORT=

process.env.PORT
||
5000;


app.listen(

PORT,

()=>{

console.log(

`Server running on ${PORT}`

);

}

);