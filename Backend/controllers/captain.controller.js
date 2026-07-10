const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, password, color, plate, capacity, type } = req.body;
    const hashedPassword = await captainModel.hashedPassword(password);
    const isCaptainAlreadyExists = await captainModel.findOne({ email });
    if (isCaptainAlreadyExists) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }
    const captain = await captainService.createCaptain({ 
        first_name:fullname.firstname,
        last_name:fullname.lastname,
        email,
        password: hashedPassword,
        color: Vehicle.color,
        plate: Vehicle.plate,
        capacity: Vehicle.capacity,
        type: Vehicle.type
    });

    const token = captain.generateAuthToken();
    res.status(201).json({token,captain});
};