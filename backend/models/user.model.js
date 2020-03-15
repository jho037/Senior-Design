const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    accessToken: { type: String, required: false },
    transactions: { type: Array, required: false },
    goal: { type: Number, required: false },
}, {
    timestamps: true,
});

const user = mongoose.model('user', userSchema);

module.exports = user;