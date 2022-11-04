const {Router} = require('express');
const router = Router();
const express = require('express');
const Payement = require('../controllers/Payment');
const Authorization = require("../services/Authorization");

router.post(
  "/create-checkout-session",
  Authorization.authorized,
  Payement.CheckoutSission
),

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  Authorization.authorized,
  Payement.CheckoutCompleted
);

router.get('/verify-payment/:id',
Authorization.authorized,
Payement.verifyPayment);

module.exports = router;