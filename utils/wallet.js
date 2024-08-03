const fetch = require("node-fetch");

exports.walletUpdater = async (type,userId,amount,descreption,appSection) => {
  const url=`https://ashmorepayment.chinabizsetup.com/api/v1/payment/wallet/update`
  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          type,
          userId,
          amount,
          descreption,
          appSection
      }),
    });
    const response = await rawResponse.json();
    if (response.success) {
      return response;
    }
  } catch (err) {
    console.log("err", err);
  }
};
exports.walletUpdaterApp = async (type,userId,amount,descreption,appSection) => {
  const url = `https://ashmorepayment.chinabizsetup.com/api/v1/payment/wallet/updateappwallet`;
  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          type,
          userId,
          amount,
          descreption,
          appSection
      }),
    });
    const response = await rawResponse.json();
    if (response.success) {
      return response;
    }
  } catch (err) {
    console.log("err", err);
  }
};