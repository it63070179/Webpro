const express = require("express");
const path = require("path")
const pool = require("../config");

router = express.Router();

router.post("/order/:id", async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
        let order = await conn.query(
            "INSERT INTO `order`(order_datetime, order_totalprice, user_id, cafe_branchid, pro_id, order_status)" +
            "VALUES(CURRENT_TIMESTAMP, ?, ?, ?, null, 'pending');", [req.body.sumPrice, req.params.id, 1])
        const orderId = order[0].insertId;
        // console.log(orderId)
        for (let i = 0; i < req.body.cart.length; i++) {
            let productPrice = req.body.cart[i].product_price
            let orderAmount = req.body.cart[i].order_amount
            let totalPrice = req.body.cart[i].product_price * req.body.cart[i].order_amount
            let productId = req.body.cart[i].product_id
            let order_item = await conn.query(
                "INSERT INTO order_item(product_price, order_amount, item_totalprice, product_id, order_id)" +
                "VALUES(?, ?, ?, ?, ?);", [productPrice, orderAmount, totalPrice, productId, orderId])
        }
        await conn.commit();
        res.json({
            orderId: orderId
        });
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

router.get("/order/:orderId", async function (req, res, next) {
    try {
        const [itemProduct, fields] = await pool.query("select * from order_item join product using (product_id) where order_id = ?", [req.params.orderId]);
        console.log(itemProduct)
        return res.json(itemProduct);
    } catch (err) {
        return res.status(500).json(err)
    }
})


exports.router = router;