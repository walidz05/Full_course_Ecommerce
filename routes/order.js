const { Router } = require("express");
const router = Router();
const Order = require('../controllers/Order');
const Authorization = require('../services/Authorization')

router.get("/orders/:page", Authorization.authorized, Order.getOrders);

router.get("/order-detail/:id", Authorization.authorized,Order.orderDetails);

router.put("/delivred/:id", Authorization.authorized,Order.delivred);

module.exports = router;
