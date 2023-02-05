const mg=require("mongoose");
mg.connect("mongodb://localhost:27017/Registration")
.then(()=>{
    console.log("mg success");
})
.catch((e)=>{
    console.log(e);
})