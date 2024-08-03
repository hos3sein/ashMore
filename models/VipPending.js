const mongoose = require("mongoose");
const ShortUniqueId = require("short-unique-id");

const VipPendingSchema = new mongoose.Schema(
  {
    user: {
      _id: { type: mongoose.Schema.ObjectId },
      username: { type: String },
      pictureProfile: { type: String },
      phone: { type: String },
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

    
    profileCompany: {
      type: String,
    },

    

    paymentInvoiceNumber:{type:String},

    // 0 == pennding
    // 1 == approve
    // 2 == reject
    status: {
      type: Number,
    },
    // 0 == normal
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

VipPendingSchema.pre("save", async function (next) {
  const uid = await new ShortUniqueId({ length: 8 });

  this.invoiceNumber = await uid();
});
module.exports = mongoose.model("VipPending", VipPendingSchema);

