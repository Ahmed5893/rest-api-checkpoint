const mongoose = require("mongoose");




function connectDB() {
    const options={useNewUrlParser: true,useUnifiedTopology:true,};
  mongoose
    .connect(process.env.MONGO_URL,options)
    .then(() => {
      console.log("the Database is connected...");
    })
    .catch((err) => {
      console.log(err);
    });
};



module.exports=connectDB;