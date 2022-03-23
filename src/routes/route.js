const express = require("express");
const router = express.Router();

const collegeController= require("../controllers/collegeController");
const internController= require("../controllers/internController");

//Testing API
router.get("/test", function(req,res)
{
    res.send({status: true, message:"Working...!!"})
})

router.post("/college", collegeController.createcollege);

router.post("/intern", internController.createIntern);

router.get("/getinfo", collegeController.collegeDetails);

module.exports = router;