const mongoose = require("mongoose");

const internschema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ]
    },
    mobile:{
        type: Number,
        required: [true,"Mobile number is required.!"],
        unique: [true,"The mobile number is already been used..!!"],
        match:[/^[6-9]\d{9}$/,"Please fill a valid mopbile"]
        // min:10,
        // max:11
    },
    collegeId:{
        type: String,
        ref: "R-college"
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},{timestamps: true});

module.exports = mongoose.model("R-intern", internschema);