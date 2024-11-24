const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rootRouter = require("./src/routes");
const { response } = require("./src/helpers/standardRes");

require("dotenv").config();
const { PORT, APP_UPLOAD_PATH } = process.env;

const app = express();
const server = require("http").createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  `/${APP_UPLOAD_PATH}`,
  express.static(__dirname + `/${APP_UPLOAD_PATH}`)
);
app.use(cors());

app.get("/", (req, res) => {
  return response(res, 200, true, "Backend Running Well!");
});

server.listen(PORT || 8000, () => {
  console.log(`Backend running on port ${PORT || 8000}`);
});

app.use("/", rootRouter);
