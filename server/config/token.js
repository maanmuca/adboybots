const jwt = require('jsonwebtoken');
const config = require('./keys');

function generateAccessToken(userId) {
    const expiresIn = config.EXPIRES_IN_JWT;
    const audience = config.AUDIENCE_JWT;
    const issuer = config.ISSUER_JWT;
    const secret = config.SECRET_JWT;
    const token = jwt.sign({}, secret, {
        expiresIn: expiresIn,
        audience: audience,
        issuer: issuer,
        subject: userId.toString()
    });

    return token;
}

module.exports = {
    generateAccessToken: generateAccessToken
}