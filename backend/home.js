const express = require("express");
const path = require("path");
const pool = require("../config");
const multer = require("multer");

// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./static/uploads");
    },
    filename: function (req, file, callback) {
        callback(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({
    storage: storage
});

router = express.Router();

router.get("/home", async function (req, res, next) {
    try {
        let product_image = 'select * from product join image using(product_id)'
        let product_popular = 'select *, count(oi.product_id) `customer purchase product` from product p join order_item oi using(product_id) join order o using(order_id) where order_datetime between `2022-01-01` and `2022-03-01` group by oi.product_id order by count(oi.product_id) desc'
        let product_new = 'select product_id, product_name, product_desc, product_price, product_type from productwhere product_id > (select count(product_id)-3 from product);'
        const [allproducts, fields] = await pool.query(product_image);
        const [popularproducts, fields1] = await pool.query(product_popular);
        const [newproducts, fields2] = await pool.query(product_new);
        return res.json(allproduct);
    } catch (err) {
        return res.status(500).json(err)
    }

});

router.post("/home/create", upload.array("myImage", 5), async function (req, res, next) {
    const file = req.files;
    let pathArray = [];

    if (!file) {
        return res.status(400).json({
            message: "Please upload a file"
        });
    }
    // Begin transaction
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
        let countid = await conn.query('select count(product_id)')
        let product = await conn.query(
            "INSERT INTO product(product_id, product_name, product_desc, product_price, product_type, product_status, product_amount) " +
            "VALUES(?, ?, ?, ?, ?, ?, ?);",
            [countid + 1, req.body.name, req.body.desc, req.body.price, req.body.type, 'available', req.body.amount]
        );
        const productId = product[0].insertId;
        console.log(product)
        console.log(productId)

        await conn.query(
            "insert into image(image_path, product_id) VALUES (?, ?)",
            [file.path.substring(6), productId]
        );

        await conn.commit();
        res.send("success!");
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }

});

router.put("/home/:productId", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        await conn.query('update product set product_name=?,product_desc=?, product_price=?, product_type=?, product_status=?, product_amount=? where product_id=?',
            [req.body.name, req.body.desc, req.body.price, req.body.type, req.body.status, req.body.amount, req.params.productId])
        conn.commit()
        res.json({
            message: "Update product id " + req.params.productId + " Complete"
        })
    } catch (error) {
        await conn.rollback()
        return next(error)
    } finally {
        console.log('finally')
        conn.release()
    }

});

router.delete("/home/:productId", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        await conn.query('delete from product where product_id=?', [req.params.productId])
        await conn.query('delete from image where product_id=?;', [req.params.productId])
        await conn.query('select * from drink where product_id=?', [req.params.productId])
        conn.commit()
        res.json({
            message: 'Delete product id ' + req.params.productId + ' complete'
        })
    } catch (error) {
        await conn.rollback()
        return next(error)
    } finally {
        console.log('finally')
        conn.release()
    }

});

exports.router = router;