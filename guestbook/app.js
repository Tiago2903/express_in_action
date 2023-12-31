var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var entries = [];
app.locals.entries = entries;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/new-entry", function (req, res) {
    res.render("new-entry");
})

app.post("/new-entry", function (req, res) {
    console.log('aqui');
    if (!req.body.title || !req.body.body) {
        res.status(400).send("entries must have a title and a body");
        return;
    }

    entries.push({
        title: req.body.title,
        body: req.body.body,
        published: new Date()
    });
    res.redirect("/");
});

app.use(function (req, res) {
    res.status(404).render("404");
})

http.createServer(app).listen(3000, function () {
    console.log("guest book started on 3000");
})