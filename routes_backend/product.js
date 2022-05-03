const express = require("express");
const path = require("path");
const pool = require("../config");

router = express.Router();

const multer = require("multer");

var storage = multer.diskStorage({
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
const upload = multer({ storage: storage });

router.get("/product/bakery", async function (req, res, next) {
  try {
    let bakery = `SELECT * FROM product JOIN image USING (product_id) WHERE product_type = 'bakery' GROUP BY product_id`;
    const [productbakery, fields] = await pool.query(bakery);
    return res.json(productbakery);
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get("/product/drink", async function (req, res, next) {
  try {
    let drink = `SELECT * FROM product JOIN image USING (product_id) WHERE product_type = 'drink' GROUP BY product_id`;
    const [productdrink, fields] = await pool.query(drink);
    return res.json(productdrink);
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.post("/product/add", upload.array("myImage"), async function (req, res, next) {
  if (req.method == "POST") {
    const file = req.files;
    let pathArray = [];

    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    const product_name = req.body.product_name
    const product_desc = req.body.product_desc
    const product_price = req.body.product_price
    const product_type = req.body.product_type
    const product_status = req.body.product_status
    const product_amount = req.body.product_amount

    console.log(product_name)

    try {
      let result = await conn.query(
        'INSERT INTO product(product_name, product_desc, product_price, product_type, product_status, product_amount)' +
        'VALUES (?, ?, ?, ?, ?, ?)',
        [product_name, product_desc, product_price, product_type, product_status, product_amount],
      );
      const productId = result[0].insertId; 
      
      req.files.forEach((file, index) => {
        let path = [productId, file.path.substring(6)];
        pathArray.push(path);
      });
      console.log(pathArray)
      await conn.query(
        'INSERT INTO image(product_id, image_path)' +
        'VALUES ?',
        [pathArray]
      )
      conn.commit()
      res.send()
    } catch (err) {
      conn.rollback()
      res.status(400).json(err.toString());
    } finally {
      conn.release()
    }
  }
});

router.get("/product/:id", function (req, res, next) {
  
  const promise1 = pool.query("SELECT * FROM product WHERE product_id = ?", [req.params.id]);
  const promise2 = pool.query("SELECT * FROM image WHERE product_id = ?", [req.params.id]);

  Promise.all([promise1, promise2])
      .then((results) => {
          const [product, blogFields] = results[0];
          const [images, imageFields] = results[1];
          res.json({
              products: product[0],
              images: images,
          });
      })
      .catch((err) => {
          console.log(err)
          return res.status(500).json(err);
      });
}); 

// router.delete('/product/:productId', async function (req, res, next) {
//   const conn = await pool.getConnection()
//   await conn.beginTransaction()

//   try {
//       await conn.query('DELETE FROM image WHERE product_id=?;', [req.params.productId])
//       await conn.query('DELETE FROM promotion_product WHERE product_id=?;', [req.params.productId])
//       await conn.query('DELETE FROM product_order_item WHERE product_id=?', [req.params.productId])
//       await conn.query('DELETE FROM order_item WHERE product_id=?', [req.params.productId])
//       await conn.query('DELETE FROM review WHERE product_id=?', [req.params.productId])
//       await conn.query('DELETE FROM product WHERE product_id=?;', [req.params.productId])
//       await conn.commit()
//       res.json({
//           message: 'Delete promotion id ' + req.params.productId + ' complete'
//       })
//   } catch (error) {
//       await conn.rollback()
//       next(error)
//   } finally {
//       console.log('finally')
//       conn.release()
//   }
// });

exports.router = router
