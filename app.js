require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const { sequelize, connectDB } = require('./src/config/db'); 
const sync = require('./sync'); 
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const orderRoutes = require('./src/routes/orders');
const cartRoutes = require('./src/routes/cart');
const sessionRoutes = require('./src/routes/sessions');
const { swaggerSetup, swaggerUiSetup } = require('./src/config/swagger');
const initializeUsers = require('./initializeUsers');
const app = express();


const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://clickshopify.netlify.app', 'http://192.168.0.75:3001' ], 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};


app.use(cors(corsOptions)); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use('/api-docs', swaggerSetup, swaggerUiSetup);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/sessions', sessionRoutes);



app.use((err, req, res, next) => {
  console.log(req.body);
  
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


(async () => {
  try {
    await initializeUsers();
  } catch (error) {
    console.error('Error initializing users:', error);
  }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  
  try {
    await sync(); 
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
  
  try {
    await connectDB();
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
