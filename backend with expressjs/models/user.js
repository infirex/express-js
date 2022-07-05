const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: {
        type: String,
        require: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        minLength: [6, "please provide a password with min length 6"],
        required: [true, "Please provide a valid password"],
        select: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    place: {
        type: String
    },
    website: {
        type: String
    },
    profile_image: {
        type: String,
        default: "default.jpg"
    },
    blocked: {
        type: Boolean,
        default: false
    }
});


userSchema.methods.generateJwtFromUser = function(){
    const {JWT_SECRET_KEY, JWT_EXPIRE} = process.env

    const payload = {
        id: this._id,
        name: this.name
    }

    const token = jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn: JWT_EXPIRE,
    })

    return token

}

userSchema.pre('save', function (next) {
    if (!this.isModified("password")) next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    });
}
)


module.exports = mongoose.model("User", userSchema);