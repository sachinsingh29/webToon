const express = require("express");
const app = express();
const connectDB = require("./config/db");
const webtoonRoutes = require("./routes/routing");
const User = require("./config/user");
const bcrypt = require("bcrypt");
const webtoon = require("./config/webtoon");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const rateLimit = require("express-rate-limit");

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret_sachin",
    resave: false,
    saveUninitialized: true,
  })
);

connectDB();

function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next(); // User is authenticated
  }
  res.redirect("/login");
}

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25,
  message: "Too many requests, please try again later.",
});

app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});

//register
app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  try {
    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    res.status(500).send("error");
  }
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.userId = user._id;
    res.redirect("/webtoons");
  } else {
    res.send("Invalid Credentials !!! Try again");
  }
});

app.get("/webtoons", async (req, res) => {
  const webtoons = await webtoon.find({});
  res.render("index.ejs", { webtoons });
});

app.get("/webtoons/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/webtoons", isAuthenticated, rateLimiter, async (req, res) => {
  const { title, description, characters } = req.body;
  const newwebtoon = new webtoon({
    title,
    description,
    characters: characters.split(",").map((char) => char.trim()),
  });

  try {
    await newwebtoon.save();
    res.redirect("/webtoons");
  } catch (error) {
    res.send("some error wahile saving data", error);
  }
});

app.get("/webtoons/:id", async (req, res) => {
  const { id } = req.query;
  const webtoonsData = await webtoon.findById(id);
  res.render("show.ejs", { webtoonsData });
});

app.delete("/webtoons/:id", isAuthenticated, rateLimiter, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedata = await webtoon.findByIdAndDelete(id);
    res.redirect("/webtoons");
  } catch (error) {
    res.status(500).send("Error deleting webtoon: " + error.message);
  }
});
