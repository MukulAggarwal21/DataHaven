const express = require('express');
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');


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

    //Check whether the user with this email exist already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        })
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }

})
module.exports = router
