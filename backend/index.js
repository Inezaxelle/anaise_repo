const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { specs, swaggerUi } = require("./swagger"); 

dotenv.config();

const port = process.env.PORT;
const app = express();

const route = require("./Routes/routes");

app.use(express.json());
app.use(cors());
app.use("/api", route);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, (err) => {
  if (err) {
    console.log("Error occured");
    process.exit(1);
  }
  console.log(`Listening on port ${port}`);
});