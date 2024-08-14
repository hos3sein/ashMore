const express = require("express");

const C = require("../controllers/dev");
const { protect } = require("../middleware/auth");

const router = express.Router();

// POST
router.post("/createperm", C.createPerm);

router.get("/dellall", C.delAll);
router.get("/dell/:id", C.del);

router.get("/all", C.all);

router.get("/line/:id", C.creLibe);

router.get("/create", C.create);

router.get("/testnotif",C.pushyTest)

router.get('/getMapData' , C.getMap)

router.get('/getdeletedlinemaker/:id' ,protect ,C.getAlldeleted)

module.exports = router;
