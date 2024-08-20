const mongoose = require('mongoose');
const mongoURI="mongodb+srv://sanjay21:findit123@findit.9cwqq.mongodb.net/?retryWrites=true&w=majority&appName=findit" //link to your mongoDB database
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;