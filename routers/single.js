const router = require('express').Router();
const pool = require('../collaboration/DB');
const JWT = require('jsonwebtoken');

router.get('/:id', async (req, res) => {
    try {
        const [getProductInfo] = await pool.query('select products.id as productId, userId, productName, homeAddress, bedRooms, bathRooms, parkingPlace, location, description, price, images, date, property, category, users.name as userName, users.email as userEmail from products inner join users on users.id = userId where products.id=?', [req.params.id]);
        const state = {...getProductInfo[0], images: getProductInfo[0].images.split(' ')};
        console.log(state);
        if(req.cookies.JWT_SIGN) {
            var userObj = await JWT.verify(req.cookies.JWT_SIGN, process.env.JWT_SECRET)
        }
        res.render('single.ejs', {getProductInfo: state, thisMy: userObj ? state.userId === userObj.id ? true : false : false})
    } catch(err) {
        res.send('not defined')
    }
})



module.exports = router;