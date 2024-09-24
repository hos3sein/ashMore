const Pending = require("../models/Pending");
const VipPending = require("../models/VipPending");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const {pushNotificationStatic}=require("../utils/pushNotif")
const {walletUpdater,walletUpdaterApp}=require("../utils/wallet")

const {
  createTruck,
  addGroup,
  createBussinessMan,
  createTransport,
  createLineMaker,
  pushNotification,
  notification,
  getAutoApprove,
  getAutoApproveVip,
  setCommereVip,
  unSetCommereVip,
  findBuss,
  findBussByQR,
  updatePending,
  setCommereVipAuth,
  unSetCommereVipAuth,
  getAllVarible,
  newLog,getUSER
} = require("../utils/request");

// ! OK
exports.requestGroup = asyncHandler(async (req, res, next) => {
  // const isAutoApprove = await getAutoApprove();
  console.log('req.body' , req.body)
  const validate1 = getUSER(req.user._id)
   if (!validate1.data.isAvtive){
    return res.status(401).json({
      success : false,
      payload : {
        error : 'user is not active please contact with admin!!'
      }
    })
   }
   const isAutoApprove = false
 
  const findFirst = await Pending.findOne({
    $and: [{ "user._id": req.user._id }, { group: req.body.group }],
  });
  
  if (findFirst) {
    if (findFirst.status == 0 || findFirst.status == 1){
        return next(new ErrorResponse("You have already requested", 401));    
  }
  }
   
  const user = {
    _id: req.user._id,
    username: req.user.username,
    pictureProfile: req.user.pictureProfile,
    phone:req.user.phone
  }
  const {
    group,
    companyName,
    companyLicensePhoto,
    companyAddress,
    idCardPhoto,
    idCard,
    truckType,
    truckPlate,
    truckPlatePhoto,
    transportCapacity,
    profileCompany,
    depositAmount,
    businessMan,
    idCardBack,
    idCardName,
    licenseFront,
    licenseBack,
    qualificationFront,
    qualificationBack,
    driverCertificateFront,
    driverCertificateBack,
    roadTransportLicense,
    roadTransportLicenseFront,
    registrationData,
    bankNumber,
    bankPhone,
    bankHomeAddress,
    transportQuntity,
    deals
  } = req.body;
  console.log("user",user);
  const obj={...req.body}
  obj.user=user
  obj.status=0
  obj.deposit=depositAmount ? true : false
  console.log("objjjjj",obj)
  const create = await Pending.create(obj);
  
  // if (create.group == "truck") {
  //   const body = {
  //     group: create.group,
  //   };
  //   const data = {
  //     group: create.group,
  //     companyName: create.companyName,
  //     companyLicensePhoto: create.companyLicensePhoto,
  //     companyAddress: create.companyAddress,
  //     idCard: create.idCard,
  //     idCardPhoto: create.idCardPhoto,
  //     truckType: create.truckType,
  //     truckPlate: create.truckPlate,
  //     truckPlatePhoto: create.truckPlatePhoto,
  //     transportCapacity: create.transportCapacity,
  //     profileCompany: create.profileCompany,
  //     deposit: create.deposit,
  //     depositAmount: create.depositAmount,
  //     user: create.user,
  //   };
  // }

  // if (create.group == "commerce") {
    
  //   const body = {
  //     group: create.group,
  //   };
  //   const data = {
  //     group: create.group,
  //     companyName: create.companyName,
  //     companyLicensePhoto: create.companyLicensePhoto,
  //     companyAddress: create.companyAddress,
  //     idCard: create.idCard,
  //     idCardPhoto: create.idCardPhoto,
  //     profileCompany: create.profileCompany,
  //     user: create.user,
  //   };
  // }

  // if (create.group == "transport") {
  //   const body = {
  //     group: create.group,
  //   };
  //   const data = {
  //     group: create.group,
  //     companyName: create.companyName,
  //     companyLicensePhoto: create.companyLicensePhoto,
  //     companyAddress: create.companyAddress,
  //     idCard: create.idCard,
  //     idCardPhoto: create.idCardPhoto,
  //     profileCompany: create.profileCompany,
  //     deals:create.deals,
  //     user: create.user,
  //   };
  // }
  await pushNotificationStatic(req.user._id,1)
  // await pushNotification(
  //   "Your data is under review and we will get back to you within 72 hours",
  //   "wait for approve",
  //   "wait for approve",
  //   user,
  //   user,
  //   "Approve",
  //   "Approve"
  // );
  // await notification(
  //   `Your data is under review and we will get back to you within 72 hours.`,
  //   user,
  //   user,
  //   find._id,
  //   "Approve",
  //   "Approve",
  //   "Approve"
  // );
  res.status(200).json({
    success: true,
    data: create,
  });
});

