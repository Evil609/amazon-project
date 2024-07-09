import { loadCart } from "../data/cart.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/car.js";
// import '../data/backend-practice.js';

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(()=>{
      resolve();
    }); 
  })
]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
/*
loadProducts(() =>{
  loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary();
  })
})
*/
