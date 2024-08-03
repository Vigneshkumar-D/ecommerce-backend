
const Order = require('../models/Order');
const calculateTotal = require('../utils/calculateTotal');
const processStripePayment = require('../utils/processStripePayment');
const User = require('../models/User');
module.exports = {
  createOrder: async (req, res) => {
    try {
      const { userId, products } = req.body;

      if (!Array.isArray(products)) {
        return res.status(400).json({ error: 'Products should be an array' });
      }
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const total = calculateTotal(products);

      const order = await Order.create({
        userId,
        products: JSON.stringify(products),
        total,
        paymentStatus: 'pending',
        status: 'pending',
      });

      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  },

  getOrders: async (req, res) => {
    try {
      const orders = await Order.findAll({ where: { userId: req.user.id } });
      res.send(orders);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateOrder: async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findByPk(id);
      if (!order) return res.status(404).send('Order not found');

      await order.update(req.body);
      res.send(order);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteOrder: async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findByPk(id);
      if (!order) return res.status(404).send('Order not found');

      await order.destroy();
      res.send('Order deleted');
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  processPayment: async (req, res) => {
    const { orderId, paymentMethod } = req.body;
    console.log("req", req.body)
    try {
      const order = await Order.findByPk(orderId);
      if (!order) return res.status(404).send('Order not found');

      const amount = Math.ceil(order.total * 100); 
      const currency = 'INR';
      const MIN_AMOUNT_INR = 40 * 100; 
      if (amount < MIN_AMOUNT_INR) {
        return res.status(400).send(`Amount must be at least ${MIN_AMOUNT_INR / 100} INR.`);
      }

      const paymentIntent = await processStripePayment(amount, currency, paymentMethod);
      await order.update({ paymentStatus: 'paid', status: 'completed' });
      res.send(order);
    } catch (error) {
      res.status(500).send(error.message);  
    }
  },
};