exports.createVipRequest = asyncHandler(async (req, res, next) => {
    
//   const isCommerce = req.user.group.includes("commerce");
//   if (!isCommerce) {
//     return next(new ErrorResponse("only commerce can be vip", 401));
//   }
const validate1 = getUSER(req.user._id)
   if (!validate1.data.isAvtive){
    return res.status(401).json({
      success : false,
      payload : {
        error : 'user is not active please contact with admin!!'
      }
    })
   }
  console.log('start')
  const varibels=await getAllVarible()
// console.log(varibels)
  const vipVaribels=varibels.commerceVipAmount
  console.log('>>>>>>>>' , vipVaribels)
  const walletResult=await walletUpdater(0 , req.user._id , vipVaribels , "Vip request cost","approve")
  console.log('><><><><>')
  console.log(walletResult)
  if(!walletResult.success){
    console.log('user wallet has no money')
    next(new ErrorResponse("wallet payment failed",500))
  }
  console.log('111')
  const walletResultApp=await walletUpdaterApp(1,req.user._id ,  vipVaribels , "Vip request cost","approve")
  if(!walletResultApp.success){
    next(new ErrorResponse("wallet payment failed",500))
  }
  console.log('2222')
  const paymentInvoiceNumber=walletResult.data
    
  const user = {
    _id: req.user._id,
    username: req.user.username,
    pictureProfile: req.user.pictureProfile,
    phone : req.user.phone
  };
  console.log('3333')
  const userDetails = await Pending.findOne({
    $and: [
      {
        "user._id": req.user._id,
      },
      {
        group: "commerce",
      },
    ],
  });
  console.log('4444')
  if(!userDetails){
    return next (new ErrorResponse("commerce not found",404))
  }
  const companyName = userDetails.companyName;
  const companyLicensePhoto = userDetails.companyLicensePhoto;
  const companyAddress = userDetails.companyAddress;
  const profileCompany = userDetails.profileCompany;
   const idCardPhoto = userDetails.idCardPhoto;
  const idCardBack = userDetails.idCardBack;
  // const isAutoApproveVip = await getAutoApproveVip();
  const isAutoApproveVip=false
  await VipPending.create({
    user,
    idCardPhoto,
    idCardBack,
    companyName,
    companyLicensePhoto,
    companyAddress,
    profileCompany,
    paymentInvoiceNumber,
    typeUser: isAutoApproveVip ? 1 : 0,
    status: isAutoApproveVip ? 1 : 0,
  });
  if(isAutoApproveVip){
    await setCommereVip(req.user._id)
    await setCommereVipAuth(req.user._id)
  }
  await pushNotificationStatic(req.user._id , 4)
  res.status(201).json({
    success: true,
    data: {},
  });
});


exports.changeToVip = asyncHandler(async (req, res, next) => {
  const user=req.user
  const isAdmin = user.group.includes("admin");
  const isSuperAdmin = user.group.includes("superAdmin");
  
  if(!isAdmin&&!isSuperAdmin){
    return next(new ErrorResponse("you dont have access to this route ",401))
  }
  
  const findUser = await VipPending.findOne({
    invoiceNumber: req.params.invoiceNumber,
  });
  const validate1 = getUSER(findUser.user._id)
   if (!validate1.data.isAvtive){
    return res.status(401).json({
      success : false,
      payload : {
        error : 'user is not active please contact with admin!!'
      }
    })
   }
  if (!findUser) {
    return next(new ErrorResponse("user not found", 401));
  }
  // console.log("findFirst", findFirst);
  if (findUser.typeUser == 1) {
    return next(new ErrorResponse("You have already vip", 401));
  }
 
  const result=await setCommereVip(findUser.user._id)
  const auth=await setCommereVipAuth(findUser.user._id)
  if(!result.success){
    return next(new ErrorResponse("serverError", 500));
  }
  if(!auth.success){
    return next(new ErrorResponse("serverError", 500));
  }
  const create = await VipPending.findOneAndUpdate({"invoiceNumber":req.params.invoiceNumber},{
    typeUser: 1,
    status: 1,
  }) 
  await setCommereVip(findUser.user._id)
  await setCommereVipAuth(findUser.user._id)
  await pushNotificationStatic(findUser.user._id,4)
  // await pushNotification(
  //   "Your vip request has been confirmed",
  //   "vip",
  //   "vip",
  //   reciver,
  //   sender,
  //   "vip",
  //   "vip"
  // );
  // await notification(
  //   `Your vip request has been confirmed`,
  //   reciver,
  //   reciver,
  //   findUser._id,
  //   "vip",
  //   "vip",
  //   "vip"
  // );
  const Log = {
    admin : {username :req.user.username , phone : req.user.phone , adminRole : req.user?.adminRole , group : req.user?.group , firstName : req.user?.firstName , lastName : req.user?.lastName},
    section : "Approve",
    part : "Approve Vip membership",
    success : true,
    description : `${req.user.username} successfully Approved user: ${create.user.username}`,
  }
  await newLog(Log)
  res.status(200).json({
    success: true,
    data: {},
  });
});



