const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connection = (url) => {
    return mongoose.connect(url, {}, 
        console.log("Connected to the mongodb console!"));

};

module.exports = connection;