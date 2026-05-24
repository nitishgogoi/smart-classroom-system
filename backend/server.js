const express =
require("express");

const userRoutes =
require("./routes/userRoutes");

const assignmentRoutes =
require(
"./routes/assignmentRoutes"
);

const submissionRoutes =
require(
"./routes/submissionRoutes"
);

const attendanceRoutes=
require(
"./routes/attendanceRoutes"
);

const cors =
require("cors");

const noteRoutes =
require("./routes/noteRoutes");

const connectDB =
require("./config/db");

require("dotenv")
.config();

connectDB();

const app =
express();

app.get("/", (req,res)=>{
   res.send("Backend Running");
});

app.use(
express.json()
);

app.use(
cors()
);

app.use(
"/api/notes",
noteRoutes
);


app.use(
"/api/auth",
require("./routes/authRoutes")
);

app.use(
"/api/submissions",
submissionRoutes
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

"/api/users",

userRoutes

);

app.use(
"/api/attendance",
require("./routes/attendanceRoutes")
);

app.use(

"/api/assignments",

assignmentRoutes

);

app.use(

"/api/subjects",

require(
"./routes/subjectRoutes"
)

);


app.listen(

process.env.PORT,

()=>{

console.log(

`Server running on ${process.env.PORT}`

);

}

);