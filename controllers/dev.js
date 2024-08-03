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