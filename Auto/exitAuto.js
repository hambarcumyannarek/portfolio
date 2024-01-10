async function exitAuto(req, res, next) {
    const getCookie = req.cookies.JWT_SIGN;
    if(getCookie) {
        return res.redirect('/');
    }

    next();
}

module.exports = exitAuto;