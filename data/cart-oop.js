import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
function Cart (localStorageKey){
  const cart ={
    cartItems: undefined,
    loadFromStorage: function(){
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
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
    },
    saveToCart() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    addToCart(productId) {
      let sameItem;
      this.cartItems.forEach((item) => {
        if (productId === item.productId) {
          sameItem = item;
        }
      });
      let amount = document.querySelector(`.js-quantity-selector-${productId}`).value;
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
    },
    removeProduct(productId) {
      const newCart = [];
      this.cartItems.forEach((item) => {
        if (item.productId !== productId) {
          newCart.push(item);
        }
      });
      this.cartItems = newCart;
      this.saveToCart();
    },
    updateCartQuantity() {
      let cartQuantity = 0;
    
      this.cartItems.forEach((item) => {
        cartQuantity += item.quantity;
      });
      document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
      return cartQuantity;
    },
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
    },
    updateDeliveryOption(productId, deliveryOptionId) {
      let sameItem;
      this.cartItems.forEach((item) => {
        if (productId === item.productId) {
          sameItem = item;
        }
      });
    
      sameItem.deliveryOptionId = deliveryOptionId;
    
      this.saveToCart()
    },
    updateCheckoutQuantity() {
      let cartQuantity = 0;
    
      this.cartItems.forEach((item) => {
        cartQuantity += item.quantity;
      });
    
      return cartQuantity
    }
  }
  return cart;
}
const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage()
cart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add')
console.log(cart)