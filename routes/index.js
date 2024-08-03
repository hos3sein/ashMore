const express = require("express");
const router = express.Router();

//prefix router Approve
const approve = require("./approve");
router.use("/", approve);

//prefix router Dev
const dev = require("./dev");
router.use("/dev", dev);

const interservice = require("./interservice");
router.use("/interservice", interservice);

module.exports = router;
