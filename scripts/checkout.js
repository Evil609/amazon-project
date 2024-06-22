import {
  cart,
  removeProduct,
  updateQuantity,
  updateDeliveryOption,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/delivery-options.js";

const today = dayjs();
function renderOrderSummary() {
  let checkoutProduct = "";
  cart.forEach((item) => {
    const productId = item.productId;

    let matchingProduct = "";
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });
    const deliveryOptionId = item.deliveryOptionId;
    let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    checkoutProduct += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity js-product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${
              matchingProduct.id
            }">${item.quantity}</span>
          </span>
          <span class="update-quantity-link js-update-quantity link-primary"
          data-product-id=${matchingProduct.id}>
            Update
          </span>
          <input class="quantity-input js-input-quantity-${matchingProduct.id}">
          <span class="save-quantity-link link-primary js-save-quantity"
          data-product-id="${matchingProduct.id}">Save</span>
          <span class="delete-quantity-link js-delete-quantity-link link-primary"
          data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
       ${deliveryOptionsHTML(matchingProduct, item)}  
      </div>
    </div>
  </div>
  `;
  });
  function deliveryOptionsHTML(matchingProduct, item) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === item.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option" data-product-id="${
        matchingProduct.id
      }" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${
          isChecked ? "checked" : ""
        } class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Monday, ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
    });
    return html;
  }
  document.querySelector(".js-order-summary").innerHTML = checkoutProduct;
  document.querySelectorAll(".js-delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeProduct(productId);
      console.log(cart);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      updateCartQuantity();
    });
  });
  function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector(
      ".js-return-to-home"
    ).innerHTML = `${cartQuantity} items`;
  }
  updateCartQuantity();

  document.querySelectorAll(`.js-update-quantity`).forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
      const productQuantity = document.querySelector(
        `.js-quantity-label-${productId}`
      ).innerHTML;
      document.querySelector(`.js-input-quantity-${productId}`).value =
        Number(productQuantity);
    });
  });
  document.querySelectorAll(`.js-save-quantity`).forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      saveQuantity(productId);
    });
    link.addEventListener("enter", () => {
      const productId = link.dataset.productId;
      saveQuantity(productId);
    });
  });
  function saveQuantity(productId) {
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove("is-editing-quantity");
    const inputValue = Number(
      document.querySelector(`.js-input-quantity-${productId}`).value
    );
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
      inputValue;
    updateQuantity(productId, inputValue);
    updateCartQuantity();
  }

  document.querySelectorAll(".js-delivery-option").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const deliveryOptionId = link.dataset.deliveryOptionId;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}
renderOrderSummary()