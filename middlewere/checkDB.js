const pool = require('../collaboration/DB.js'); // DB Set

async function checkDB(req, res, next) {
    const [findUser] = await pool.query('select * from users where email = ?', [req.body.email])
    if(findUser.length !== 0) {
        return res.status(404).send('email allready used')
    }
    next();
}

module.exports = checkDB;