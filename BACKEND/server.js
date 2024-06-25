// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// const PORT = process.env.PORT || 8070;

// app.use(cors());
// app.use(bodyParser.json());

// const URL = process.env.MONGODB_URL;

// mongoose
//   .connect(URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Mongodb Connection Success!");
//   })
//   .catch((error) => {
//     console.error("Mongodb Connection Error:", error);
//   });

// const studentRouter = require("./routes/students.js");
// const userRouter = require("./routes/users.js");


// //  http://Localhost:8070/student
// app.use("/student", studentRouter);
// //  http://Localhost:8070/user
// app.use("/user", userRouter);

// const connection = mongoose.connection;

// connection.once("open", () => {
//   console.log("Mongodb database connection established successfully");
// });

// app.listen(PORT, () => {
//   console.log(`Server is up and running on Port ${PORT}`);
// });



const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser")

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8070;


app.use(cookieParser())

// Middleware
app.use(cors(
  {
    origin:["http://localhost:3000"],
    credentials:true
  }
));

app.use(bodyParser.json());

// MongoDB Connection
const URL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connection Success!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// Routes
const studentRouter = require("./routes/students.js");
const userRouter = require("./routes/users.js");

// Route Middleware
// http://localhost:8070/student
app.use("/student", studentRouter);
// http://localhost:8070/user
app.use("/user", userRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on Port ${PORT}`);
});