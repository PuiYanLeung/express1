const express = require("express");
const bcrypt = require("bcrypt");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const saltRound = 10;
app.use(express.json()); // This ensures input is considered to be json

app.get("/", (req, res) =>{
    res.status(200).send("Hello world");
});

app.post("/register", (req, res)=>{
    bcrypt.genSalt(saltRound, (err, salt)=>{
        if (err){
            res.status(500).json({"message": `Something went wrong`, "error": err});
        }
        bcrypt.hash(req.body.password, salt, (err, hash)=>{
            if (err){
                res.status(500).json({"message": `Something went wrong`, "error": err});
            }
            
            bcrypt.compare(req.body.checkPassword, hash, (err, result)=>{
                if (result){
                    res.status(201).json({"message": `Password is: ${req.body.checkPassword} matches ${hash}`});
                }else{
                    res.status(401).json({"message": `Password ${req.body.checkPassword} does not match ${hash}`});
                }
            });            
        });    
    });  
});

app.get("/about", (req, res) =>{
    //console.log(req.query);
    res.status(200).send("This is the about route");
});

// app.get("/users/:username", (req, res) =>{
//     //console.log(req.query);
//     res.status(200).send(`You requested information about ${req.params.username}:${req.query.age}`);
// });

// app.post("/:username/:project", (req, res) =>{
//     console.log(req.query);
//     res.status(201).send(`Created: ${req.body.projectName}`);
// });  

app.post("/:username/", (req, res) => {
    res.status(201).json({"message": `You created the repo ${req.body.project}`, "data": req.body});
});

app.get("/:username/:project", (req, res) => {
    res.status(200).json({"message": `You views the project ${req.params.project}`});
});

app.post("/:username/:project", (req, res) => {
    res.status(200).json({"message": `You updated the project: ${req.params.project}`, "date": req.body});
});


app.listen(port, ()=>{
    console.log("App is online");
});
