const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoURI="" //link to your mongoDB database
    await mongoose.connect(mongoURI,{useNewUrlParser:true},(err,result)=>{
        if(err) console.group("er",err)
        else {
    console.log("connected");
        }
    });

module.exports=mongoDB;