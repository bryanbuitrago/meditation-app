import { Schema, model, models } from 'mongoose'
import mongooseUniqueValidator from "mongoose-unique-validator";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
}, { timestamps: true })

UserSchema.plugin(mongooseUniqueValidator)

const User = models.User || model('User', UserSchema)

export default User
