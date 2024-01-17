const router = require('express').Router();
const bcrypt = require('bcrypt');

// import collboration files 
const validation = require('../middlewere/validation.js'); // form date validation "Joi"
const transporter = require('../collaboration/mailer'); // mail set
const pool = require('../collaboration/DB.js'); // DB Set
const createJWTAndAddDB = require('../middlewere/userAddDB.js'); // create JWT and User's info push DB
const checkDB = require('../middlewere/checkDB.js'); // find user with email
const JWT = require('jsonwebtoken');

router.get('/signup', (req, res) => {
    res.render('signup.ejs', { page: 'signup' })
})

let OTPnum;
async function mailer(req, res, next) {
    OTPnum = 1000 + Math.floor(Math.random() * 9000);

    const sendDate = {
        from: 'narmenia878@gmail.com',
        to: req.body.email,
        subject: `Hi! ${req.body.name} this is your OTP code`,
        text: 'you must write this OTP code in this page http://localhost:3001/registration/verify',
        html: `<h2 style="color: #1252AE">${OTPnum}<h2>`
    };

    const sentInfo = await transporter.sendMail(sendDate)
    if (!sentInfo.messageId) {
        return res.status(404).send('email send failed');
    }
    next();
}

let userInfo;

router.post('/signup', validation, checkDB, mailer, (req, res, next) => {
    userInfo = req.body;
    res.redirect('verify');
})


router.get('/verify', (req, res, next) => {
    res.render('verify.ejs')
})

router.post('/verify', (req, res, next) => {
    if (req.body.num.join('') == OTPnum) {
        req.userInfo = userInfo;
        return next();
    }
    res.redirect('verify')
}, createJWTAndAddDB)

router.get('/signin', (req, res) => {
    res.render('signup.ejs', { page: 'signin' })
})

router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;

    const [findUser] = await pool.query('select * from users where email=?', email);
    if (findUser.length !== 0) {
        const checkPassword = await bcrypt.compare(password, findUser[0].password);
        console.log({
            name: findUser[0].name,
            email: findUser[0].email,
            password: findUser[0].password,
        })
        if (checkPassword) {
            const sign = JWT.sign({
                id: findUser[0].id,
                name: findUser[0].name,
                email: findUser[0].email,
                mode: findUser[0].webBg,
            }, process.env.JWT_SECRET);
            res.cookie('JWT_SIGN', sign);
            return res.redirect('/');
        };
        return res.redirect('signin');
    }
    res.redirect('signin');
})

module.exports = router;