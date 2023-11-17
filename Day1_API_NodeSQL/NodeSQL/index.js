const {faker} =require("@faker-js/faker");
const mysql=require("mysql2");
const express=require("express");
const app=express();
const path=require("path");
const methodOverride=require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'hero',
    password:"pass4558"
})

// let user=[["12b","pinki","pink@gmail.com","A3@45"],
//             ["12c","priti","prt@gmail.com","AB@45"]];

let getRandomUser=()=>{
    return[
        faker.datatype.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password()
    ]
}


// let data=[];
// for(let i=1;i<=100;i++){
//     data.push(getRandomUser());
// }


app.get("/student",(req,res)=>{
    let q=`insert into student(id,username,email,password) values ?`;
    let user=["12b","pinki","pink@gmail.com","A3@45"];

    try{
        connection.query(q,user,(err,result)=>{
            if(err) throw err;
            console.log(result)
        })
    }catch(e){
        console.log(e)
    }
})

//home route
app.get("/",(req,res)=>{
    let q=`select count(*) from user `;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let count=result[0]["count(*)"];
            res.render("home.ejs",{count});
        });
    }catch(err){
        console.log(err);
        res.send("Something error .....")
    }
 
});

//show route
app.get("/users",(req,res)=>{
    let q=`select * from user`;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            // console.log(result);
            let userdata=result;
            res.render("show.ejs",{userdata});
        })
    }
    catch(err){
        console.log(err);
        res.send("error occur in db");
    }
})

//edit route
app.get("/users/:id/edit",(req,res)=>{
    let {id}=req.params;
    let q=`select * from user where id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            // console.log(result);
            let editUserData=result[0];
            // console.log(result);
            res.render("edit.ejs",{editUserData});
            
        })
    }
    catch(err){
        console.log(err);
        res.send("error occur in db");
    }
})
//update route
app.patch("/users/:id",(req,res)=>{
    let {id}=req.params;
    let {password:formPass,username:newUserName}=req.body;
    let q=`select * from user where id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            
            if(err) throw err;
            let user=result[0];
            if(formPass!=user.password){res.send("Wrong password");}
            else{
                let q2=`update user set username='${newUserName}' where id='${id}'`;
                connection.query(q2,(err,result)=>{
                if(err) throw err;
                res.redirect("/users");
            
                })
            }
            
            
        })
    }catch(err){
        console.log(err);
        res.send("error occur in db");
    }
})


// connection.end();


app.listen("8080",()=>{
    console.log("server is running on 8080");
})

