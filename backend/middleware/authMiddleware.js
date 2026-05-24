const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{

try{

const token =
req.header("Authorization")
?.replace("Bearer ","");

console.log("TOKEN:", token);
console.log("SECRET:", process.env.JWT_SECRET);

if(!token){
return res.json({
message:"No token"
});
}

const decoded =
jwt.verify(
token,
process.env.JWT_SECRET
);

console.log(decoded);

req.user = decoded;

next();

}catch(err){

console.log(err);

res.json({
message:"Invalid token"
});

}

};