const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    moduleName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    submittedDate: {
        type: Date,
        required: true
    },
    submittionStatus: {
        type: String,
        required: false
    },
    
    file: {
        type: String,
        required: true
    }
});

const Item = mongoose.model("files", itemSchema);

module.exports = Item;