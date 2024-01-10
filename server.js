// ===== Libraries Requires Start ===== //
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

// ===== Libraries Requires End ===== //


// ===== Files Requires Start ===== //

const Registration = require('./routers/registration');
const Auto = require('./Auto/enterAuto');
const exitAuto = require('./Auto/exitAuto');
// ===== Files Requires End ===== //

const app = express();

// ===== General Variable Start ===== //
// ===== General Variable Start ===== //

app.set('views-engine', 'ejs')
    .use(express.static('public'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(helmet())
    .use(cookieParser())
    .use(async (req, res, next) => {
        const csrfToken = await crypto.randomBytes(77).toString('hex');
        res.locals.csrfToken = csrfToken;
        res.cookie('csrfToken', csrfToken);
        next();
    })
    .use(async (req, res, next) => {
        if (req.method === 'GET') {
            return next();
        }
        const { _csrf } = req.body;
        if (_csrf === req.cookies.csrfToken) {
            console.log({
                html: _csrf,
                cookie: req.cookies.csrfToken
            })
            return next();
        }
    })

app.get('/', Auto, (req, res) => {
    console.log(req.user)
    res.render('home.ejs', { name: 'Narek' });
})

// experiments

app.get('/profil', Auto, (req, res) => {
    res.send(req.user)
})

app.get('/catalog', Auto, (req, res) => {
    res.render('catalog.ejs')
})


app.post('/', (req, res) => {
    console.log('sbdjsbdjsbdjsbdjsbdjsbdsbjdbsjdbsdbsjbdjsbdjsbdjsb')
    res.render('home.ejs', { name: 'Narek' });
})

app.use('/registration/', exitAuto, Registration);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Your port liveing on http://localhost:${port} this host`)
})