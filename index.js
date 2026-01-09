const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();
const jwt_secret = "kavish"

app.use(express.json());

const users = [];


app.post("/signup", function (req,res){
const username = req.body.username;
const password = req.body.password;

users.push({
    username,
    password
})

res.send({
    message : "you have signed up"
})
});

app.post("/signin", function (req,res){
    const username = req.body.username;
    const password = req.body.password;

    let userfound = null;
    for(let i = 0; i<users.length;i++){
    if(users[i].username== username && users[i].password == password){
        userfound = users[i];
    }
}

    if(userfound){
        const token = jwt.sign({
            username : username, 
        },jwt_secret);

        userfound.token = token;

        res.json({
            message : token
        })
    }
     else{
        res.status(403).send({
            message: "Invalid username or password"
        })
     }
}
);

app.get("/me", function(req,res){
const token = req.headers.token;
const decodetoken = jwt.verify(token ,jwt_secret);
const username = decodetoken.username;
let userfound = null;

for(let i=0;i<users.length;i++){
    if(users[i].username == username){
       userfound = users[i];

    }
}

if(userfound){
    res.json({
        username : userfound.username,
        password : userfound.password
    })
}
else{
    res.json({
        message : "user not found"
     })
 } 
})

app.listen(3000);

