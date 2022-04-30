const express = require("express");
const pool = require("../config");
const Joi = require('joi');
const bcrypt = require('bcrypt')

router = express.Router();

const passwordValidator = (value, helpers) => {
    if (value.length < 8) { //ค่าน้อยกว่า 8 ตัว
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) { //เช็คว่าค่าเป็นภาษาอังกฤษตัวเล็ก ตัวใหญ่ และ ตัวเลขหรือป่าว
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const usernameValidator = async (value, helpers) => {
    const [rows, fields] = await pool.query
        ("SELECT user_login FROM user WHERE user_login = ?", [value])
    if (rows.length > 0) { //ถ้าหาเจอในฐานข้อมูล
        const message = 'This user is already taken'
        throw new Joi.ValidationError(message, { message }) //ทำให้แปลงเป็น json ได้ ถ้าส่งค่ามาเลยมันจะแสดงเป็น {} เฉพาะ external
    }
    return value
}

const signupSchema = Joi.object({
    fname: Joi.string().required().min(5).max(50),
    lname: Joi.string().required().min(5).max(50),
    email: Joi.string().email().required().max(50),
    phone: Joi.string().required().pattern(/0[0-9]{9}/), //ขึ้นต้นด้วย 0 เป็นตัวเลขต่อท้ายความยาว 9
    user_password: Joi.string().required().custom(passwordValidator),
    confirm_password: Joi.string().required().equal(Joi.ref('user_password')), //เช็คว่าค่าตรงกับ field password
    user_login: Joi.string().required().min(4).external(usernameValidator), //ถ้าติดต่อฐานข้อมูลจะใช้ external
    age: Joi.number().required().min(15).max(80),
    address: Joi.string().required()

})

router.post('/signup', async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false }) //abortEarly ถ้าเป็น false จะvalidate ทุกfieldให้เสร็จก่อนแล้วดูว่าตัวไหนมีปัญหาจะ responseกลับไป
    } catch (err) {
        return res.status(400).json(err)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const user_login = req.body.user_login //ดึงข้อมูลจาก req.bodyมาใส่ตัวแปรเก็บไว้ เอาไปใช้
    const user_password = await bcrypt.hash(req.body.user_password, 5) //hash ค่าpassword ที่ผู้ใช้งานพิมพ์มาเก็บเข้าตัวแปรpassword เป็นstring อ่านไม่รู้เรื่อง
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email
    const phone = req.body.phone
    const age = req.body.age
    const address = req.body.address

    try {
        await conn.query(
            'INSERT INTO user(user_login, user_password, fname, lname, email, phone, age, address, user_point) ' + //insert ข้อมูลเข้าตาราง user ในdatabase
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [user_login, user_password, fname, lname, email, phone, age, address, 0]
        )
        conn.commit()
        res.status(201).send()
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})

exports.router = router
