const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//register user
router.post('/register', async (req, res) => {
    //validate user
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const emailexists = await User.findOne({ email: req.body.email });
    if (emailexists) {
        return res.status(404).send(req.body.email + ' already exists');
    }
    // protect password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    //create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        date: req.body.date,
    });

    try {
        const saveUser = await user.save();
        res.status(200).send(user.email + ' created successfully.');
    }
    catch (err) {
        res.send(400).send(err);
    }
})

//login user
router.post('/login', async (req, res) => {
    //validate user
    const { error } = loginValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send('Email & Password does not match!');
    }

    //check password
    const validpass = await bcrypt.compare(req.body.password , user.password);
    if(!validpass){
        return res.status(404).send('Email & Password does not match!');
    }
    
    const token  = jwt.sign({id : user._id}, process.env.SECRET_KEY);
    res.header('auth-token', token);
    return res.status(200).send('Login Successful');

});

module.exports = router;