import { updateCartQuantity , addToCart} from "../data/cart.js";
import { orders } from "../data/orders-data.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatCurrency } from "./utils/money.js";
import { getProductLocally } from "../data/products.js";
updateCartQuantity();
function renderOrderGrid() {
  let orderGridHtml = "";
  orders.forEach((order) => {
    const orderId = order.id;
    const orderDate = dayjs(order.orderTime).format("MMMM D");
    const orderTotalCents = order.totalCostCents;
    orderGridHtml += `
      <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(orderTotalCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderId}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${orderProductHTML(order)}
          </div>
        </div>
      `;
  });
  function orderProductHTML(order){
    let html = "";
    const orderProduct = order.products;
    orderProduct.forEach((product)=>{
      const arriveTime = dayjs(product.estimatedDeliveryTime).format('MMMM D');
      const productId = product.productId;
      const quantity = product.quantity;
      const matchingProduct = getProductLocally(productId);
      html += `
            <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${arriveTime}
              </div>
              <div class="product-quantity">
                Quantity: ${quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message js-buy-again"
                data-product-id=${productId}>Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          `
    })
    return html
  }
  document.querySelector(".js-order-grid").innerHTML = orderGridHtml;
}
renderOrderGrid();
document.querySelectorAll('.js-buy-again').forEach((add)=>{
  add.addEventListener("click", () => {
    const productId = add.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
  });
})