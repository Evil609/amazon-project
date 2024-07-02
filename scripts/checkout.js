import { loadProducts } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/car.js";
// import '../data/backend-practice.js';
loadProducts(() =>{
    renderOrderSummary();
  renderPaymentSummary();
})