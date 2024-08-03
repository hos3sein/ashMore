const mongoose = require("mongoose");
const ShortUniqueId = require("short-unique-id");

const PendingSchema = new mongoose.Schema(
  {
    user: {
      _id: { type: mongoose.Schema.ObjectId },
      username: { type: String },
      pictureProfile: { type: String },
      phone: { type: String },
    },

    group: {
      type: String,
    },

    educationalLicense: {
      type: String,
    },
    // ! ta inja

    // ID USERI
    businessMan: {
      _id: { type: mongoose.Schema.ObjectId },
      pendingId: { type: mongoose.Schema.ObjectId },
      group: { type: String },
      companyName: { type: String },
      profileCompany: { type: String },
    },

    companyName: {
      type: String,
    },

    companyLicensePhoto: {
      type: String,
    },

    companyAddress: [
      {
        address: { type: String },
        nameAddress: { type: String },
        latitude: { type: Number },
        longitude: { type: Number },
        target: { type: Number },
        city: { type: String },
        province: { type: String },
        district: { type: String },
        street: { type: String },
        country: { type: String },
        streetNumber: { type: String },
        _id: false,
      },
    ],

    idCardName: {
      type: String,
    },

    idCard: {
      type: String,
    },

    idCardPhoto: {
      type: String,
    },

    idCardBack: {
      type: String,
    },

    truckType: {
      type: Number,
    },

    truckPlate: {
      type: String,
    },

    truckPlatePhoto: {
      type: String,
    },

    transportCapacity: {
      type: Number,
      max: 32,
    },

    transportQuntity: {
      type: Number,
      max: 32,
    },

    licenseFront: {
      type: String,
    },

    licenseBack: {
      type: String,
    },

    qualificationFront: {
      type: String,
    },

    qualificationBack: {
      type: String,
    },

    driverCertificateFront: {
      type: String,
    },

    driverCertificateBack: {
      type: String,
    },

    roadTransportLicense: {
      type: String,
    },

    roadTransportLicenseFront: {
      type: String,
    },

    registrationData: {
      day: { type: String },
      month: { type: String },
      year: { type: String },
    },

    bankNumber: { type: Number },
    bankPhone: { type: String },
    bankHomeAddress: {
      type: String,
    },

    profileCompany: {
      type: String,
    },

    deposit: {
      type: Boolean,
      default: false,
    },

    depositAmount: {
      type: Number,
    },

    deals: [
      {
        val: { type: Number },
        selected:{type:Boolean}
      },
    ],

    // 0 == pennding
    // 1 == approve
    // 2 == reject
    status: {
      type: Number,
    },

    // 0 == mamoli
    // 1 == vip
    typeUser: {
      type: Number,
      default: 0,
    },

    invoiceNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

PendingSchema.pre("save", async function (next) {
  const uid = await new ShortUniqueId({ length: 8 });

  this.invoiceNumber = await uid();
});
module.exports = mongoose.model("Pending", PendingSchema);
// xxxxxxxxxxxxxxxxxxxxxxxx
