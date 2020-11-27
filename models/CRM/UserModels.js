const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    "user_name": String,
    "user_pwd": String,
    "user_role": String,
    "token": String
}, {
    versionKey: false
});

UserSchema.methods.generateAuthToken = function () {
    const token = 'Bearer ' + jwt.sign({
            _id: data._id,
            role: data.user_role
        },
        'CrMsEcReT', {
            expiresIn: 60
        }
    )
    return token;
}

const UserModels = mongoose.model('user', UserSchema)

module.exports = UserModels