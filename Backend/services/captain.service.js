const captainModel = require('../models/captain.model');



module.exports.createCaptain = async ({first_name, last_name, email, password, color, plate, capacity, type}) => {
    if(!first_name || !last_name || !email || !password || !color || !plate || !capacity || !type) {
        throw new Error('All fields are required');
    }
    const captain = new captainModel.create({
        fullname: {
            firstname: first_name,
            lastname: last_name,    
    },
        email: email,
        password: password,
        Vehicle: {
            color: color,
            plate: plate,
            capacity: capacity,
            type: type,
        },
    });
    return captain;
}