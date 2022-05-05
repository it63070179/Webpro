const express = require("express");
const pool = require("../config");

router = express.Router();
// สร้าง review
router.post('/addreviews', async function (req, res, next) {
    try {
        const [rows1, fields1] = await pool.query(
            'INSERT INTO review (review_text, review_point, review_name, review_time, review_box, product_id) VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, ?)',
           [req.body.review_text, 0, req.body.review_name , req.body.review_box, req.body.product_id]
          
        )
        const [rows2, fields2] = await pool.query(
            'select * from review where review_id = ?',
            [rows1.insertId]
        )

        res.json(rows2)
    } catch (err) {
        console.log(err)
    }
});

router.get("/review/:id", async function (req, res, next) {
    try {
      const reviews = await pool.query("SELECT * FROM review WHERE product_id = ? ",[
        req.params.id,
      ]);
      res.send(reviews[0])
    }
    catch (e) {
      res.send(e)
    }
});

//edit review
router.put('/editreview/:reviewId', async function (req, res, next) {
  reviews = req.body.review_text
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  try {
      const [rows1, fields1] = await conn.query(
          'UPDATE review SET review_text = ? WHERE review_id = ?',
          [reviews, req.params.reviewId]
      )
      const [rows2, fields2] = await conn.query(
          'SELECT * FROM review WHERE review_id = ?',
          [req.params.reviewId]
      )
      await conn.commit()
      return res.json(rows2[0])
  } catch (err) {
      await conn.rollback();
      return res.status(500).json(err)
  } finally {
      console.log('finally')
      conn.release();
  }
});

// Delete Review
router.delete('/deletereview/:reviewId', async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {

      await conn.query('DELETE FROM review WHERE review_id=?;', [req.params.reviewId])
      await conn.commit()
      res.json()
  } catch (error) {
      await conn.rollback()
      next(error)
  } finally {
      conn.release()
  }
  // return
});

// add rating
router.put('/addrating/:reviewId', async function (req, res, next) {
  const [rows, fields] = await pool.query(
      'SELECT * FROM review WHERE review_id = ?',
      [req.params.reviewId]
  )
  
  let like = rows[0].review_point
  like += 1;

  const [rows2, fields2] = await pool.query(
      'UPDATE review SET review.review_point = ? WHERE review_id = ?',
      [like, req.params.reviewId]
  )

  res.send({
      "reviewId": req.params.reviewId,
      "like": like
  })
  // return
});

exports.router = router;
