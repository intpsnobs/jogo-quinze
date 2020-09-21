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

userSchema.pre('save', () => {
    let user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = (password, cb) => {
    bcrypt.compare(password, this.password, (err, match) => {
        if (err) return cb(err);
        cb(null, match);
    });
}

const User = mongoose.model("User", userSchema) // creating the model from the schema

module.exports = User // exporting the model