const express = require("express");
const pool = require("../config");

router = express.Router();

// แสดง order
router.get("/manageorder", async function (req, res, next) {
  try {
    const orders = await pool.query("SELECT * FROM `order`");
    
    res.send(orders[0])

  }
  catch (e) {
    res.send(e)
  }
});

router.put('/yes/:id', async function (req, res, next) {
  const [row, fields] = await pool.query(
    'UPDATE `order` SET order_status = ? WHERE order_id = ?',
    ['sold',req.params.id]
  )
  res.json()

});

router.put('/no/:id', async function (req, res, next) {
  const [row, fields] = await pool.query(
    'UPDATE `order` SET order_status = ? WHERE order_id = ?',
    ['canceled',req.params.id]
  )
  res.json()

});

exports.router = router;
