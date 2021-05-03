const express = require('express')
const dotenv = require('dotenv');
const mongoose = require("mongoose")

dotenv.config();
const app = express()
app.use(express.json())
const port = process.env.PORT
const  DB_URL = process.env.DB_URL

app.get('/', (req, res) => {
  res.send('initial setup')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}