exports.changeToUnVip = asyncHandler(async (req, res, next) => {
  const user=req.user
  const isAdmin = user.group.includes("admin");
  const isSuperAdmin = user.group.includes("superAdmin");
  if(!isAdmin&&!isSuperAdmin){
    return next(new ErrorResponse("you dont have access to this route ",401))
  }
  const findUser = await VipPending.findOne({
    invoiceNumber: req.params.invoiceNumber,
    typeUser:1
  });
  if (!findUser) {
    return next(new ErrorResponse("user not found", 401));
  }
  const reciver = {
    _id: findUser.user._id,
    username: findUser.user.username,
    pictureProfile: findUser.user.pictureProfile,
  };
  const sender = {
    _id: req.user._id,
    username: req.user.username,
    pictureProfile:req.user.pictureProfile,
  };
  const result= await unSetCommereVip(findUser.user._id)
  const auth=await unSetCommereVipAuth(findUser.user._id)
  if(!result.success){
    return next(new ErrorResponse("serverError", 500));
  }
  if(!auth.success){
    return next(new ErrorResponse("serverError", 500));
  }
   findUser.status=2
   await findUser.save()
   await pushNotificationStatic(findUser.user._id , 6)
  //  await pushNotification(
  //   "Your vip Account change to unvip",
  //   "unvip",
  //   "unvip",
  //   reciver,
  //   sender,
  //   "unvip",
  //   "unvip"
  // );
  // await notification(
  //   `Your vip Account change to unvip`,
  //   reciver,
  //   reciver,
  //   findUser._id,
  //   "unvip",
  //   "unvip",
  //   "unvip"
  // );
  const Log = {
    admin : {username :req.user.username , phone : req.user.phone , adminRole : req.user?.adminRole , group : req.user?.group , firstName : req.user?.firstName , lastName : req.user?.lastName},
    section : "Approve",
    part : "reject",
    success : true,
    description : `${req.user.username} successfully reject user: ${findUser.user.username}`,
  }
  await newLog(Log)
  res.status(200).json({
    success: true,
    data: {},
  });
});


// OK

exports.allRequestMe = asyncHandler(async (req, res, next) => {
  const all = await Pending.find({$and:[
    {"user._id": req.user._id},
     {status:1}
  ]});

  res.status(200).json({
    success: true,
    data: all,
  });
});

exports.checkBussCommerceIsVip=asyncHandler(async (req, res, next) => {
  
  const commerce=await findBuss(req.user._id)

  if(!commerce){
    return next(new ErrorResponse("Buss Not found",404))
  }
   
  res.status(200).json({
    success: true,
    data: commerce.isVip,
  });
});
exports.checkBussCommerceIsVipPanel=asyncHandler(async (req, res, next) => {
  const user=req.user
  const isAdmin = user.group.includes("admin");
  const isSuperAdmin = user.group.includes("superAdmin");
  if(!isAdmin&&!isSuperAdmin){
    return next(new ErrorResponse("you dont have access to this route ",401))
  }
  const commerce=await findBuss(req.params.id)

  if(!commerce){
    return next(new ErrorResponse("Buss Not found",404))
  }
   
  res.status(200).json({
    success: true,
    data: commerce.isVip,
  });
});


