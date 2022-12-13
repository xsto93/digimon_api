require('dotenv').config();
require('./src/mongo');

const express = require("express");
const cors = require('cors')
const swaggerUi = require("swagger-ui-express");
const app = express();
const Router = require("./src/routes")

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


const swaggerDocument = require("./src/swagger.json");
app.use(
  '/swagger',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.use(Router);

const PORT = process.env.PORT || 3100


app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

// Export the Express API
module.exports = app;