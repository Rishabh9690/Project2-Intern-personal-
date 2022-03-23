const timespan = require("jsonwebtoken/lib/timespan");
const mongoose = require("mongoose");

const collegeschema =  new mongoose.Schema({
    name :{
        type: String,
        unique: true,
        required: [true, "College Name is required"]
    },
    fullName:{
        type: String,
        required:  [true, "College fullName is needed"]
    },
    logoLink:{
        type: String,
        required: [true,"Link is required"]
    },
    isDeleted :{
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model("R-college", collegeschema);
