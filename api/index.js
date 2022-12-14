require("dotenv").config();
require("./mongo");

const express = require("express");
const path = require("path");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const app = express();
const router = require("./routes");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(express.static(path.join(__dirname, "public")));

const swaggerDocument = require("./swagger.json");
app.use(
  "/swagger",
  express.static("node_modules/swagger-ui-dist/", { index: false }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use("/", router);

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

// Export the Express API
module.exports = app;