// ADMIN
// OK
exports.approveRequest = asyncHandler(async (req, res, next) => {
  const user=req.user
  const isAdmin = user.group.includes("admin");
  const isSuperAdmin = user.group.includes("superAdmin");
  if(!isAdmin&&!isSuperAdmin){
    return next(new ErrorResponse("you dont have access to this route ",401))
  }
  const find = await Pending.findOne({
    invoiceNumber: req.params.invoiceNumber,
  });
  if(!find){
    return next(new ErrorResponse("Approve request not found",404))
  }
   const validate1 = getUSER(find.user._id)
   if (!validate1.data.isAvtive){
    return res.status(401).json({
      success : false,
      payload : {
        error : 'user is not active please contact with admin!!'
      }
    })
   }
  // const reciver = {
  //   _id: find.user._id,
  //   username: find.user.username,
  //   pictureProfile: find.user.pictureProfile,
  // };
  // const sender = {
  //   _id: user._id,
  //   username: user.username,
  //   pictureProfile:user.pictureProfile,
  // };
  const body = {
    group: find.group,
  };

  const resultAddGroup = await addGroup(find.user._id, body);


  if (resultAddGroup) {
    await find.updateOne({
      status: 1,
    });

    if (find.group == "truck") {
      const data = {
        group: find.group,
        companyName: find.companyName,
        companyLicensePhoto: find.companyLicensePhoto,
        companyAddress: find.companyAddress,
        idCard: find.idCard,
        idCardPhoto: find.idCardPhoto,
        truckType: find.truckType,
        truckPlate: find.truckPlate,
        truckPlatePhoto: find.truckPlatePhoto,
        transportCapacity: find.transportCapacity,
        profileCompany: find.profileCompany,
        deposit: find.deposit,
        depositAmount: find.depositAmount,
        user: find.user,
      };

      const resultCreateTruck = await createTruck(data);
       const Log = {
      admin : {username :req.user.username , phone : req.user.phone , adminRole : req.user?.adminRole ,group : req.user?.group , firstName : req.user?.firstName , lastName : req.user?.lastName},
      section : "Approve",
      part : "Approve user request",
      success : true,
      description : `${req.user.username} successfully approve truck request of user: ${find.user.username}`,
    }
    await newLog(Log)
    }

    if (find.group == "commerce") {
      const data = {
        group: find.group,
        companyName: find.companyName,
        companyLicensePhoto: find.companyLicensePhoto,
        companyAddress: find.companyAddress,
        idCard: find.idCard,
        idCardPhoto: find.idCardPhoto,
        profileCompany: find.profileCompany,
        user: find.user,
      };

      const resultCreateTruck = await createBussinessMan(data);
       const Log = {
      admin : {username :req.user.username , phone : req.user.phone , adminRole : req.user?.adminRole ,group : req.user?.group , firstName : req.user?.firstName , lastName : req.user?.lastName},
      section : "Approve",
      part : "Approve user request",
      success : true,
      description : `${req.user.username} successfully approve commerce request of user: ${find.user.username}`,
    }
    await newLog(Log)
    }

    if (find.group == "transport") {
      const data = {
        group: find.group,
        companyName: find.companyName,
        companyLicensePhoto: find.companyLicensePhoto,
        companyAddress: find.companyAddress,
        idCard: find.idCard,
        idCardPhoto: find.idCardPhoto,
        profileCompany: find.profileCompany,
        user: find.user,
      };

      const resultCreateTruck = await createTransport(data);
      
       const Log = {
      admin : {username :req.user.username , phone : req.user.phone , adminRole : req.user?.adminRole ,group : req.user?.group , firstName : req.user?.firstName , lastName : req.user?.lastName},
      section : "Approve",
      part : "Approve user request",
      success : true,
      description : `${req.user.username} successfully approve transport request of user: ${find.user.username}`,
    }
    await newLog(Log)

      
    }
    await pushNotificationStatic(find.user._id , 2)
    // await pushNotification(
    //   `Congratulations!You have successfully created a ${find.group} account`,
    //   `Approve!!`,
    //   `Congratulations!You have successfully created a ${find.group} account`,
    //   reciver,
    //   sender,
    //   "Approve",
    //   "Approve"
    // );
    // await notification(
    //   `$Congratulations!You have successfully created a ${find.group} account`,
    //   sender,
    //   reciver,
    //   find._id,
    //   "Approve",
    //   "Approve",
    //   "Approve"
    // );
   
    res.status(200).json({
      success: true,
      data: {},
    });
  }
});



exports.getAllRejected = asyncHandler(async(req , res , next)=>{
  const request = await Pending.find({status : 2})
  const request2 = await Pending.find({status : 1})
  const vipRequests = await VipPending.find({status : 2})
  const vipApproved = await VipPending.find({status : 1})

  res.status(200).json({
    success : true,
    data : {
      rejected : request,
      vipRejected : vipRequests,
      approved : request2,
      vipApproved : vipApproved
    }
  })
})




exports.reject = asyncHandler(async (req, res, next) => {
  const user=req.user
  const isAdmin = user.group.includes("admin");
  const isSuperAdmin = user.group.includes("superAdmin");
  if(!isAdmin&&!isSuperAdmin){
    return next(new ErrorResponse("you dont have access to this route ",401))
  }
  const find = await Pending.findOne({
    invoiceNumber: req.params.invoiceNumber,
  });

  await find.updateOne(
    {
      status: 2,
    },
    { new: true }
  );
  const reciver = {
    _id: find.user._id,
    username: find.user.username,
    pictureProfile: find.user.pictureProfile,
  };
  const sender = {
    _id: user._id,
    username: user.username,
    pictureProfile:user.pictureProfile,
  };
  await pushNotificationStatic(find.user._id , 11)
  // await pushNotification(
  //   `Your approve to ${find.group} request rejected`,
  //   `Reject!!`,
  //   `Your approve to ${find.group} request rejected`,
  //   reciver,
  //   sender,
  //   "Reject!!",
  //   "Reject!!"
  // );
  // await notification(
  //   `Your approve to ${find.group} request rejected`,
  //   sender,
  //   reciver,
  //   find._id,
  //   "Reject!!",
  //   "Reject!!",
  //   "Reject!!"
  // );
  const Log = {
    admin : {username :req.user.username , phone : req.user.phone , adminRole : req.user?.adminRole ,group : req.user?.group , firstName : req.user?.firstName , lastName : req.user?.lastName},
    section : "Approve",
    part : "reject user request",
    success : true,
    description : `${req.user.username} successfully reject ${find.group} request of user: ${find.user.username}`,
  }
  await newLog(Log)
  res.status(200).json({
    success: true,
    data: {},
  });
});

