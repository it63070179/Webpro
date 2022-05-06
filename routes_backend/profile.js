const express = require("express");
const path = require("path");
const pool = require("../config");

router = express.Router();

router.get("/profile/employee/:id", async function (req, res, next) {

    try {
        const [user, fields] = await pool.query(`SELECT * FROM user WHERE user_id=?`, [req.params.id]);
        return res.send(user[0]);
    } catch (err) {
        return res.status(500).json(err)
    }

});


router.get("/profile/customer/:id", async function (req, res, next) {

    try {
        const [user, fields] = await pool.query(`SELECT * FROM user JOIN customer USING (user_id) WHERE user_id=?`, [req.params.id]);
        return res.send(user[0]);
    } catch (err) {
        return res.status(500).json(err)
    }

});

router.put("/profile/editemployee/:id", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    const fname = req.body.fname
    const lname = req.body.lname
    const address = req.body.address
    const phone = req.body.phone
    const age = req.body.age
    try {
        await conn.query('UPDATE user SET fname=? WHERE user_id=?', [fname, req.params.id])
        await conn.query('UPDATE user SET lname=? WHERE user_id=?', [lname, req.params.id])
        await conn.query('UPDATE user SET address=? WHERE user_id=?', [address, req.params.id])
        await conn.query('UPDATE user SET phone=? WHERE user_id=?', [phone, req.params.id])
        await conn.query('UPDATE user SET age=? WHERE user_id=?', [age, req.params.id])

        conn.commit()

    }
    catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }

});

router.put("/profile/editcustomer/:id", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    const fname = req.body.fname
    const lname = req.body.lname
    const address = req.body.address
    const phone = req.body.phone
    const age = req.body.age
    const email = req.body.email
    try {
        await conn.query('UPDATE user SET fname=? WHERE user_id=?', [fname, req.params.id])
        await conn.query('UPDATE user SET lname=? WHERE user_id=?', [lname, req.params.id])
        await conn.query('UPDATE user SET address=? WHERE user_id=?', [address, req.params.id])
        await conn.query('UPDATE user SET phone=? WHERE user_id=?', [phone, req.params.id])
        await conn.query('UPDATE user SET age=? WHERE user_id=?', [age, req.params.id])
        await conn.query('UPDATE customer SET email=? WHERE user_id=?', [email, req.params.id])
        
        
        conn.commit()
    }
    catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }

})




exports.router = router