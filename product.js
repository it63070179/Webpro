const express = require("express");
const path = require("path");
const pool = require("../config");
const multer = require("multer");
const {
    router
} = require("./home");

router = express.Router();

router.get("/product", async function (req, res, next) {
    try {
        const bakeryProduct = 'select * from product' + 'where product_type =' + 'bakery'
        const drinkProduct = 'select * from product' + 'where product_type =' + 'drink'
        const [bakery, fields] = await pool.query(bakeryProduct);
        const [drink, fields1] = await pool.query(drinkProduct);
        return res.json(bakery);
    } catch (err) {
        return res.status(500).json(err)
    }

});

router.get("/product/:productId", async function (res, req, next) {
    try {
        const [oneProduct, fields] = await pool.query('select * from product where product_id = ?');
        return res.json(oneProduct);
    } catch (err) {
        return res.status(500).json(err)
    }
})

exports.router = router;