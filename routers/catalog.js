
const router = require('express').Router();
const pool = require('../collaboration/DB');

router.get('/', async (req, res) => {
    const { price, location, categoryType, property} = req.query;
    const [likeBtns] = await pool.query('select productId from wishlist where userId = ?', [req.user.id])
    if(!price) {
        var minPrice = 0;
        let [maxNum] = await pool.query('select max(price) from products');
        var maxPrice = maxNum[0]['max(price)'];
    } else {
        const priceArr = price.split('-'); 
        var minPrice = priceArr[0];
        var maxPrice = priceArr[1];
    }
    console.log(price, location, categoryType, property)


    let [products] = await pool.query(`select id, productName, category, price, homeAddress, bedRooms, bathRooms, location, images from products where category ${categoryType ? `= '${categoryType}'` : 'is not null'} and location ${location ? `= '${location}'` : 'is not null'} and property ${property ? `= '${property}'` : 'is not null'} and price >= ${minPrice} and price <= ${maxPrice}`);
    products = products.map(product => {
        return {
            ...product,
            images: product.images.split(' ')[0]
        }
    })
    console.log(likeBtns)
    res.render('catalog.ejs', { products, likeBtns, category: categoryType ? categoryType : undefined })
})


router.post('/', async (req, res) => {
    const { categoryType, selectValue, property, minPrice, maxPrice, chooseBed, chooseBath } = req.body;
    console.log(req.body)
    const [likeBtns] = await pool.query('select productId from wishlist where userId = ?', [req.user.id])

    if (!maxPrice) {
        var [maxNum] = await pool.query('select max(price) from products');
        maxNum = maxNum[0]['max(price)']
    }
    // const propertyArr = property.split(',');
    // propertyArr.reduce((aggr, val, i) => {
    //     return aggr += `"${val}"` + (i !== propertyArr.length-1 ? ',' : '');
    //  }, '')

    if (property) {
        let makeString = JSON.stringify(property.split(','));
        var charProperty = makeString.slice(1, makeString.length - 1)
        console.log(charProperty)
    }

    let [products] = await pool.query(`select id, productName, category, price, homeAddress, bedRooms, bathRooms, location, images from products where category ${categoryType ? `= '${categoryType}'` : 'is not null'} and location ${selectValue ? `= '${selectValue}'` : 'is not null'} and ${charProperty ? 'property in(' + `${charProperty}` + ')' : true} and price >= ${minPrice ? minPrice : 0} and price <= ${maxPrice ? maxPrice : maxNum} and bedRooms ${chooseBed ? chooseBed == 4 ? `>= '${chooseBed}'` : `= '${chooseBed}'` : 'is not null'} and bathRooms ${chooseBath ? chooseBath == 4 ? `>= '${chooseBath}'` : `= '${chooseBath}'` : 'is not null'} `);
    products = products.map(product => {
        return {
            ...product,
            images: product.images.split(' ')[0]
        }
    })
    res.send({products, categoryType, likeBtns});
})


module.exports = router;