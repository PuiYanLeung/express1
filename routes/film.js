const express = require("express");
 const { addfilm, removefilm, findfilm, editfilm, listfilms} = require("../utils/film");

const router = express.Router();

router.get("/movie", async(req, res)=>{
   res.status(200).json({"message":await listfilms()});
});

router.get("/:idmovie", async (req, res)=>{
    console.log(req.params.id);
    res.status(200).json({"message":await findfilm(req.params.id)});
});


router.post("/addmovie", async(req, res) => {
    await addfilm(req, res);
    res.status(201).json({"message": "Created a movie"});
});
   

router.put("/editfilm", async (req, res) => {
    try {
        await editfilm(req.body.name, req.body.newmovieName);
        res.status(201).json({"message": "Edited movie"});
    } catch (err) {
        res.status(404).json({ "message": "movie does not exist" });
    }
  });

  /* Delete replace value */
router.delete("/deletemovie", async (req, res) => {
    try {
        await removefilm(req.body.name);
        res.status(200).json({"message": "movie deleted"});
    } catch (err) {
      res.status(404).json({ "message": "movie does not exist" });
    }
  });

module.exports = router;