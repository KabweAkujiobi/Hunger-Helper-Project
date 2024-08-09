const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateToken } = require('../config/jwt');

exports.register = (req, res) => {
    const { beneficiaryType, organisationType, organisationName, firstName, lastName, donationRole, contactNumber, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);


    const newUser = {
        beneficiaryType,
        organisationType,
        organisationName,
        firstName,
        lastName,
        donationRole,
        contactNumber,
        email,
        password: hashedPassword
    };

    console.log('New User:', newUser);

    User.create(newUser, (err, result) => {
        //f(err) return res.status(500).send(err);
        if (err) {
            console.error('Error inserting user:', err); // Log any errors
            return res.status(500).json({err});
          }
        const token = generateToken({ id: result.insertId, email });
        res.status(201).json({ message: 'User logged in successfully.' ,token });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, users) => {
        if (err) return res.status(500).json({err});
        if (users.length === 0) return res.status(400).json({message: 'User not found'});

        const user = users[0];
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if(!passwordMatch) return res.status(400).json({message: 'Invaild password'});
        const token = generateToken({ id: user.id, email: user.email });
        res.status(200).json({ message: 'Logged in successfully', token });
    });
};