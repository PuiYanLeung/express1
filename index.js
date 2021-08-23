const express = require("express");
const app = express();
const port = 80;

app.get("/", (req, res) =>{
    res.status(200).send("Hello world");
});

app.listen(port, ()=>{
    console.log("App is online");
});
