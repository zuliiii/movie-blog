const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");


const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://zuli:3423010zuli@cluster0.bheuw8q.mongodb.net/test",
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
