const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({

    empid: {
        type : String,
        required : true
    },

    empname : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    logtype : {
        type : String,
        required : true
    },

    time: {
        type : String,
        required : true
    },

})
const Attendance = mongoose.model("Attendance",attendanceSchema);

module.exports = Attendance;