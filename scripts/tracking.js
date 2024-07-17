import {getProductLocally} from "../data/products.js"
import { getOrder , getOrderProduct } from "../data/orders-data.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { updateCartQuantity } from "../data/cart.js"
updateCartQuantity()
const url = new URL(window.location.href)
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');
const matchingOrder = getOrder(orderId)
const matchingProduct = getProductLocally(productId)
const orderProducts = matchingOrder.products
const matchingOrderProduct = getOrderProduct(orderProducts , productId)
const arrivingTime = dayjs(matchingOrderProduct.estimatedDeliveryTime).format('dddd, MMMM D');
const quantity = matchingOrderProduct.quantity
function renderTrackingHtml(){
  let productHtml = `
    <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${arrivingTime}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
  `;
  document.querySelector('.js-order-tracking').innerHTML = productHtml
}
renderTrackingHtml()