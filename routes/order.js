const { Router } = require("express");
const router = Router();
const Order = require('../controllers/Order');
const Authorization = require('../services/Authorization')

router.get("/orders", Authorization.authorized, Order.getOrders);

router.get("/order-detail/:id", Authorization.authorized,Order.orderDetails);

router.put("/delivred", Authorization.authorized,Order.delivred);

router.post("/create-review", Authorization.authorized, Order.createReview);




module.exports = router;
