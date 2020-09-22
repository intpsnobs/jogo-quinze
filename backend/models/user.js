const mongoose = require("mongoose") // requiring the mongoose package
const bcrypt = require("bcrypt")
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    // creating a schema for User
    username: { 
        type: String, 
        required: true, 
        trim: true, 
        index: { unique: true }
    },
    name: { 
        type: String, 
        unique: true, 
        trim: true
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    }
})

userSchema.pre('save', function(next) {
    let user = this;
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        console.log(user);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.statics.authenticate = function(data, cb) {
    User.findOne({username: data.username}).exec((err, user) => {
        if (err) return cb(err);
        if (user == null) return cb(new Error('User Not Found'));
        bcrypt.compare(data.password, user.password, (err, match) => {
            if (err) return cb(err);
            return cb(null, match);
        });
    });

}

const User = mongoose.model("User", userSchema) // creating the model from the schema

module.exports = User // exporting the model