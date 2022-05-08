const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaveSchema = new Schema({

    NurseID: {
        type : String,
        required : true
    },

    LeaveType : {
        type : String,
        required : true
    },
    Reason : {
        type : String,
        required : true
    },
    Description : {
        type : String,
        required : true
    },
    Date : {
        type : String,
        required : true
    },
    Time : {
        type : String,
        required : true
   
    },
})
const Leave = mongoose.model("Leave",leaveSchema);

module.exports = Leave;