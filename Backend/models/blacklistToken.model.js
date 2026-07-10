const mongoose = require('mongoose');
const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // Token will be removed from the blacklist after 24 hours
    }
});

mongoose.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);