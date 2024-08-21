// const express=require("express");
// const errorHandler = require("../middleware/errorHnadler");
// const dotenv=require("dotenv").config();
// const mongoose = require("mongoose");
// mongoose.connect("mongodb+srv://marumudihadassa:Admin@123@pagecluster.qcvx9.mongodb.net/?retryWrites=true&w=majority&appName=pagecluster");
// const app=express();
// const port=8001;
// app.use(express.json());
// app.use("/api/contacts",require("./routes/contactroutes"));
// app.use(errorHandler);
// app.listen(port,()=>{
//     console.log(`server running in ${port}`);                                   
// });


const express = require("express");
const errorHandler = require("./middleware/errorHnadler");
const dotenv = require("dotenv").config();


const app = express();
const port = 8001;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactroutes"));
app.use("/api/users", require("./routes/userroutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
