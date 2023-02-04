require("dotenv").config();
const express = require("express");
const app = express();
// const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB,
      collection: "sessions",
    }),
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 3 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(`DB connection Error: ${err}`);
  });

  const userRouter = require("./routes/userRoutes");

  app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

module.exports = app;
