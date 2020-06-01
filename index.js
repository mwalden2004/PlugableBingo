const express = require("express");
const ejs = require("ejs");
const app = express();
const fs = require("fs");
app.set("view engine", "ejs")

const protestBingo = require("./games/protest.json");

app.get("/", (req, res) => {
    res.json({
        success: true,
        games: [
            "protest"
        ]
    })
})

app.get("/game/:game", (req, res) => {
    if (req.params.game == "protest"){
        res.render("game", {game: protestBingo})
    }else{
        res.json({
            success: false,
            reason: "invalid game"
        })
    }
})

app.get("/assets/js.js", (req, res)=>{
    res.sendFile(__dirname+"/assets/js.js")
})
app.get("/assets/css.css", (req, res)=>{
    res.sendFile(__dirname+"/assets/css.css")
})

app.listen(80);