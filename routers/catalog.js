
const router = require('express').Router();
const pool = require('../collaboration/DB');

router.get('/', async (req, res) => {
    const { categoryType, selectValue, property, minPrice, maxPrice, chooseBed, chooseBath } = req.query;
    console.log(property)
    if (!maxPrice) {
        var [maxNum] = await pool.query('select max(price) from products');
        maxNum = maxNum[0]['max(price)']
    }
    console.log(req.query)
    console.log( categoryType, selectValue, property, minPrice, maxPrice, chooseBed, chooseBath )
    if (property) {
        let makeString = JSON.stringify(property.split(','));
        var charProperty = makeString.slice(1, makeString.length - 1)
        console.log(charProperty)
    }

    console.log(selectValue)
    const [products] = await pool.query(`select id, productName, category, homeAddress, bedRooms, bathRooms, location, images from products where category ${categoryType ? `= '${categoryType}'`: 'is not null'} and location ${selectValue ? `= '${selectValue}'`: 'is not null'} and ${charProperty ? 'property in(' + `${charProperty}` + ')' : true} and price >= ${minPrice ? minPrice : 0} and price <= ${maxPrice ? maxPrice : maxNum} and bedRooms ${chooseBed ? chooseBed == 4 ? `>= '${chooseBed}'` : `= '${chooseBed}'` : 'is not null'} and bathRooms ${chooseBath ? chooseBath == 4 ? `>= '${chooseBath}'` : `= '${chooseBath}'` : 'is not null'} `);
    console.log(products)
    res.render('catalog.ejs', { category: categoryType ? categoryType : undefined })
})


module.exports = router;