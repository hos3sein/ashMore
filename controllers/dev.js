const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const {pushNotificationStatic}=require("../utils/pushNotif")
const fetch = require("node-fetch");
const Pending = require("../models/Pending");
const Group = require("../models/Group");
const {
  createTruck,
  addGroup,
  createBussinessMan,
  createTransport,
  createLineMaker,
} = require("../utils/request");
exports.createPerm = asyncHandler(async (req, res, next) => {
  const { data } = req.body;
  try {
    // console.log(">>req.body.data");
    const urll = `${process.env.SERVICE_SETTING}/api/v1/setting/dev/createperm`;
    const rawResponse = await fetch(urll, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await rawResponse.json();

    if (response.success) {
      res.status(200).json({
        success: true,
        data: {},
      });
    }
  } catch (err) {
    console.log("err", err);
  }
});

exports.delAll = asyncHandler(async (req, res, next) => {
  await Pending.remove();
  // await Group.remove();

  res.status(200).json({
    success: true,
    dta: {},
  });
});

exports.del = asyncHandler(async (req, res, next) => {
  await Pending.findByIdAndRemove(req.params.id);
  // await Group.remove();

  res.status(200).json({
    success: true,
    dta: {},
  });
});

exports.all = asyncHandler(async (req, res, next) => {
  const find = await Pending.find();
  // await Group.remove();

  res.status(200).json({
    success: true,
    dta: find,
  });
});

exports.creLibe = asyncHandler(async (req, res, next) => {
  const find = await Pending.findById(req.params.id);
  // console.log("find", find);
  const findBuss = await Pending.findById(find.businessMan.pendingId);
  // console.log("findBuss", findBuss);

  const data = {
    group: find.group,
    companyName: find.companyName,
    companyAddress: findBuss.companyAddress,
    idCard: find.idCard,
    idCardPhoto: find.idCardPhoto,
    profileCompany: find.profileCompany,
    businessMan: find.businessMan,
    user: find.user,
  };

  const result = await createLineMaker(data);

  // console.log("result>>>>>>>>>>", result);

  // await Group.remove();

  res.status(200).json({
    success: true,
    dta: {},
  });
});

exports.create = asyncHandler(async (req, res, next) => {
  const {
    user,
    group,
    educationalLicense,
    businessMan,
    companyName,
    companyLicensePhoto,
    companyAddress,
    idCardName,
    idCard,
    idCardPhoto,
    idCardBack,
    truckType,
    truckPlate,
    truckPlatePhoto,
    transportCapacity,
    transportQuntity,
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
    profileCompany,
    deposit,
    depositAmount,
    status,
    typeUser,
  } = req.body;
  const find = await Pending.create({
    user,
    group,
    educationalLicense,
    businessMan,
    companyName,
    companyLicensePhoto,
    companyAddress,
    idCardName,
    idCard,
    idCardPhoto,
    idCardBack,
    truckType,
    truckPlate,
    truckPlatePhoto,
    transportCapacity,
    transportQuntity,
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
    profileCompany,
    deposit,
    depositAmount,
    status,
    typeUser,
  });
  // await Group.remove();

  res.status(200).json({
    success: true,
    dta: find,
  });
});

exports.pushyTest = asyncHandler(async (req, res, next) => {
  const userId="65a799bdd0e8c2cebe7a434c"
  await pushNotification(userId,1)
  res.status(200).json({
    success: true,
    data: {},
  });
});




exports.getMap = asyncHandler(async(req , res , next)=>{

  const province = ["Alberta" , "British Columbia" , "Manitoba" , "New Brunswick" , "Newfoundland and Labrador" , "Northwest Territories" , 
    "Nova Scotia","Nunavut","Ontario" , "Prince Edward Island" , "Quebec" , "Saskatchewan" , "Yukon"
  ]

  const commerce = [{ name: "Alberta", value: 0 },
    { name: "British Columbia", value: 0 },
    { name: "Manitoba", value: 0 },
    { name: "New Brunswick", value: 0 },
    { name: "Newfoundland and Labrador", value: 0 },
    { name: "Northwest Territories", value: 0 },
    { name: "Nova Scotia", value: 0 },
    { name: "Nunavut", value: 0 },
    { name: "Ontario", value: 0 },
    { name: "Prince Edward Island", value: 0 },
    { name: "Quebec", value: 0 },
    { name: "Saskatchewan", value: 0 },
    { name: "Yukon", value: 0 },]

  const truck = [{ name: "Alberta", value: 0 },
    { name: "British Columbia", value: 0 },
    { name: "Manitoba", value: 0 },
    { name: "New Brunswick", value: 0 },
    { name: "Newfoundland and Labrador", value: 0 },
    { name: "Northwest Territories", value: 0 },
    { name: "Nova Scotia", value: 0 },
    { name: "Nunavut", value: 0 },
    { name: "Ontario", value: 0 },
    { name: "Prince Edward Island", value: 0 },
    { name: "Quebec", value: 0 },
    { name: "Saskatchewan", value: 0 },
    { name: "Yukon", value: 0 },]

  const linemaker = [{ name: "Alberta", value: 0 },
    { name: "British Columbia", value: 0 },
    { name: "Manitoba", value: 0 },
    { name: "New Brunswick", value: 0 },
    { name: "Newfoundland and Labrador", value: 0 },
    { name: "Northwest Territories", value: 0 },
    { name: "Nova Scotia", value: 0 },
    { name: "Nunavut", value: 0 },
    { name: "Ontario", value: 0 },
    { name: "Prince Edward Island", value: 0 },
    { name: "Quebec", value: 0 },
    { name: "Saskatchewan", value: 0 },
    { name: "Yukon", value: 0 },]

  const transport = [{ name: "Alberta", value: 0 },
    { name: "British Columbia", value: 0 },
    { name: "Manitoba", value: 0 },
    { name: "New Brunswick", value: 0 },
    { name: "Newfoundland and Labrador", value: 0 },
    { name: "Northwest Territories", value: 0 },
    { name: "Nova Scotia", value: 0 },
    { name: "Nunavut", value: 0 },
    { name: "Ontario", value: 0 },
    { name: "Prince Edward Island", value: 0 },
    { name: "Quebec", value: 0 },
    { name: "Saskatchewan", value: 0 },
    { name: "Yukon", value: 0 },]

    const all = await Pending.find()

    all.forEach(elem=>{
      if (elem.group == "commerce" && elem.status == 1){
         console.log('commerce>>>' , elem.companyAddress[0].province)
        if (province.includes(elem.companyAddress[0].province)){
           console.log('commerce>>>' , elem.companyAddress[0].province) 
          commerce.forEach(element=>{
            if (element.name == elem.companyAddress[0].province){
              element.value += 1
            }
          })
        }
      }
      if (elem.group == "lineMaker" && elem.status == 1){
        if (province.includes(elem.companyAddress[0].province)){
          linemaker.forEach(element=>{
            if (element.name == elem.companyAddress[0].province){
              element.value += 1
            }
          })
        }
      }
      if (elem.group == "transport" && elem.status == 1){
        if (province.includes(elem.companyAddress[0].province)){
          transport.forEach(element=>{
            if (element.name == elem.companyAddress[0].province){
              element.value += 1
            }
          })
        }
      }
      if (elem.group == "truck" && elem.status == 1){
        if (province.includes(elem.companyAddress[0].province)){
          truck.forEach(element=>{
            if (element.name == elem.companyAddress[0].province){
              element.value += 1
            }
          })
        }
      }
    })


    console.log('commerce' , commerce)
    console.log('truck' , truck)
    console.log('transport' , transport)
    console.log('linemaker' , linemaker)

    res.status(200).json({
      success : true,
      status:{
        message : 'get map data!!',
        data : {linemaker : linemaker , commerce : commerce , transport : transport , truck : truck}
      }
    })
})



exports.getAlldeleted = asyncHandler(async(req , res ,  next)=>{
  const id = req.params.id
  Pending.find({$and:[{status : 3} , {'businessMan._id' : id }]}).then((resault)=>{
    res.status(200).json({
      success : true,
      data : resault
    })
  }).catch((err)=>{
      res.status(404).json({
        success : false,
        error : `${err}`
      })
    })
})



