const exp=require("express");
const app=exp();
const path=require("path");
const hbs=require("hbs");
const bc=require("bcrypt");
const port = process.env.PORT || 3000;

require("./DB/conn");
const Person=require("./models/register");
const { urlencoded } = require("express");

app.use(exp.json());
app.use(exp.urlencoded({extended:false}));

const sP=path.join(__dirname,"../public");
const tP=path.join(__dirname,"../templates/views");
const pP=path.join(__dirname,"../templates/partials");

app.use(exp.static(sP));
app.set("view engine","hbs");
app.set("views",tP);
hbs.registerPartials(pP);


app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/index",(req,res)=>{
    res.render("index");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/register",(req,res)=>{
    res.render("register");
})
app.post("/register",async(req,res)=>{
    try{
        const pInfo=new Person({
            firstName:req.body.firstname,
            lastName:req.body.lastname,
            userName:req.body.username,
            city:req.body.city,
            gender:req.body.gender,
            password:req.body.password
        });
        //middleware
        console.log(pInfo);

        // const tokenapp=await pInfo.createtoken();
        // console.log("token is " + tokenapp);

        const data=await pInfo.save();
        console.log(data);

        res.status(201).render("login");
        // res.send(data);
    }
    catch(e){
        res.status(400).send("error");
    }
})
app.post("/login",async(req,res)=>{
    try{
        const username=req.body.username;
        const password=req.body.password;

        const checkuser=await Person.findOne({userName:username});

        const isMatched=await bc.compare(password,checkuser.password)

        if(isMatched){
            res.status(201).render("index");
        }
        else{
            res.send("No");
        }
    }
    catch(e){
        res.status(400).send("Not registered")
    }
})

// const secure =async(password)=>{
//     const pshash=await bc.hash(password,10);
//     console.log(pshash);

//     const pchecked=await bc.compare(password,pshash);
//     console.log(pchecked);
// }
// secure("Gohil@3012");

app.listen(port,"127.0.0.1",()=>{
    console.log(`Connection set-up at ${port}`);
})