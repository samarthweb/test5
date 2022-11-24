var express = require("express");
var app = express();
var data_prep = require("./data_prep.js");
var path = require("path");
const {engine} = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine(".hbs", engine({
        extname: '.hbs',
        defaultLayout: 'main'
    }
));
app.set("view engine", ".hbs");

var HTTP_PORT = process.env.PORT || 8080;
function onHttpStart() 
{
    console.log("Express http server listening on " + HTTP_PORT);
}

app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/allStudents", (req, res)=>{
    
    data_prep.allstudents().then((data)=>{
        
        res.render("students",{data:data});
    }).catch((reason)=>res.json({message:reason}));
});


app.get("/addStudent", (req, res)=>{
    res.sendFile(path.join(__dirname, "/test3_views/addStudent.html"));
});


app.post("/addStudent", (req, res)=>{
    data_prep.addStudent(req.body).then(()=>{
        var data = req.body;
        res.render("student",{data:data});
        //res.redirect("/allStudents");

    }).catch((reason)=>res.json({message:reason}));
});

app.get("/CPA", (req,res)=>{
    data_prep.cpa().then((data)=>{
        res.render("students",{data: somedata});
    }).catch((reason)=>{
        res.json({message:reason});
    });
});

app.get("/highGPA", (req, res)=>{
    data_prep.highGPA().then((data)=>{
    res.render("student",{data:data});
    });
});


app.get("*", (req, res)=>{
    res.status(404).send("Error 404: page not found.")
});

data_prep.prep().then((data)=>{
    //console.log(data);
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err)=>{
    console.log(err);
});