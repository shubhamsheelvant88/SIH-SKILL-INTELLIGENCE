const mongoose = require("mongoose");

const employerFeedbackSchema  = new mongoose.Schema({
    company : {
        type : String,
    },
    role : {
        type : String,
    },
    skills : [{
        skill : String,
        proficiency : String,
    }],
    feeedback : {
        type : String,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const EmployerFeedback = mongoose.model("employerfeedback", employerFeedbackSchema);

module.exports = EmployerFeedback;