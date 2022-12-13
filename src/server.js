require('dotenv').config();
require('./mongo');

const express = require("express");
const cors = require('cors')
const swaggerUi = require("swagger-ui-express");
const Router = require("./routes")

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


const swaggerDocument = require("./swagger.json");
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