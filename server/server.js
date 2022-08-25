const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToMongoDB = require("./config/database");

dotenv.config();

const app = express();

//CONNECT TO DATABASE
connectToMongoDB();

app.use(cors());
app.use(express.json());

//ROUTES
app.use("/api", require("./routes/postRouter"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT:${PORT}`);
});
