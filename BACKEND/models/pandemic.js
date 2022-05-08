const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pandemicSchema = new Schema({

    pandemictype: {
        type : String,
        required : true
    },

    pandemicname : {
        type : String,
        required : true
    },
    area : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    metron : {
        type : String,
        required : true
    },
    sister : {
        type : String,
        required : true
   
    },
    nursingofficers: {
        type : String,
        required : true
    }
    

})
const Pandemic= mongoose.model("Pandemic",pandemicSchema);

module.exports = Pandemic;