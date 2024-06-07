// const mongoose = require("mongoose");

// exports.connect = () => {
//     mongoose
//         .connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })
//         .then(() => {
//             console.log("Connected to MongoDB");
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

const mongoose = require("mongoose");

const connectDB = () => {
    const url = '';

    // returns promise
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;
