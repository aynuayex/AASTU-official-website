const router = require("express").Router();
const passport = require("passport");
const { ObjectID } = require("mongodb");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/userModel.js");

router.route("/register").post(
  (req, res, next) => {
    User.findOne({ fullName: req.body.fullName }, (err, user) => {
      if (err) {
        next(err);
      } else if (user) {
        res.json({ user: "user with that name already exists!" });
      } else {
        const {
          fullName,
          email,
          userType,
          department,
          stream,
          id,
          batch,
          phoneNumber,
          password,
        } = req.body;
        const hash = bcrypt.hashSync(password, 12);
        console.log(hash);
    if(userType === "Admin"){
      User.find({ userType: "Admin" }, (err, users) => {
        if (err) console.log(err);
            if(users.length === 0 ){
          
              const newUser = new User({
                fullName,
                email,
                userType,
                department,
                stream,
                id,
                batch,
                phoneNumber,
                password: hash,
              });
              newUser.save((err, data) => {
                if (err) console.log(err);
                next(null, data);
              });
            }else{
              const newUser = new User({
                fullName,
                email,
                userType,
                department,
                stream,
                id,
                batch,
                phoneNumber,
                password: hash,
                approved: false
              });
              newUser.save((err, data) => {
                if (err) console.log(err);
                next(null, data);
            })
          }
      })
    }else{
      const newUser = new User({
        fullName,
        email,
        userType,
        department,
        stream,
        id,
        batch,
        phoneNumber,
        password: hash,
      });
      newUser.save((err, data) => {
        if (err) console.log(err);
        next(null, data);
      });
    }
      }
    });
  },
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res, next) => {
    const userAuth = req.user.fullName;
    if (userAuth) {
      User.findOne({ fullName: userAuth }, (err, user) => {
        if (err) console.log(err);
        const userPriv = user.userType;
        if(userPriv === "Student"){
          return res.json({ user: user.fullName ,identity: {id: "Student"}});
        }
        else if(userPriv === "Admin"){
          
            if(user.approved){
          return res.json({ user: user.fullName , identity: {id: "Admin",approved: true} });
            }
            return res.json({ user: user.fullName , identity: {id: "Admin",approved: false} });
          
        }else{
  
          return res.json({ user: user.fullName , identity: {id: "Teacher"} });
        }
      });
    } else {
      res.sendStatus(401).json({ user: "Incorrect password or email" });
    }
  }
);

router.route("/login").post(passport.authenticate("local"), (req, res) => {
  const userAuth = req.user.fullName;
  console.log(req.user);
  if (userAuth) {
    User.findOne({ fullName: userAuth }, (err, user) => {
      if (err) console.log(err);
      const userPriv = user.userType;
      if(userPriv === "Student"){
        return res.json({ user: user.fullName ,identity: {id: "Student"}});
      }
      else if(userPriv === "Admin"){
        if(user.approved){
          return res.json({ user: user.fullName , identity: {id: "Admin",approved: true} });
            }
            return res.json({ user: user.fullName , identity: {id: "Admin",approved: false} });
          
      }else{

        return res.json({ user: user.fullName , identity: {id: "Teacher"} });
      }
    });
  } else {
    res.sendStatus(401).json({ user: "Incorrect password or email" });
  }
});

router.route("/admin/request/newAdmin").get(ensureAuthenticated,(req, res) => {
  User.find({userType: "Admin", approved: false},(err,users) => {
    if (err) console.log(err);
    res.json({users});
  })
});

router.post("/forgot-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("user with the given email doesn't exist");
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const link = `Do not give this link to anyone, even if they say they are from AASTU!
    This link can be used to log in to your AASTU account. We never ask it for anything.
    If you didn't request this link for resetting your password, simply ignore this message.
    IT WILL EXPIRE IN 10 MINUTES!here is the link
    http://localhost:3000/user/password-reset/${user._id}/${token.token}`;

    await sendEmail(user.email, "Password reset", link);
    res.send({ user: "password reset link sent to your email account" });
  } catch (error) {
    res.send("An error occurred");
    console.log(error);
  }
});
router.post("/password-reset/:userId/:token", async (req, res) => {
  try {
    const user = await User.findById({ _id: new ObjectID(req.params.userId) });
    if (!user) return res.json({ user: "invalid user!" });
    // res.status(400).send("invalid link or expired");
    const tok = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!tok) return res.json({ user: "Link has expired,request a new Link!" });
    // res.status(400).send("Invalid link or expired");
    const hash = bcrypt.hashSync(req.body.password, 12);
    await User.findOneAndUpdate(
      { _id: new ObjectID(user._id) },
      { password: hash },
      { new: true },
      (err, data) => {
        if (err) console.log(err);
        console.log(data);
      }
    ).clone();
    await tok.delete();
    res.json({ user: "password reset successful." });
  } catch (error) {
    res.send("An error occurred");
    console.log(error);
  }
});

router.route("/logout").get((req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    console.log("the user has logged out!");
    res.json({ user: "logout success!" });
  });
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: new ObjectID(id) }, (err, doc) => {
    done(null, doc);
  });
});

const customFields = {
  usernameField: "email",
};

passport.use(
  new LocalStrategy(customFields, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      console.log(`User ${user.email} attempted to log in.`);
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log(req.isAuthenticated());
  console.log(req.user);

  res.redirect("/user/err");
}

router.route("/err").get((req,res) => {
  res.status(401).json({ msg: "You are not authorized to view this page" });
})
module.exports = router;