exports.rejectVip = asyncHandler(async (req, res, next) => {
  const user=req.user
  const isAdmin = user.group.includes("admin");
  const isSuperAdmin = user.group.includes("superAdmin");

  if(!isAdmin&&!isSuperAdmin){
    return next(new ErrorResponse("you dont have access to this route ",401))    
  }
  const find = await VipPending.findOne({
    invoiceNumber: req.params.invoiceNumber,
  });

  await find.updateOne(
    {
      status: 2,
    },
    { new: true }
  );
  const reciver = {
    _id: find.user._id,
    username: find.user.username,
    pictureProfile: find.user.pictureProfile,
  };
  const sender = {
    _id: user._id,
    username: user.username,
    pictureProfile:user.pictureProfile,
  };
  await pushNotificationStatic(find.user._id,6)
  // await pushNotification(
  //   `Your vip request rejected`,
  //   `Reject!!`,
  //   `Your vip request rejected`,
  //   reciver,
  //   sender,
  //   "Reject!!",
  //   "Reject!!"
  // );
  // await notification(
  //   `Your vip request rejected`,
  //   sender,
  //   reciver,
  //   find._id,
  //   "Reject!!",
  //   "Reject!!",
  //   "Reject!!"
  // );  
  await unSetCommereVipAuth(find.user._id)
  await unSetCommereVip(find.user._id)
  const Log = {
    admin : {username :req.user.username , phone : req.user.phone , adminRole : req.user?.adminRole , group : req.user?.group , firstName : req.user?.firstName , lastName : req.user?.lastName},
    section : "Approve",
    part : "reject vip request",
    success : true,
    description : `${req.user.username} successfully reject vip request of user: ${find.user.username}`,
  }
  await newLog(Log)
  res.status(200).json({
    success: true,
    data: {},
  });
});




exports.allPending = asyncHandler(async (req, res, next) => {
  const user=req.user
  const isAdmin = user.group.includes("admin");
  const isSuperAdmin = user.group.includes("superAdmin");
  if(!isAdmin&&!isSuperAdmin){
    return next(new ErrorResponse("you dont have access to this route ",401))
  }

  const allCommercePendings = await Pending.find({group : "commerce" ,status : 0})
  const allCommerceApproved = await Pending.find({group : "commerce" ,status : 1})
  const allCommerceRejected = await Pending.find({group : "commerce" ,status : 2})

  const allTruckPendings = await Pending.find({group : "truck" , status : 0})
  const allTruckApproved = await Pending.find({group : "truck" ,status : 1})
  const allTruckRejected = await Pending.find({group : "truck" ,status : 2})

  const allshipingPendings = await Pending.find({group : "transport" , status : 0})
  const allshipingApproved = await Pending.find({group : "transport" ,status : 1})
  const allshipingRejected = await Pending.find({group : "transport" ,status : 2})

  console.log('><><><><><>',allTruckPendings)
  res.status(200).json({
    success: true,
    data : {
      allCommercePendings : allCommercePendings,
      allCommerceApproved : allCommerceApproved,
      allCommerceRejected : allCommerceRejected,
      allTruckPendings : allTruckPendings,
      allTruckApproved : allTruckApproved,
      allTruckRejected : allTruckRejected,
      allshipingPendings : allshipingPendings,
      allshipingApproved : allshipingApproved,
      allshipingRejected : allshipingRejected
    }
  });
});






exports.allVipPending= asyncHandler(async (req, res, next) => {
  const user=req.user
  const isAdmin = user.group.includes("admin");
  const isSuperAdmin = user.group.includes("superAdmin");
  if(!isAdmin&&!isSuperAdmin){
    return next(new ErrorResponse("you dont have access to this route ",401))
  }

  // const allVip = await VipPending.find({ status: 0 });
  const allVipPendings = await VipPending.find({ status: 0 });
  const allViprejected = await VipPending.find({ status: 2 });
  const allVipApproved = await VipPending.find({ status: 1 });
  
  res.status(200).json({
    success: true,
    data: {
      allVipPendings :allVipPendings,
      allViprejected : allViprejected,
      allVipApproved : allVipApproved,
    },
  });
});



exports.getAllInfoAboutUserApprove=asyncHandler(async (req, res, next) => {
  const user=req.user
  const isAdmin = user.group.includes("admin");
  const isSuperAdmin = user.group.includes("superAdmin");
  if(!isAdmin&&!isSuperAdmin){
    return next(new ErrorResponse("you dont have access to this route ",401))
  }
  let approvedUser=0
  let rejectedUser=0
  let watingForApprove=0
  let approvedVip=0
  let rejectedVip=0
  let watingForVip=0

  const allPendingApprove=await Pending.find() 
  const allPendingVip=await VipPending.find()

  allPendingApprove.forEach(item=>{
    (item.status==0)?watingForApprove++:console.log("");
    (item.status==1)?approvedUser++:console.log("");
    (item.status==2)?rejectedUser++:console.log("");

  })
  allPendingVip.forEach(item=>{
    (item.status==0)?watingForVip++:console.log("");
    (item.status==1)?approvedVip++:console.log("");
    (item.status==2)?rejectedVip++:console.log("");
  })
  const totalApproveRole=allPendingApprove.length
  const totalApproveVip=allPendingVip.length
  const obj={
    approvedUser,
    rejectedUser,
    watingForApprove,
    totalApproveRole,
    approvedVip,
    rejectedVip,
    watingForVip,
    totalApproveVip
  }
   
  res.status(200).json({success:true,data:obj})

});


