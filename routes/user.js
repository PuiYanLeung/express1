const express = require("express");
const bcrypt = require("bcrypt");
const { addUser, listUsers, findOneUser, editUser, removeUser } = require("../utils/user");

const router = express.Router();
const saltRounds = 10;

router.get("/", async(req, res)=>{
   res.status(200).json({"message":await listUsers()});
});

router.get("/:id", async (req, res)=>{

    console.log(req.params.id);
    //res.status(200).json({"message":`Attempting to get user ${req.params.id}`});
    res.status(200).json({"message":await findOneUser(req.params.id)});
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
    res.status(201).json({"message": "Created user"});
    // User entered two different passwords
    /*if (await bcrypt.compare(req.body.checkPassword, hcdash)) {
        res.status(201).json({"message": `Password ${req.body.checkPassword} matches ${hash}`});
    } else {
        res.status(401).json({"message": `Password ${req.body.checkPassword} does not match ${hash}`});
    }*/
});

/* PUT replace value */
router.put("/edit", async (req, res) => {
    try {
        await editUser(req.body.id, req.body.newName);
        res.status(201).json({"message": "Edit user"});
    } catch (err) {
        res.status(404).json({ "message": "user does not exist" });
    }
  });

  /* Delete replace value */
router.delete("/delete", async (req, res) => {
    try {
        await removeUser(req.body.id);
        res.status(200).json({"message": "Delete user"});
    } catch (err) {
      res.status(404).json({ "message": "user does not exist" });
    }
  });

module.exports = router;