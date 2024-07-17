import {
  cart,
  emptyTheCart,
  removeProduct,
  updateCheckoutQuantity,
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/delivery-options.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders-data.js";
export function renderPaymentSummary() {
  let productPriceCents = 0;
  let deliveryPriceCents = 0;
  cart.forEach((item) => {
    const product = getProduct(item.productId);
    productPriceCents += product.priceCents * item.quantity;

    const deliveryOption = getDeliveryOption(item.deliveryOptionId);
    deliveryPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = productPriceCents + deliveryPriceCents;
  const estimatedTaxCents = Math.round(totalBeforeTaxCents / 10);
  const totalOrderCents = totalBeforeTaxCents + estimatedTaxCents;
  const cartQuantity = updateCheckoutQuantity();
  const paymentSummaryHTML = `
  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              deliveryPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              estimatedTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalOrderCents
            )}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });

        const order = await response.json();
        addOrder(order);
        emptyTheCart();
      } catch (error) {
        console.log("Unexpected error");
      }

      window.location.href = "orders.html";
    });
}
