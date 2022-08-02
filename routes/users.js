const express = require ('express');
const router = express.Router();
const User = require('../models/user');
const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());


router.post('/api/signup', async (req, res) => {
    console.log("in user route");
    console.log(req.body.User.email);
    console.log("req body:");
    console.log(req.body);
        
    const user = new User({
        name: req.body.User.name,
        email: req.body.User.email,
        username: req.body.User.username,
        password: req.body.User.password
    });
    
    try{
    const savedUser = await user.save();
        res.json(savedUser);
        console.log("saved"+savedUser);
     }catch(err){
        res.json({ message: err });
     }   
});

    router.get("/api/login", (req,res) => {
       
    console.log("check")
    console.log(req.params);
    var flag=false; 
        User.findOne({"username":req.params.username},function(err,result){
        if (err) {
            console.log(err);
            res.send({error: "An error has occurred"});
          } else {
            if (result == null) {
              res.send({"error": "This email address is not recognised, please check you have entered your email correctly"});
            } 
            else {
              console.log("Email recognised");
                        
              if (req.body.password !== result.password){
                res.send({"error":"Sorry your password is incorrect"});
              } else {
                res.send("Login successful")
              };
            }
          }
        })
    });

module.exports = router;