exports.addLineMaker=asyncHandler(async (req, res, next) => {
  const isAutoApprove=false
  const bussId=req.params.id
  const user = {
    _id: req.user._id,
    username: req.user.username,
    pictureProfile: req.user.pictureProfile,
  }
  const validate1 = getUSER(bussId)
  if (!validate1.data.isAvtive){
   return res.status(401).json({
     success : false,
     payload : {
       error : 'user is not active please contact with admin!!'
     }
   })
  }
    const createZ = await Pending.create({
      user,
      group,
      companyName,
      companyAddress: findBuss.companyAddress,
      idCardPhoto,
      idCard,
      profileCompany,
      businessMan: {
        _id: findBuss.user._id,
        pendingId: findBuss._id,
        group: findBuss.group,
        companyName: findBuss.companyName,
        profileCompany: findBuss.profileCompany,
      },
      status: isAutoApprove ? 1 : 0,
    });

    const data = {
      group: createZ.group,
      companyName: createZ.companyName,
      companyAddress: findBuss.companyAddress,
      idCard: createZ.idCard,
      idCardPhoto: createZ.idCardPhoto,
      profileCompany: createZ.profileCompany,
      businessMan: createZ.businessMan,
      user: createZ.user,
    };

    console.log("data", data);
    if (isAutoApprove) {
      const resultAddGroup = await addGroup(req.user._id, body);
      const result = await createLineMaker(data);
      await pushNotification(
        "Approve Accept",
        "you are line maker now",
        "you are line maker now",
        user,
        user,
        "accountStack",
        "User"
      );
      res.status(200).json({
        success: true,
        data: {},
      });
    }
   res.status(201).json({
    success:true,
   })
});

exports.lineMakerApproveRequest=asyncHandler(async (req, res, next) => {
   const findBuss=await findBussByQR(req.params.id)
   if(!findBuss){
    return next(new ErrorResponse("Buss not found",404))
   }
   if(!findBuss.isVip){
    return next(new ErrorResponse("Buss not Vip",401))
   }
    const validate1 = getUSER(findBuss.user._id)
  if (!validate1.data.isAvtive){
   return res.status(401).json({
     success : false,
     payload : {
       error : 'user is not active please contact with admin!!'
     }
   })
  }
   console.log(req.user);
   const user = {
    _id: req.user._id,
    username: req.user.username,
    pictureProfile: req.user.pictureProfile,
  }
   const check=await Pending.find({$and:[
    {"businessMan._id":findBuss.user._id},
    {"user._id":req.user._id},
    {$or:[{status:0},{status:1}]},
    {group:"lineMaker"}
   ]})
   
   if(check.length!=0){
    return res.status(200).json({
      success:false,
      message:"You already requested"
    })
   }
   const validate2 = getUSER(check.user._id)
  if(!validate2.data.isAvtive){
    return res.status(401).json({
      success : false,
      payload : {
        error : 'user is not active please contact with admin!!'
      }
    })
  }
   const initLineMaker = await Pending.create({
    user,
    group:"lineMaker",
    companyName:findBuss.companyName,
    companyAddress: findBuss.companyAddress,
    profileCompany:findBuss.profileCompany,
    idCard:findBuss.idCard,
    idCardPhoto: findBuss.idCardPhoto,
    businessMan: {
      _id: findBuss.user._id,
      pendingId: findBuss._id,
      group: findBuss.group,
      companyName: findBuss.companyName,
      profileCompany: findBuss.profileCompany,
    },
    status:0,
  });
  await updatePending()

  await pushNotificationStatic(req.user_id,1)

  res.status(201).json({
    success:true,
  })
});


exports.getAddLineMakerQrForBuss=asyncHandler(async (req, res, next) => {
  let qrUrl
   const buss=await findBuss(req.user._id)
   if(!buss){
    return next(new ErrorResponse("Buss not found",404))
   }
   console.log(buss);
    const validate1 = getUSER(buss.user._id)
   if (!validate1.data.isAvtive){
    return res.status(401).json({
      success : false,
      payload : {
        error : 'user is not active please contact with admin!!'
      }
    })
   }
   if(process.env.APP_TYPE=="main"){
     qrUrl=`http://120.27.129.194:8003/api/v1/approve/approvelinemaker/${buss.addLineMakerQrCode}`

   }else{
     qrUrl=`https://ashmoreapprove.chinabizsetup.com/api/v1/approve/approvelinemaker/${buss.addLineMakerQrCode}`
   }
   res.status(200).json({
    success:true,
    qrUrl
   })
})


