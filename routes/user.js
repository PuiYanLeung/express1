const express = require("express");
const bcrypt = require("bcrypt");
const { addUser, listUsers } = require("../utils/user");

const router = express.Router();
const saltRounds = 10;

router.get("/", async(req, res)=>{
   res.status(200).json({"msg":await listUsers()});
});

router.get("/:id", async (req, res)=>{
    res.status(200).json({"msg":`Attempting to get user ${req.params.id}`});
});

router.post("/register", async(req, res) => {
    if (req.body.password !== req.body.checkPassword) {
        return res.status(401).json({"message": `Passwords don't match`});
    } else if (!req.body.name) {
        return res.status(401).json({"message": `No username provided`});
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);
//add Pui 202109011122
    await addUser(req.body.name, hash, req.body.first_name, req.body.last_name, req.body.last_name, req.body.email, req.body.membership);
    res.status(201).json({"msg": "Created user"});
    // User entered two different passwords
    /*if (await bcrypt.compare(req.body.checkPassword, hcdash)) {
        res.status(201).json({"message": `Password ${req.body.checkPassword} matches ${hash}`});
    } else {
        res.status(401).json({"message": `Password ${req.body.checkPassword} does not match ${hash}`});
    }*/
});

//add Pui 202109011122 /* PUT replace value */
router.put('/:id', async (req, res) => {
    try {
      res.json(await programmingLanguages.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating programming language`, err.message);
      next(err);
    }
  });

module.exports = router;