const express = require("express");
const app = express();
require("./db/config");
const User = require("./db/User");
const cors = require("cors");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");
// secret token
const JwtKey = "e-com";

app.use(express.json());
app.use(cors());
app.post("/signup", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  // jwt token
  Jwt.sign({ result }, JwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "somthing went wrong" });
    }
    res.send({ result, auth: token });
  });
  // ------
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      // jwt token
      Jwt.sign({ user }, JwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "somthing went wrong" });
        }
        res.send({ user, auth: token });
      });
      // ------
    } else {
      res.send({ result: "No user Found" });
    }
  } else {
    res.send({ result: "email or password are wrong" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Products Found..." });
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Record Found" });
  }
});

app.put("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

// middleware
function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, JwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result : "please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result : "Please add token with header" });
  }
};


app.listen(8080);
