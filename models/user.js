const mongoose = require("mongoose") // requiring the mongoose package
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    // creating a schema for User
    username: { 
        type: String, 
        required: true, 
        trim: true, 
        index: { unique: true },
        unique: true
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
    },
    token: {
        type: String
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

userSchema.methods.generateAccessToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), process.env.ACCESS_TOKEN);
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};

userSchema.statics.authenticate = function(data, cb) {
    User.findOne({username: data.username}).exec((err, user) => {
        if (err) return cb(err);
        if (user == null) return cb(new Error('User Not Found'));
        bcrypt.compare(data.password, user.password, (err, match) => {
            if (err) return cb(err);
            return cb(null, user);
        });
    });

}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decode) {
        user.findOne({"_id":decode, "token":token}, function(err,user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model("User", userSchema) // creating the model from the schema

module.exports = User // exporting the model