const express = require("express");


const C = require("../controllers/approve");

const { protect } = require("../middleware/auth");

const router = express.Router();

// POST

// ! ok
router.post("/request", protect, C.requestGroup);

router.get("/createvip",protect,C.createVipRequest)

router.get("/approverequestvip/:invoiceNumber", protect,C.changeToVip);

router.get("/unsetvip/:invoiceNumber", protect, C.changeToUnVip);

router.get("/checkvip",protect,C.checkBussCommerceIsVip)

router.get("/checkvippanel/:id",protect,C.checkBussCommerceIsVipPanel)

router.get("/approverequest/:invoiceNumber",protect, C.approveRequest);

router.get("/approvelinemakerrequest/:invoiceNumber",protect, C.approveLineMakerwithCommerce);

router.get("/approvelinemakerrequestadmin/:invoiceNumber",protect, C.approveLineMakerwithPanel);

router.get("/rejectlinemakerrequest/:invoiceNumber",protect, C.rejectLineMakerwithCommerce);

router.get("/rejectlinemakerrequestadmin/:invoiceNumber",protect, C.rejectLineMakerwithPanel);

router.get("/getHistory",protect, C.getAllRejected);

router.get("/reject/:invoiceNumber",protect, C.reject);

router.get("/rejectvip/:invoiceNumber",protect, C.rejectVip);

router.get("/getbussqr",protect,C.getAddLineMakerQrForBuss)

router.get("/approvelinemaker/:id",protect, C.lineMakerApproveRequest);

router.get("/getlinemakerapproverequst",protect, C.getPendinglineMakerForCommerce);

router.get("/getlinemakerapproverequstadmin/:id",protect, C.getPendinglineMakerForAdmin);



// ! ok
router.get("/allrequestme", protect, C.allRequestMe);

router.get("/allpendings",protect,C.allPending);

router.get("/allvippendings",protect ,C.allVipPending);

router.get("/allapprovecount",protect,C.getAllInfoAboutUserApprove)

module.exports = router;
