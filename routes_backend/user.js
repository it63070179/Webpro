const express = require("express");
const path = require("path");
const pool = require("../config");
const multer = require("multer");
const {
    router
} = require("./home");

router = express.Router();

router.get("/user/:userid", async function (req, res, next) {
    try {
        const [user, fields] = await pool.query('select * from user where user_id = ?', req.params.userid);
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err)
    }
});

router.post("/user/create", async function (req, res, next) {
    // Begin transaction
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
        let adduser = await conn.query("INSERT INTO user(user_login, user_password, fname, lname, phone, email) " +
            "VALUES(?, ?, ?, ?, ?, ?);",
            [req.body.login, req.body.password, req.body.fname, req.body.lname, req.body.phone, req.body.email]
        );
        const adduserId = adduser[0].insertId;
        console.log(adduser)
        console.log(adduserId)
        await conn.commit();
        res.send("success!");
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }

});

router.put("/user/:userid", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        await conn.query('UPDATE user SET fname=?,lname=?, age=?, address=?, phone=?, email=? WHERE id=?',
            [req.body.fname, req.body.lname, req.body.age, req.body.address, req.body.phone, req.body.email, req.params.userid])
        conn.commit()
        res.json({
            message: "Update user id " + req.params.userid + " Complete"
        })
    } catch (error) {
        await conn.rollback()
        return next(error)
    } finally {
        console.log('finally')
        conn.release()
    }

});

router.put("/user/forget/:userid", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        await conn.query('UPDATE user SET user_password WHERE id=?',
            [req.body.password, req.params.userid])
        conn.commit()
        res.json({
            message: "Update user id " + req.params.userid + " Complete"
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
