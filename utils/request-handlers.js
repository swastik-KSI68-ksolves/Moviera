const sendSuccess = (res, status, message, data) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.write(
    JSON.stringify({
      status: status,
      message: message,
      data,
    })
  );
  res.end();
};

const sendError = (res, status, errorMessage) => {
  res.statusCode = status || 500;
  res.setHeader("Content-Type", "application/json");
  res.write(
    JSON.stringify({
      status: status,
      message: errorMessage || "Internal Server Error",
    })
  );
  res.end();
};

const getDataFromRequest = (req) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk.toString();
  });
  req.on("end", () => {
    return console.log(JSON.parse(data));
  });
  return JSON.parse(data);
};

module.exports = { sendSuccess, sendError, getDataFromRequest };
