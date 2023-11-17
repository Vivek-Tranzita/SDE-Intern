const  express=require("express");
const app=express();
const path=require("path");
const {v4:uuidv4} =require("uuid");
const methodOverride=require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"Vivek Gupta",
        content:"We are talking about time travelling"
    },
    {
        id:uuidv4(),
        username:"Devansh",
        content:"Friends are the best thing ever"
    },
    {
        id:uuidv4(),
        username:"Saurav",
        content:"The day will remember when i create my atom bomb"
    },
    
]

app.get("/post",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/post/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/post",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/post");
})

app.get("/post/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);//check if id are match or valid id are match
    res.render("show.ejs",{post});

})



app.patch("/post/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content; //new content me updated content daal do
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/post");
})

app.get("/post/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});

app.delete("/post/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id); //filter only whose whose id is not matched
    res.redirect("/post");
})

const port=8080;
app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})