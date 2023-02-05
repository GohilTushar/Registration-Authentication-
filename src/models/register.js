const mg=require("mongoose");
const bc=require("bcrypt");
const jwt=require("jsonwebtoken");

const info=new mg.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})
// info.methods.createToken=async function(){

//     try{
//         console.log(this._id);
//         const token = jwt.sign({_id:this._id.toString()},"helloevryonehelloeveryone");
//         this.token=this.token.concat({token:token})
//         await this.save();
//         return token;
//         console.log(token);
//     }
//     catch(e){
//         res.send("e");
//         console.log("e");
//     }
// }

info.pre("save",async function(next){
    this.password=await bc.hash(this.password,10);
    next();
})

const Person=new mg.model("Person",info);
module.exports=Person;