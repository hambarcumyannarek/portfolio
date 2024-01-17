const JWT = require('jsonwebtoken');

async function Auto(req, res, next) {
    const getCookie = req.cookies.JWT_SIGN;
    if (!getCookie) {
        return res.redirect('/registration/signin');
    }

    const user = JWT.verify(getCookie, process.env.JWT_SECRET);
    req.user = user;
    res.cookie('mode', user.mode)
    next();
}

module.exports = Auto;