exports.getPendinglineMakerForCommerce=asyncHandler(async (req, res, next) => {
  const findPendingLineMaker=await Pending.find({$and:[
    {"businessMan._id":req.user._id},
    {status:0},
    {group:"lineMaker"}
  ]})

  if(!findPendingLineMaker){
    return next(new ErrorResponse("server error",500))
  }
 
  res.status(200).json({
   success:true,
   data:findPendingLineMaker
  })
})

exports.getPendinglineMakerForAdmin=asyncHandler(async (req, res, next) => {
  const user=req.user
  const isAdmin = user.group.includes("admin");
  const isSuperAdmin = user.group.includes("superAdmin");
  if(!isAdmin&&!isSuperAdmin){
    return next(new ErrorResponse("you dont have access to this route ",401))
  }
  const bussId=req.params.id
  const findPendingLineMaker=await Pending.find({$and:[
    {"businessMan._id":bussId},
    {status:0},
    {group:"lineMaker"}
  ]})

  if(!findPendingLineMaker){
    return next(new ErrorResponse("server error",500))
  }
  res.status(200).json({
   success:true,
   data:findPendingLineMaker
  })
})

exports.approveLineMakerwithCommerce=asyncHandler(async (req, res, next) => {
    const validate1 = getUSER(req.user._id)
   if (!validate1.data.isAvtive){
    return res.status(401).json({
      success : false,
      payload : {
        error : 'user is not active please contact with admin!!'
      }
    })
   }
  const  invoiceNumber=req.params.invoiceNumber
  const body = {
    group:"lineMaker",
  };
  const findPendingLineMaker=await Pending.findOne({$and:[
    {
      invoiceNumber:invoiceNumber,
    },
    {
      status:"0"
    }
  ]})
  if(!findPendingLineMaker){
    return next(new ErrorResponse("Request not found",404))
  }
  const validate2 = getUSER(findPendingLineMaker.user._id)
  if(!validate2.data.isAvtive){
    return res.status(401).json({
      success : false,
      payload : {
        error : 'user is not active please contact with admin!!'
      }
    })
  }
  const lineMaker=findPendingLineMaker
  const data = {
    group:"lineMaker",
    companyName: lineMaker.companyName,
    companyAddress: lineMaker.companyAddress,
    idCard: lineMaker.idCard,
    idCardPhoto: lineMaker.idCardPhoto,
    profileCompany: lineMaker.profileCompany,
    businessMan: lineMaker.businessMan,
    user: lineMaker.user,
  };
  const resultAddGroup = await addGroup(lineMaker.user._id, body);
  const result = await createLineMaker(data);

  findPendingLineMaker.status=1
  await findPendingLineMaker.save()

  await updatePending()
  const reciver = {
    _id: lineMaker.user._id,
    username: lineMaker.user.username,
    pictureProfile: lineMaker.user.pictureProfile,
  };
  const sender = {
    _id: req.user._id,
    username: req.user.username,
    pictureProfile:req.user.pictureProfile,
  };
  await pushNotificationStatic(lineMaker.user._id,7)
  // await pushNotification(
  //   `You are a line maker now `,
  //   `Approve!!`,
  //   `You are a line maker now `,
  //   reciver,
  //   sender,
  //   "Approve!!",
  //   "Approve!!"
  // );
  // await notification(
  //   `You are a line maker now `,
  //   sender,
  //   reciver,
  //   sender._id,
  //   "Approve!!",
  //   "Approve!!",
  //   "Approve!!"
  // );  

  res.status(200).json({
    success:true,
   })
})
 
exports.approveLineMakerwithPanel=asyncHandler(async (req, res, next) => {
  const user=req.user
  const isAdmin = user.group.includes("admin");
  const isSuperAdmin = user.group.includes("superAdmin");
  if(!isAdmin&&!isSuperAdmin){
    return next(new ErrorResponse("you dont have access to this route ",401))
  }
  const  invoiceNumber=req.params.invoiceNumber
  const body = {
    group:"lineMaker",
  };
  const findPendingLineMaker=await Pending.findOne({
    invoiceNumber,
    status:0
  })
  if(!findPendingLineMaker){
    return next(new ErrorResponse("Request not found",404))
  }
  const validate1 = getUSER(findPendingLineMaker.user._id)
  const validate2 = getUSER(findPendingLineMaker.businessMan._id)
   if (!validate1.data.isAvtive || !validate2.data.isActive){
    return res.status(401).json({
      success : false,
      payload : {
        error : 'user is not active please contact with admin!!'
      }
    })
   }
  const lineMaker=findPendingLineMaker
  const data = {
    group:"lineMaker",
    companyName: lineMaker.companyName,
    companyAddress: lineMaker.companyAddress,
    idCard: lineMaker.idCard,
    idCardPhoto: lineMaker.idCardPhoto,
    profileCompany: lineMaker.profileCompany,
    businessMan: lineMaker.businessMan,
    user: lineMaker.user,
  };
  const resultAddGroup = await addGroup(lineMaker.user._id, body);
  
  const result = await createLineMaker(data);
  findPendingLineMaker.status=1
  await findPendingLineMaker.save()
  const reciver = {
    _id: lineMaker.user._id,
    username: lineMaker.user.username,
    pictureProfile: lineMaker.user.pictureProfile,
  };
  const sender = {
    _id: req.user._id,
    username: req.user.username,
    pictureProfile:req.user.pictureProfile,
  };
  console.log('last time' , lineMaker.user._id)
  await pushNotificationStatic(lineMaker.user._id , 13)
  // await pushNotification(
  //   `You are a line maker now `,
  //   `Approve!!`,
  //   `You are a line maker now `,
  //   reciver,
  //   sender,
  //   "Approve!!",
  //   "Approve!!"
  // );
  // await notification(
  //   `You are a line maker now `,
  //   sender,
  //   reciver,
  //   sender._id,
  //   "Approve!!",
  //   "Approve!!",
  //   "Approve!!"
  // );  
  const Log = {
    admin : {username :req.user.username , phone : req.user.phone , adminRole : req.user?.adminRole ,group : req.user?.group , firstName : req.user?.firstName , lastName : req.user?.lastName},
    section : "Approve",
    part : "Approve linemaker request",
    success : true,
    description : `${req.user.username} successfully approved linemaker request of user: ${findPendingLineMaker.user.username}`,
  }
  await newLog(Log)
  res.status(200).json({
    success:true,
   })
})
 


