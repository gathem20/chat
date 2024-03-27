const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const compression = require("compression");
const collection = require("./config");
// const electron = require("electron");
const app = express();
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs")
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.static("public"));
app.get("/signup", (req, res) => {
  res.render("/signup");
});
try {
  app.post("/signup", async (req, res) => {
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      image: req.body.image,
    };
    const Extuser = await collection.findOne({
      email: data.email,
    });
    if (Extuser) {
      res.status(400).send({
        message: "User already exists. Please choose a different email.",
      });
    } else {
      const saltround = 10;
      const hashpassword = await bcrypt(data.password, saltround);
      const userdata = await collection.insertMany(data);
      console.log(userdata);
      data.password = hashpassword;
      res.render("login");
    }
  });
} catch (err) {
  res.status(500).send({ error: err });
}
//login

app.get("/login", (req, res) => {
  res.render("/login");
});

try {
  app.post("/login", async (req, res) => {
    const check = await collection.findOne({ email: req.body.email });
    if (!check) {
      res.send("Wrong Email!");
    } else {
      const isPassword = await bcrypt.compare(
        req.body.password,
        check.password
      );
    }
    if (isPassword) {
      res.render("users");
    } else {
      res.send("Try Again!");
    }
  });
} catch (err) {
  res.send("Something Wrong!");
}
app.get("/logout", (req, res) => {
  res.redirect("/login");
});

const port = 2000;

app.listen(port, () => {
  console.log(`server is worked on port:${port}`);
});
