const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User');
const config = require('./config');
const jwt = require('jsonwebtoken');

exports.authenticate = (email, password) => {
    return new Promise(async(fnResolve, fnReject) => {
        try{
            const user = await User.findOne({email: email});
            //Match Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    fnResolve(user);
                } else {
                    fnReject("Authentication Failed");
                }
            })
        } catch(err){
            fnReject("Authentication Failed");
        }
    })
}

exports.verifyToken = (token) => {
    return new Promise((fnResolve, fnReject) => {
        token = token.split(" ")[1];
        console.log(token);
        jwt.verify(token, config.JWT_SECRET, {algorithms : ["HS256", "HS384"]}, function(err, decoded){
            if(err){
                fnReject(err);
            } else {
                fnResolve(token);
            }
        })
    })
}