const mongoose = require("mongoose");

const placementOutcomeSchema = new mongoose.Schema({
    district : {
        type : String, 
        required : true,
    },
    course : {
        type : String,
        required : true,
    },
    studentsTrained : {
        type : Number,
        required : true,
    },
    studentsCompleted : {
        type : Number,
        required : true,
    },
    studentsPlaced :  {
        type : Number,
        required : true,
    },
    averageSalary : {
        type : Number,
    },
    skillsUsed: [{
        type: String
    }],
    employerSatisfaction : {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("placementoutcome", placementOutcomeSchema);
