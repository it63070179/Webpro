const express = require("express")
var cors = require('cors')
const path = require("path")

const app = express();
app.use(cors())
// Statics
app.use(express.static('static'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const signupuserRouter = require('./routes/user')
const promotionRouter = require('./routes/promotion')
const productRouter = require('./routes/product')
const orderitemRouter = require('./routes/orderitem')
const reviewRouter = require('./routes/review')



app.use(signupuserRouter.router)
app.use(promotionRouter.router)
app.use(productRouter.router)
app.use(orderitemRouter.router)
app.use(reviewRouter.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})
