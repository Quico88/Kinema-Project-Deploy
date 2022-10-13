const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10



const UserSchema = new mongoose.Schema({

    password:{type: String, required: true},
    email:{ type: String, unique: true, lowercase: true, required: true},
    subscription: {type: Number},
    avatar: {type: String},
    subscriptionDate: { type: Date, default: Date.now()},
    admin: {type: Boolean, default: false},
    active: {type: Boolean, default: true},
    watchlist: {type: Array},
    comments: {type: Array },
    name: {type: String},
    rented: {type: Array},

})

//funcion para hashear el pass antes de guardarlo
UserSchema.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
            if(err){
                next(err);
            } else {
                document.password = hashedPassword;
                next()
            }
        });
    } else {
        next();
    }
});

UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same){
        if(err){
            callback(err);
        } else {
            callback(err, same);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);