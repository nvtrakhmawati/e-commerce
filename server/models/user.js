const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let validEmail = function (email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

let uniqueEmail = function (email) {
    return User.findOne({ email: email })
        .then(user => {
            if (user) return false
            else return true
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please fill in your name"]
    },
    email: {
        type: String,
        required: [true, "Please in your email address"],
        validate: [
            { validator: validEmail, msg: 'Please use a valid email address' },
            { validator: uniqueEmail, msg: "Email address is already taken" }
        ]
    },
    password: {
        type: String,
        required: [true, "Please fill in your password"]
    },
    role: {
        type: String,
        default: "customer"
    },
    carts: [{type : Schema.Types.ObjectId, ref : 'Product' }]
})

let User = new mongoose.model('User', userSchema)

module.exports = User

