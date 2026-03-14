const express = require('express');
const router = express.Router();
const { getOrders, createOrder, updateOrder, deleteOrder, trackOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.get('/track', trackOrders);

router.route('/')
    .get(protect, getOrders)
    .post(createOrder); 

router.route('/:id')
    .put(protect, updateOrder)
    .delete(protect, deleteOrder);

module.exports = router;
