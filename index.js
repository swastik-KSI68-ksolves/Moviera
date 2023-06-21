// All imports
const http = require("http");
const getHandler = require("./methods/get-handler.js");
const postHandler = require("./methods/post-handler.js");
const putHandler = require("./methods/put-handler.js");
const deleteHandler = require("./methods/delete-handler.js");
const patchHandler = require("./methods/patch-handler.js");

// All configs
require("dotenv").config();

// All constants
const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;

const server = http.createServer((req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      getHandler(req, res);
      break;
    case "POST":
      postHandler(req, res);
      break;
    case "PUT":
      putHandler(req, res);
      break;
    case "DELETE":
      deleteHandler(req, res);
      break;
    case "PATCH":
      patchHandler(req, res);
      break;
    default:
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({
          status: 405,
          error: "Method Not Allowed",
        })
      );
      res.end();
      break;
  }
});

server
  .listen(PORT, () => {
    console.log(`Server running at ${HOST}:${PORT}/`);
  })
  .on("error", (err) => {
    console.log("err", err);
  });
