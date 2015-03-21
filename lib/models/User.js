var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: {type: String, required: true, index:{unique: true}},
    full_name: {type: String, required: true},
    email: {type: String, required: true, index:{unique: true}},
    password: {type: String, required: true}
});

UserSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(potentialPassword, cBack) {
    bcrypt.compare(potentialPassword, this.password, function(err, isMatch) {
        if (err) return cBack(err);
        cBack(null, isMatch);
    });
};

UserSchema.statics.humanMessages = function(err) {
    var existErrors = {'username': 'Username already exists', 'email': "Email already exists"};
    var validErrors = {username: 'Username required', email: 'Email required',
        full_name: 'Full name required', password: 'Password required'}
    var errorList = [];
    if(!!err.code && err.code === 11000) {
        for(key in existErrors) {
            new RegExp(key).test(err.err) ?  errorList.push(existErrors[key]) : null;
        }
    }
    if(!!err.message && err.message == "Validation failed") {
        for(key in validErrors) {
            if(key in err.errors) {
                errorList.push(validErrors[key]);
            }
        }
    }
    return errorList;
};


module.exports = mongoose.model('User', UserSchema);
