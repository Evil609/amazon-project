import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";

export class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.loadFromStorage()
  }
  loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: '2'
        },
      ];
    }
  };
  saveToCart() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  };
  addToCart(productId) {
    let sameItem;
    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        sameItem = item;
      }
    });
    const amount = document.querySelector(`.js-quantity-selector-${productId}`).value;
    console.log(amount)
    if (sameItem) {
      sameItem.quantity += parseInt(amount);
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: parseInt(amount),
        deliveryOptionId: '1'
      });
    }
    this.saveToCart();
  };
  removeProduct(productId) {
    const newCart = [];
    this.cartItems.forEach((item) => {
      if (item.productId !== productId) {
        newCart.push(item);
      }
    });
    this.cartItems = newCart;
    this.saveToCart();
  };
  updateCartQuantity() {
    let cartQuantity = 0;
  
    this.cartItems.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    return cartQuantity;
  };
  updateQuantity(productId, newQuantity){
    let matchingItem;
    this.cartItems.forEach((item)=>{
      if(productId === item.productId){
        matchingItem = item;
      }
    })
    matchingItem.quantity = newQuantity;
    this.saveToCart();
    renderPaymentSummary();
    renderOrderSummary();
  };
  updateDeliveryOption(productId, deliveryOptionId) {
    let sameItem;
    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        sameItem = item;
      }
    });
  
    sameItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToCart()
  };
  updateCheckoutQuantity() {
    let cartQuantity = 0;
  
    this.cartItems.forEach((item) => {
      cartQuantity += item.quantity;
    });
  
    return cartQuantity
  }
}