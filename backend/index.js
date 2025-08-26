const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const app = express();

const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(express.json());

const imageRoute = require("./routes/imageRoutes");

app.use("/api", imageRoute);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
