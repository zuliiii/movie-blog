
const express = require("express");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false)

const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json

const cors = require("cors");
app.use(cors({origin: true, credentials: true}));
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://zuli:3423010zuli@cluster0.bheuw8q.mongodb.net/movie-blo",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log("NOT STARTED!!!!!!!!!" + err.message);
  });

app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("server started on port 5000");
});
