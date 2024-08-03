const fetch = require("node-fetch");

exports.createTruck = async (data) => {
  const url = `${process.env.SERVICE_TRUCK}/api/v1/truck/interservice/createtruck`;

  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await rawResponse.json();
    if (response.success) {
      return response.success;
    }
  } catch (err) {
    console.log("err", err);
  }
};

exports.createBussinessMan = async (data) => {
  // console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
  const url = `${process.env.SERVICE_ECOMMERCE}/api/v1/commerce/interservice/createbusinessman`;

  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>>>>>");
    const response = await rawResponse.json();
    // console.log(":::::::::::::::::::::::::::;");
    if (response.success) {
      console.log("nicceeeee");
      return response.success;
    }
  } catch (err) {
    console.log("err", err);
  }
};

exports.createTransport = async (data) => {
  // console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
  const url = `${process.env.SERVICE_TRANSPORT}/api/v1/transport/interservice/createtransport`;

  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>>>>>");
    const response = await rawResponse.json();
    // console.log(":::::::::::::::::::::::::::;");
    if (response.success) {
      return response.success;
    }
  } catch (err) {
    console.log("err", err);
  }
};

exports.createLineMaker = async (data) => {
  console.log("data>>>>>>>>>>>>>>>>>", data);

  // const url = `${process.env.SERVICE_LINEMAKER}/api/v1/linemaker/interservice/createlinemaker`;
   const url = `${process.env.SERVICE_LINEMAKER}/api/v1/linemaker/interservice/createlinemaker`;

  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response =rawResponse
    console.log(rawResponse);
    console.log(">>>>,response", response);
    if (response.success) {
      return response;
    } else {
      return response;
    }
  } catch (err) {
    console.log("err", err);
  }
};

exports.addGroup = async (id, body) => {
  const url = `${process.env.SERVICE_AUTHENTICATION}/api/v1/auth/addgroup/${id}`;
  console.log("hiiiiii");

  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const response = await rawResponse.json();
    if (response.success) {
      console.log("its work");
      return response.success;
    }
  } catch (err) {
    console.log("err", err);
  }
};

exports.pushNotification = async (
  notificationType,
  title,
  message,
  recipient,
  sender,
  navigate,
  relationModel
) => {
  const url = `${process.env.SERVICE_NOTIFICATION}/api/v1/notification/pushnotification/createpushnotif`;
  //  const url = `http://localhost:8006/api/v1/notification/pushnotification/createpushnotif`;


  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notificationType,
        title,
        message,
        recipient,
        sender,
        navigate,
        relationModel
      }),
    });
    const response = await rawResponse.json();

    if (response.success) {
      // console.log("success");
    }
  } catch (error) {
    console.log("error", error);
  }
};

exports.getAutoApprove = async () => {
  // console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
  
  const url = `${process.env.SERVICE_SETTING}/api/v1/setting/autoapprove/getapprove`;

  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>>>>>");
    const response = await rawResponse()
    // console.log(":::::::::::::::::::::::::::;");
    if (response.success) {
      console.log(response);
      return response.autoApprove;
    }
  } catch (err) {
    
    console.log("err", err);
  }
};
exports.getAutoApproveVip = async () => {
  // console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
  const url = `${process.env.SERVICE_SETTING}/api/v1/setting/autoapprove/getapproveVip`;

  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>>>>>");
    const response = await rawResponse.json();
    // console.log(":::::::::::::::::::::::::::;");
    if (response.success) {
      return response.autoApproveVip;
    }
  } catch (err) {
    console.log("err", err);
  }
};
exports.setCommereVip = async (id) => {
  const url = `${process.env.SERVICE_ECOMMERCE}/api/v1/commerce/interservice/setvip/${id}`;
  console.log(id);
  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>>>>>");
    const response = await rawResponse.json();
    // console.log(":::::::::::::::::::::::::::;");
    if (response.success) {
      console.log(response);
      return response
    }
  } catch (err) {
    console.log("err", err);
  }
};
exports.setCommereVipAuth = async (id) => {
  const url = `${process.env.SERVICE_AUTHENTICATION}/api/v1/auth/interservice/setvip/${id}`;
  console.log(id);
  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>>>>>");
    const response = await rawResponse.json();
    // console.log(":::::::::::::::::::::::::::;");
    if (response.success) {
      console.log(response);
      
      return response
    }
  } catch (err) {
    console.log("err", err);
  }
};
exports.unSetCommereVip = async (id) => {
  const url = `${process.env.SERVICE_ECOMMERCE}/api/v1/commerce/interservice/unsetvip/${id}`;

  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>>>>>");
    const response = await rawResponse.json();
    // console.log(":::::::::::::::::::::::::::;");
    if (response.success) {
      return response
    }
  } catch (err) {
    console.log("err", err);
  }
};
exports.unSetCommereVipAuth = async (id) => {
  const url = `${process.env.SERVICE_AUTHENTICATION}/api/v1/auth/interservice/unsetvip/${id}`;

  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>>>>>");
    const response = await rawResponse.json();
    // console.log(":::::::::::::::::::::::::::;");
    if (response.success) {
      return response
    }
  } catch (err) {
    console.log("err", err);
  }
};

exports.findBuss = async (id) => {
  const url = `${process.env.SERVICE_ECOMMERCE}/api/v1/commerce/interservice/findbuss/${id}`;

  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
      },
    });
    const response = await rawResponse.json();
    if (response.success) {
      return response.commerce;
    }
  } catch (err) {
    console.log("err", err);
  }
};
exports.findBussByQR = async (id) => {
  const url = `${process.env.SERVICE_ECOMMERCE}/api/v1/commerce/interservice/findbusswithqr/${id}`;

  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
      },
    });
    const response = await rawResponse.json();
    if (response.success) {
      return response.commerce;
    }
  } catch (err) {
    console.log("err", err);
  }
};
exports.updatePending = async (id) => {
  const url = `${process.env.SERVICE_REFRESH}/api/v1/refresh/callapprove`;
  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ provider: id }),
    });
    const response = await rawResponse.json();
  } catch (error) {
    console.log("error", error);
  }
};

exports.notification = async (
  notificationType,
  recipient,
  sender,
  relation,
  relationModel,
  title,
  message
) => {
  const url = `${process.env.SERVICE_NOTIFICATION}/api/v1/notification/create`;
  //  const url = `http://localhost:8006/api/v1/notification/create`;


  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notificationType,
        recipient,
        sender,
        relation,
        relationModel,
        title,
        message,
      }),
    });
    const response = await rawResponse.json();

    if (response.success) {
      // console.log("success");
    }
  } catch (error) {
    console.log("error", error);
  }
};
exports.getAllVarible = async () => {
  const url = `${process.env.SERVICE_SETTING}/api/v1/setting/variable/all`;
  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    const response = await rawResponse.json();
       return response.data
  } catch (error) {
    console.log("error", error);
  }
};