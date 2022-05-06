const express = require("express");
const pool = require("../config");
const Joi = require('joi');
const bcrypt = require('bcrypt');


router = express.Router();


router.put("/forgetpassword", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    const user_name = req.body.user_name
    const email = req.body.email
    const user_password = await bcrypt.hash(req.body.userpassword, 5)

    try {
        let result = await conn.query('SELECT * FROM user JOIN customer USING (user_id) WHERE user_login = ?', [user_name])
        console.log(result[0].length)
        if (result[0].length != 0) {
            if (email == result[0][0].email) {
                await conn.query('UPDATE user SET user_password=? WHERE user_login=?', [user_password, user_name])
                res.send('success')
            } else {
                res.send('Incorrect email')
            }
        }else{
            res.send('Incorrect username')
        }

        conn.commit()
        // console.log(user_name)
        // console.log(email)
        // console.log(user_password)
    } catch (err) {
        await conn.rollback();
    } finally {
        console.log("finally");
        conn.release();
    }
});


exports.router = router