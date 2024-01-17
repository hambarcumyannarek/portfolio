const router = require('express').Router();
const pool = require('../collaboration/DB');

router.get('/', async (req, res) => {
    let [products] = await pool.query('select productId, productName, category, price, location, homeAddress, bedRooms, bathRooms, images  from wishlist inner join users on users.id = userId inner join products on products.id = productId where wishlist.userId = ?', [req.user.id])
    products = products.map(product => {
        return {
            ...product,
            images: product.images.split(' ')[0]
        }
    })
    res.render('wishlist.ejs', {products});
})

router.post('/:productId', async (req, res) => {
    console.log(req.body)
    const addDB = await pool.query('insert into wishlist(userId, productId) values(?, ?)', [req.user.id, req.params.productId])
    if(!addDB) {
        return res.status(404).send(`request faild: ${addDB}`)
    }
    res.send('');
})

router.delete('/:productId', async (req, res) => {
    const deleteDB = await pool.query('delete from wishlist where userId = ? and productId = ?', [req.user.id, req.params.productId])
    if(!deleteDB) {
        return res.status(404).send(`request faild: ${deleteDB}`)
    }
    console.log(req.params);
    res.send('');
})


module.exports = router;