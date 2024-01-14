const router = require('express').Router();
const multer = require('multer');
const path = require('path')
const fs = require('fs/promises');

const pool = require('../collaboration/DB.js'); // DB Set


const storage = multer.diskStorage({
    destination: 'public/images/upload',
    filename: (req, file, cb) => {
        const fileSintax = Math.random() + '-' + Date.now() + '-' + Math.random();
        cb(null, fileSintax + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

router.get('/', async (req, res) => {
    if (req.query.method === undefined) {
        return res.render('addProperty.ejs', { method: 'post' })
    } else if (req.query.method === 'put') {
        const [getProductInfo] = await pool.query('select * from products where id = ? and userId = ?', [req.query.productId, req.user.id]);
        console.log(getProductInfo);
        if (getProductInfo.length !== 0) {
            return res.render('addProperty.ejs', { getProductInfo: getProductInfo[0], method: 'put' })
        }
        res.redirect('/');
    }
})

// router.get('/', async (req, res) => {
// })

function makeStringFileName(arr) {
    return arr.reduce((aggr, val, i) => {
        if (arr.length - 1 === i) {
            return aggr += val.filename;
        }
        return aggr += val.filename + ' ';
    }, '');
}

async function unlinkImages(img) {
    await fs.unlink(path.resolve('public', 'images', 'upload', img));
}

router.post('/', upload.array('fileimg'), async (req, res) => {
    const { productName, homeAddress, property, category, chooseBed, chooseBath, locationCity, chooseParking, description, price, removeImage } = req.body;
    if (removeImage) {
        var makeStringFileNameVariable = makeStringFileName(req.files.filter((obj, i) => {
            if (removeImage.indexOf(i.toString()) === -1) {
                return obj;
            }
        }))

        removeImage.split('').forEach(async (val) => {
            await unlinkImages(req.files[+val].filename);
        });
    }

    if (!makeStringFileNameVariable) {
        makeStringFileNameVariable = makeStringFileName(req.files)
    }
    try {
        const dbInsertValues = [req.user.id, productName, homeAddress, chooseBed, chooseBath, chooseParking, locationCity, description, price, makeStringFileNameVariable, new Date().toString().split(' ').slice(0, 4).join(' '), property, category];
        await pool.query("insert into products(userId, productName, homeAddress, bedRooms, bathRooms, parkingPlace, location, description, price, images, date, property, category) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", dbInsertValues)
        var [product] = await pool.query('select max(id) as productId from products where userId=?', [req.user.id])

    } catch (err) {
        return res.status(404).send(err)
    }
    res.redirect(`/single/${product[0].productId}`)
})




router.put('/', upload.array('fileimg'), async (req, res) => {
    const { productName, homeAddress, property, category, chooseBed, chooseBath, locationCity, chooseParking, description, price, removeImage, formerImages } = req.body;

    formerImages.split(' ').forEach(async (val) => {
        const a = await unlinkImages(val);
    })

    if (removeImage) {
        var makeStringFileNameVariable = makeStringFileName(req.files.filter((obj, i) => {
            if (removeImage.indexOf(i.toString()) === -1) {
                return obj;
            }
        }))
    }

    if (!makeStringFileNameVariable) {
        makeStringFileNameVariable = makeStringFileName(req.files)
    }
    try {
        const dbInsertValues = [productName, homeAddress, chooseBed, chooseBath, chooseParking, locationCity, description, price, makeStringFileNameVariable, new Date().toString().split(' ').slice(0, 4).join(' '), category, property, req.query.productId, req.user.id];
        console.log(dbInsertValues)
        await pool.query(`update products set
            productName = ?,
            homeAddress = ?,
            bedRooms = ?,
            bathRooms = ?,
            parkingPlace = ?,
            location = ?,
            description = ?,
            price = ?,
            images = ?,
            date = ?,
            category = ?,
            property = ? where id = ? and userId = ?;
        `, dbInsertValues)
    } catch (err) {
        return res.status(404).send(err)
    }
    res.redirect(`/single/${req.query.productId}`)
})

router.delete('/:id', async (req, res) => {
    console.log(req.params.id, req.user.id);
    const [productsImgObj] = await pool.query('select images from products where id = ? and userId = ?', [req.params.id, req.user.id]);
    productsImgObj[0].images.split(' ').forEach(async (img) => {
        await unlinkImages(img);
    })
    await pool.query('delete from products where id = ? and userId = ?', [req.params.id, req.user.id])
    res.redirect('/');
})



module.exports = router;