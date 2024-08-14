const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const fetch = require("node-fetch");
const Pending = require("../models/Pending");
// const Group = require("../models/Group");
// const Buy = require("../models/Buy");
// const { refresh, refreshGC, refreshGT } = require("../utils/refresh");

// //In connection with approve service
exports.createRequestLineMaker = asyncHandler(async (req, res, next) => {
  const { group, companyName, companyAddress, profileCompany, user, status } =
    req.body;
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>", req.body);
  const create = await Pending.create({
    group,
    companyName,
    companyAddress,
    profileCompany,
    user,
    status,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});
exports.changeApprovelineMakerStatus= asyncHandler(async (req, res, next) => {
   const {userId , bussId , remover}=req.body 
   const lineMaker=await Pending.findOne({$and:[
    {"user._id":userId},
    {"businessMan._id":bussId},
    {group:"lineMaker"},
    {status:1}
   ]})
   if(!lineMaker){
    return next(new ErrorResponse("invalid request",401))
   }
   lineMaker.status=3
   lineMaker.remover = remover 
   await lineMaker.save()

  res.status(201).json({
    success: true,
  });
});
// //In connection with approve service
// exports.createBuy = asyncHandler(async (req, res, next) => {
//   const find = await BussinessMan.findOne({
//     "user._id": req.body.buyer._id,
//   });

//   console.log("find>>>>>>>>><<<<", find);
//   console.log("req.body>>>>>>>>><<<<req.body", req.body);

//   const create = await Buy.create(req.body);

//   const update = await Buy.findByIdAndUpdate(create._id, {
//     "buyer.idCompany": find._id,
//     "buyer.profileCompany": find.profileCompany,
//     "buyer.companyName": find.companyName,
//   });

//   res.status(200).json({
//     success: true,
//     data: {},
//   });
// });
