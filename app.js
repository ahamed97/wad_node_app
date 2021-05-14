const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors");
const mongoose = require("mongoose")
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = {
  swaggerDefinition: {
    components: {
   
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'authorization',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },
    },
    security: [{
      bearerAuth: []
    }],
    info: {
      title: "Shopping Cart API",
      version: '1.0.0',
    }
    
  },
  
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

dotenv.config();
const port = process.env.PORT
const dbUrl = process.env.DB_URL
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


const verifyToken = require("./middlewares/auth");
const verifyIsAdmin = require("./middlewares/admin");
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')
const customerRoutes = require('./routes/customer')
const socialRoutes = require('./routes/social')
const orderRoutes = require('./routes/order')

app.use('/api/admin',verifyToken,verifyIsAdmin,adminRoutes)
app.use('/api',authRoutes)
app.use('/api/customer', verifyToken, customerRoutes)
app.use('/api/social', socialRoutes)
app.use('/api/customer/orders',verifyToken,orderRoutes)


app.get('/', (req, res) => {
  res.status(200).send('initial setup')
})

app.get('/auth', verifyToken, (req, res) => {
  res.status(200).send('test auth route')
})

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})