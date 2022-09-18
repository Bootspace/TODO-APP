const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const UserSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true
        },

        lastname: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        token: {
            type: String,
            createdAt: {
                type: Date,
                default: Date.now,
                index: { expires: '7d' }
            }
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model('User', UserSchema);