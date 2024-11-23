const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
const { PORT } = process.env;

const app = express();
const server = require("http").createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  const data = {
    success: true,
    message: "Backend Running Well!",
  };
  return req.json(data);
});

server.listen(PORT || 8000, () => {
  console.log(`Backend running on port ${PORT || 8000}`);
});

const contactRoute = require("./src/routes/contact");
app.use("/contact", contactRoute);
