const express = require("express");
const path = require("path");
const pool = require("../config");
const multer = require("multer");

router = express.Router();

router.get("/user/:userid", async function (req, res, next) {
    try {
        const [user, fields] = await pool.query('select * from user where user_id = ?', req.params.userid);
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err)
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
            message: "Update Blog id " + req.params.id + " Complete"
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
