const express = require("express");
const bcrypt = require ("bcrypt")
const jwt = require("jsonwebtoken");
const passport = require("passport");

const { addUser, listUsers, findOneUser, editUser, removeUser } = require("../utils/user");
const router = express.Router();
const session = { session: false };

router.get("/:id", async (req, res)=>{

    console.log(req.params.id);
    //res.status(200).json({"message":`Attempting to get user ${req.params.id}`});
    res.status(200).json({"message":await findOneUser(req.params.id)});
});


const profile = async (req, res, next) => {
  res
    .status(200)
    .json({ msg: "Profile", user: req.user, token: req.query.secret_token });
};

const register = async (req, res, next) => {
  console.log(req.body);
  req.user.email
    ? res.status(201).send({ msg: "registered successfully", user: req.user })
    : res.status(401).send({ msg: "User already exists" });
};


const login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        res.status(500).json({ msg: "Internal Server Error", err });
      } else if (!user) {
        res.status(401).json({ msg: "User not found" });
      } else {
        const fn = async (error) => {
          error
            ? next(error)
            : res.status(200).json({
                user,
                token: jwt.sign(
                  { user: { id: user.id, email: user.email} },
                  process.env.SECRET_KEY
                ),
              });
        };
        req.login(user, session, fn);
      }
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};



router.put("/edit", async (req, res) => {
  try {
      await editUser(req.body.id, req.body.newEmail);
      res.status(201).json({"message": "Edit user"});
  } catch (err) {
      res.status(404).json({ "message": "email does not exist" });
  }
});


router.delete("/delete", async (req, res) => {
    try {
        await removeUser(req.body.id);
        res.status(200).json({"message": "Delete USER"});
    } catch (err) {
      res.status(404).json({ "message": "user does not exist" });
    }
  });


router.post("/register", passport.authenticate("register", session), register);
router.get("/profile", passport.authenticate("jwt", session), profile);
router.post("/login", login);

module.exports = router;
