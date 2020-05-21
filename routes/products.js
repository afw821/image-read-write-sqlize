const db = require('../models');
const express = require('express');
const router = express.Router();
const ash = require('express-async-handler');
const upload = require("../middleware/upload");
const fs = require('fs');
const decode = require('../utils/decode');
//post a product
router.post('/',upload.single("file") , ash(async (req, res) => {
    


    console.log(req.file);

    if (req.file == undefined) {
        return res.send(`You must select a file.`);
    }


    const product = await db.Product.create({
        name: "cool Product",
        inStock: 5,
        data: fs.readFileSync(
            __basedir + "/resources/static/assets/uploads/" + req.file.filename
        ),
        dataType: 'jpg',
        dataName: req.file.filename,
        imgSrc: `file://${__basedir}/resources/static/assets/uploads/${req.file.filename}`
    });

    console.log('product', product);
    if (!product) return res.status(400).send('error posting product')

    res.json(product);
}));
//get all products
router.get('/', ash(async (req, res) => {
    console.log('-----------get-------');
    const products = await db.Product.findAll({
    });

    if (!products) res.status(404).send('Error finding all products');
    console.log('----------preojects get from route--------------', products[0].data);
    // for(let i = 0; i < products.length; i++){
    //     decode(products[i].data);
    // }
    res.json(products);

}));


module.exports = router;
