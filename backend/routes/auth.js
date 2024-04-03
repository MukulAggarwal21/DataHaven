const express = require('express');
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Harryisagood$boy';

//Create a User Using : POST "/api/auth/CreateUser". Doesn't require Auth  //No Login Required
router.post('/CreateUser', [
    body('name', ' Enter a valid Name').isLength({ min: 3 }),
    body('email', ' Enter a valid Email').isEmail(),
    body('password', ' Enter a valid Password').isLength({ min: 5 }),
], async (req, res) => {
    //If there are error , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        //Check whether the user with this email exist already

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        //create a user 
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // res.json(user)
        res.json({ authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server ERROR");
    }

})


//Authenticate a User Using : POST "/api/auth/Login".  //No Login Required
router.post('/login', [
    body('email', ' Enter a valid Email').isEmail(),
    body('password', ' Password can not be blankn').exists(),

], async (req, res) => {
    //If there are error , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }


        const passwordCompare = await  bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        //payload me data transfer if password compare
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server ERROR");
    }

})
module.exports = router
