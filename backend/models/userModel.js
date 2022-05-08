const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },

    phonenumber: {
        type: String,
        required: [true, "Please enter your phoneNumber!"]
    },

    dateofbirth: {
        type: String,
        required: [true, "Please enter your dateOfBirth!"]
    },
     
    role: {
        type: Number,
        default: 0 // 0 = user, 1 = admin
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dts2t3jeh/image/upload/v1631939777/avatar/avatar_jihsxm.jpg"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)