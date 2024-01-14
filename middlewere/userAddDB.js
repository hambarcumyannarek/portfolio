const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const pool = require('../collaboration/DB.js');

async function createJWTAndAddDB(req, res, next) {
    const userInfo = req.userInfo;
    const hashPassword = await bcrypt.hash(userInfo.password, 10);
    await pool.query('insert into users(name, email, password) values(?, ?, ?)', [userInfo.name, userInfo.email, hashPassword]);
    const [getUserDB] = await pool.query('select * from users where email = ?', [userInfo.email])
    getUserDB[0].password = null;
    const sign = JWT.sign(getUserDB[0], process.env.JWT_SECRET);
    res.cookie('JWT_SIGN', sign);
    res.redirect('/')
}

module.exports = createJWTAndAddDB;