const express = require("express")
var cors = require('cors')
const path = require("path")

const app = express();
app.use(cors({
  origin:true,
  credentials:true
}))
// Statics
app.use(express.static('static'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const productRouter = require('./routes/product')
const signupuserRouter = require('./routes/signupuser')

app.use(productRouter.router)
app.use(signupuserRouter.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})
