const mongoose = require('mongoose');
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');

const UserSchema = new Schema({
    username: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, required: true},
    subjet: {type: String, required: true},
    degree: {type: String, required: true}
});

UserSchema.methods.toJSON = function() {
    let user = this.toObject();
    delete user.password;
    return user;
}

UserSchema.methods.comparePassword = function(password) {
    return compareSync(password, this.password) ;
}

UserSchema.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')) {
        return next();
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt); 
    user.password = hashedPassword;
    next();
});

module.exports = mongoose.model('user', UserSchema);