const express = require("express");

const C = require("../controllers/interservice");

const router = express.Router();

// POST
router.post("/createrequestlineMaker", C.createRequestLineMaker);

router.post("/changeapproveline", C.changeApprovelineMakerStatus);

// router.post("/createbuy", C.createBuy);

// router.get("/dellall", C.delAll);

module.exports = router;
