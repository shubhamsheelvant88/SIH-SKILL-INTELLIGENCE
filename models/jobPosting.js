const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema({
    company : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    extractedSkills : [{
        type : String,
    }],
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const JobPosting = mongoose.model("jobposting", jobPostingSchema);

module.exports = JobPosting;