exports.rejectLineMakerwithCommerce=asyncHandler(async (req, res, next) => {
  const  invoiceNumber=req.params.invoiceNumber
 
  const findPendingLineMaker=await Pending.findOne({
    invoiceNumber,
    status:0
  })
  if(!findPendingLineMaker){
    return next(new ErrorResponse("Request not found",404))
  }
 
  findPendingLineMaker.status=2
  await findPendingLineMaker.save()

  await updatePending()
  console.log('passssssssss>>>>>>>>')
  const reciver = {
    _id: findPendingLineMaker.user._id,
    username: findPendingLineMaker.user.username,
    pictureProfile: findPendingLineMaker.user.pictureProfile,
  };
  const sender = {
    _id: req.user._id,
    username: req.user.username,
    pictureProfile:req.user.pictureProfile,
  };
  console.log('lets test')
  await pushNotificationStatic(lfindPendingLineMaker.user._id,8)
  console.log('passs>>>>>>')
  // await pushNotification(
  //   ` your lineMaker requested reject`,
  //   `reject!!`,
  //   `You are a line maker now `,
  //   reciver,
  //   sender,
  //   "reject!!",
  //   "reject!!"
  // );
  // await notification(
  //   `your lineMaker requested reject `,
  //   sender,
  //   reciver,
  //   sender._id,
  //   "reject!!",
  //   "reject!!",
  //   "reject!!"
  // );  
  
  res.status(200).json({
    success:true,
   })
})


exports.rejectLineMakerwithPanel=asyncHandler(async (req, res, next) => {
  const  invoiceNumber=req.params.invoiceNumber
 
  const findPendingLineMaker=await Pending.findOne({
    invoiceNumber,
    status:0
  })
  if(!findPendingLineMaker){
    return next(new ErrorResponse("Request not found",404))
  }

  const lineMaker=findPendingLineMaker
  findPendingLineMaker.status=3

  await findPendingLineMaker.save()

  await updatePending()
  console.log('after updating pending...')
  const reciver = {
    _id: findPendingLineMaker.user._id,
    username: findPendingLineMaker.user.username,
    pictureProfile: findPendingLineMaker.user.pictureProfile,
  };
  const sender = {
    _id: req.user._id,
    username: req.user.username,
    pictureProfile:req.user.pictureProfile,
  };
  console.log('last levvel>>>' , findPendingLineMaker.user._id)
  await pushNotificationStatic(findPendingLineMaker.user._id,12)
  console.log('passs>>>>>>')
  // await pushNotification(
  //   ` your lineMaker requested reject`,
  //   `reject!!`,
  //   `You are a line maker now `,
  //   reciver,
  //   sender,
  //   "reject!!",
  //   "reject!!"
  // );
  // await notification(
  //   `your lineMaker requested reject `,
  //   sender,
  //   reciver,
  //   sender._id,
  //   "reject!!",
  //   "reject!!",
  //   "reject!!"
  // );  
  const Log = {
    admin : {username :req.user.username , phone : req.user.phone , adminRole : req.user?.adminRole ,group : req.user?.group , firstName : req.user?.firstName , lastName : req.user?.lastName},
    section : "Approve",
    part : "reject linemaker request",
    success : true,
    description : `${req.user.username} successfully reject linemaker request of user: ${findPendingLineMaker.user.username}`,
  }
  await newLog(Log)
  res.status(200).json({
    success:true 
   })
})
exports.tets=asyncHandler(async (req, res, next) => {
  await pushNotificationStatic("661d3f6946767206333b3ca1",2)
  res.status(200).json({
    success:true,
   })
})