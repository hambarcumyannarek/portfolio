const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const pool = require('../collaboration/DB.js');

async function createJWTAndAddDB(req, res, next) {
    const userInfo = req.userInfo;
    const hashPassword = await bcrypt.hash(userInfo.password, 10);
    await pool.query('insert into users(name, email, password) values(?, ?, ?)', [userInfo.name, userInfo.email, hashPassword]);
    const jwtObj = {
        name: userInfo.name,
        email: userInfo.email,
        password: hashPassword
    }
    const sign = JWT.sign(jwtObj, process.env.JWT_SECRET);
    res.cookie('JWT_SIGN', sign);
    res.redirect('/')
}

module.exports = createJWTAndAddDB;