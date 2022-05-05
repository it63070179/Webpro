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

router.get("/product", async function (req, res, next) {
  try {
    const [allproduct, fields] = await pool.query(`SELECT * FROM product`);
    return res.json(allproduct);
  } catch (err) {
    return res.status(500).json(err)
  }
});

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

      req.files.forEach((file) => {
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
  // Query data from 3 tables
  const promise1 = pool.query("SELECT * FROM product WHERE product_id = ?", [req.params.id]);
  const promise2 = pool.query("SELECT * FROM image WHERE product_id = ?", [req.params.id]);
  const promise3 = pool.query("SELECT * FROM product WHERE product_type = 'option'");
  // Use Promise.all() to make sure that all queries are successful
  Promise.all([promise1, promise2, promise3])
    .then((results) => {
      const [product, blogFields] = results[0];
      const [images, imageFields] = results[1];
      const [topping, proFields] = results[2];
      res.json({
        products: product[0],
        images: images,
        topping: topping,
      });
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json(err);
    });
});


router.put('/product/delete/:productId', async function (req, res, next) {
  await pool.query('UPDATE product SET show_status = ? WHERE product_id = ?', ['hide', req.params.productId])
  res.json()
});

router.post('/product/edit/:id', upload.array("myImage"), async function (req, res, next) {
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

    try {
      await conn.query('UPDATE product SET product_name=? WHERE product_id=?', [product_name, req.params.id])
      await conn.query('UPDATE product SET product_desc=? WHERE product_id=?', [product_desc, req.params.id])
      await conn.query('UPDATE product SET product_price=? WHERE product_id=?', [product_price, req.params.id])
      await conn.query('UPDATE product SET product_type=? WHERE product_id=?', [product_type, req.params.id])
      await conn.query('UPDATE product SET product_status=? WHERE product_id=?', [product_status, req.params.id])
      await conn.query('UPDATE product SET product_amount=? WHERE product_id=?', [product_amount, req.params.id])

      const productId = req.params.id;

      req.files.forEach((file) => {
        let path = [productId, file.path.substring(6)];;
        pathArray.push(path);
      });

      await conn.query('DELETE FROM image WHERE product_id=?', [req.params.id])
      await conn.query('INSERT INTO image(product_id, image_path)' + 'VALUES ?',[pathArray])

      conn.commit()
      res.send()
    } catch (err) {
      conn.rollback()
      res.status(400).json(err.toString());
    } finally {
      conn.release()
    }

});

router.post("/product/addpro", async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction();

  const product_name = req.body.product_name
  const product_desc = req.body.product_desc
  const product_price = req.body.product_price
  const product_type = req.body.product_type
  const product_status = req.body.product_status
  const product_amount = req.body.product_amount

  try {
    await conn.query(
      'INSERT INTO product(product_name, product_desc, product_price, product_type, product_status, product_amount)' +
      'VALUES (?, ?, ?, ?, ?, ?)',
      [product_name, product_desc, product_price, product_type, product_status, product_amount]
    )
    conn.commit()
    res.send()
  } catch (err) {
    conn.rollback()
    res.status(400).json(err.toString());
  } finally {
    conn.release()
  }
});



exports.router = router
