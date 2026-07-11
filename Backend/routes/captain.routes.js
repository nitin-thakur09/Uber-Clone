const express = require('express');
const router = express.Router();
const {body}= require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('Vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('Vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('Vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('Vehicle.type').isIn(['car', 'motorcycle', 'auto']).withMessage('Type must be either car, motorcycle, or auto'),
], 
    captainController.registerCaptain
);   


router.post('/login',[
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], 
    captainController.loginCaptain
);

router.get('/profile', authMiddleware.authcaptain,  captainController.getCaptainProfile);

router.post('/logout', authMiddleware.authcaptain, captainController.logoutCaptain);

module.exports = router;