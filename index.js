const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3010;
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = newItemPrice + cartTotal;
  res.send(String(result));
});

function checkMembership(cartTotal, isMember) {
  if (isMember === true) {
    return cartTotal - (cartTotal * discountPercentage) / 100;
  }
  return cartTotal;
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let result = checkMembership(cartTotal, isMember);
  res.send(String(result));
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = (cartTotal / 100) * taxRate;
  res.send(String(tax));
});

function checkdeliverytime(shippingMethod, distance) {
  if (shippingMethod === 'Express') {
    return distance / 100;
  }
  return distance / 50;
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let result = checkdeliverytime(shippingMethod, distance);
  res.send(String(result));
});

app.get('/shipping-cost', (req, res) => {
  let weight = distance(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(String(shippingCost));
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let result = purchaseAmount * loyaltyRate;
  res.send(String(result));
});
