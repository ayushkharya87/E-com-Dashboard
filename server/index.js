const express = require("express");
const app = express();
require("./db/config");
const User = require("./db/User");
const cors = require("cors")

app.use(express.json());
app.use(cors())
app.post("/signup", async (req, res) => {
    let user = new User(req.body)
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result)
});

app.post("/login", async (req, res) => {

    if(req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
          if(user) {
            res.send(user);
          } else {
            res.send({result: "No user Found"})
          }
    } else {
        res.send({result: "email or password are wrong"})
    }
    
})

app.listen(8080);
