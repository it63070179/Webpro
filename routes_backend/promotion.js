const express = require("express");
const path = require("path");
const pool = require("../config");
const multer = require('multer')



router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads') // path to save file
  },
  filename: function (req, file, callback) {
    // set file name
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

// แสดงโปรโมชั่น
router.get("/promotion", async function (req, res, next) {
  try {
    const promo = await pool.query("SELECT * FROM promotion" );
    res.send(promo[0])
  }
  catch (e) {
    res.send(e)
  }
});


// เพิ่มโปรโมชัน
router.post("/promotion/add", upload.single('pro_image'), async function (req, res, next) {

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  const pro_name = req.body.pro_name
  const start_date = req.body.start_date
  const expired_date = req.body.expired_date
  const pro_detail = req.body.pro_detail
  const pro_image = req.file;


  try {
    await conn.query(
      'INSERT INTO promotion(pro_name, start_date, expired_date, pro_detail, pro_image)' +
      'VALUES (?, ?, ?, ?, ?)',
      [pro_name, start_date, expired_date, pro_detail, pro_image.path.substring(6)]
    )

    res.json()
  }
  catch (err) {
    conn.rollback()
    res.status(400).json(err.toString());
  } finally {
    conn.release()
  }


});
// ลบโปรโมชัน
router.delete('/promotion/:promoId', async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction()


  try {

    await conn.query('DELETE FROM promotion WHERE pro_id=?;', [req.params.promoId])
    await conn.commit()
    res.json({
      message: 'Delete promotion id ' + req.params.promoId + ' complete'
    })
  } catch (error) {
    await conn.rollback()
    next(error)
  } finally {
    console.log('finally')
    conn.release()
  }
});


//edit โปรโมชัน
router.get("/editpromotion/:promoId", async function (req, res, next) {
  const promise1 = pool.query("SELECT * FROM promotion WHERE pro_id = ?", [req.params.promoId]);
  Promise.all([promise1])
    .then((results) => {
      const [promotion, promoFields] = results[0];
      res.json({
        promotions: promotion[0],
      });
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json(err);
    });
});
router.post("/promotion/add", upload.single('pro_image'), async function (req, res, next) {

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  const pro_name = req.body.pro_name
  const start_date = req.body.start_date
  const expired_date = req.body.expired_date
  const pro_detail = req.body.pro_detail
  const pro_image = req.file;


  try {
    await conn.query(
      'INSERT INTO promotion(pro_name, start_date, expired_date, pro_detail, pro_image)' +
      'VALUES (?, ?, ?, ?, ?)',
      [pro_name, start_date, expired_date, pro_detail, pro_image.path.substring(6)]
    )

    res.json()
  }
  catch (err) {
    conn.rollback()
    res.status(400).json(err.toString());
  } finally {
    conn.release()
  }


});

router.put("/saveeditpromo/:promoId", upload.single('pro_image'), async function (req, res, next) {

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  const pro_name = req.body.pro_name
  const start_date = req.body.start_date
  const expired_date = req.body.expired_date
  const pro_detail = req.body.pro_detail
  const pro_image = req.file;
  const promotionId = req.params.id;

  try {
    await conn.query('UPDATE promotion SET pro_name=? WHERE pro_id=?', [pro_name, req.params.promoId])
    await conn.query('UPDATE promotion SET start_date=? WHERE pro_id=?', [start_date, req.params.promoId])
    await conn.query('UPDATE promotion SET expired_date=? WHERE pro_id=?', [expired_date, req.params.promoId])
    await conn.query('UPDATE promotion SET pro_detail=? WHERE pro_id=?', [pro_detail, req.params.promoId])
    await conn.query('UPDATE promotion SET pro_image=? WHERE pro_id=?', [pro_image.path.substring(6), req.params.promoId])

      res.json()

  } catch (err) {
      await conn.rollback();
      return res.status(500).json(err)
  } finally {
      conn.release();
  }
});
exports.router = router;
