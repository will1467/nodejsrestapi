const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../auth');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function(app){
    
    app.post('/register', (req, res) => {
        const {email, password} = req.body;
        const user = new User({
            email,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                user.password = hash;
                
                try{
                    const newUser = await user.save();
                    res.sendStatus(201);
                } catch(err){
                    console.log(err);
                }
                
            })
        })

    })

    app.post('/auth', async (req, res) => {
        const { email, password } =  req.body;
        try {
            const user = await auth.authenticate(email, password);
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
                expiresIn : '30m'
            });

            const { iat, exp} = jwt.decode(token);
            //Respond with token
            res.send({iat, exp, token});

        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    })
}