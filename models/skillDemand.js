const mongoose = require("mongoose");

const skillDemandSchema = new mongoose.Schema({
    district : {
        type : String,
        required : true,
    },
    sector : {
        type : String,
        required : true,
    },
    course : {
        type : String, 
        required : true,
    },
    industryDemand : {
        type : mongoose.Schema.Types.Mixed,
        required: true
    },
    currentCurriculum: [{
        type: String
    }]
});

module.exports = mongoose.model("skilldemand", skillDemandSchema);