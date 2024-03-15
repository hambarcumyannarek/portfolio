// ===== Libraries Requires Start ===== //
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const methodOverride = require('method-override');
// ===== Libraries Requires End ===== //


// ===== Files Requires Start ===== //

const Registration = require('./routers/registration');
const Auto = require('./Auto/enterAuto');
const ExitAuto = require('./Auto/exitAuto');
const AddProperty = require('./routers/addProperty');
const Single = require('./routers/single');
const Catalog = require('./routers/catalog');
const Wishlist = require('./routers/wishlist');
const pool = require('./collaboration/DB');
// ===== Files Requires End ===== //

const app = express();

// ===== General Variable Start ===== //
// ===== General Variable Start ===== //

app.set('views-engine', 'ejs')
    .use(express.static('public'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(methodOverride('_method'))
    .use(helmet({
        contentSecurityPolicy: false,
        xDownloadOptions: false,
    }),)
    .use(cookieParser())
    .use(async (req, res, next) => {
        const csrfToken = await crypto.randomBytes(77).toString('hex');
        res.locals.csrfToken = csrfToken;
        res.cookie('csrfToken', csrfToken, {httpOnly: true, secure: true, sameSite: 'Strict'});
        next();
    })
    .use(async (req, res, next) => {
        const { _csrf } = req.body;
        console.log(req.path)
        console.log(req.method)
        if (req.method === 'GET' || req.path === '/addProperty' && req.method === 'POST' || req.path === '/addProperty' && req.method === 'PUT' || req.path === '/catalog' && req.method === 'POST' || req.path.search('/wishlist') !== -1 || req.path === '/mode') {
            console.log('auto');
            return next();
        } else if (_csrf === req.cookies.csrfToken) {
            console.log({
                html: _csrf,
                cookie: req.cookies.csrfToken
            })
            return next();
        }
    })

app.get('/', Auto, (req, res) => {
    res.render('home.ejs');
})

// experiments

app.get('/profil', Auto, (req, res) => {
    res.send(req.user)
})

app.use('/catalog', Auto, Catalog);

app.use('/addProperty', Auto, AddProperty);

app.use('/single', Auto, Single);

app.use('/wishlist', Auto, Wishlist);

app.post('/', (req, res) => {
    res.render('home.ejs', { name: 'Narek' });
})


app.use('/registration/', ExitAuto, Registration);
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Your port liveing on http://localhost:${port} this host`)
})