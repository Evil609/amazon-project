import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
export let cart;
loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) {
    cart = [
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
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let sameItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      sameItem = item;
    }
  });
  let amount = 0;
  if(document.querySelector(`.js-quantity-selector-${productId}`) === null){
    amount = 1;
  }else{
    amount = document.querySelector(`.js-quantity-selector-${productId}`).value;
  }
  if (sameItem) {
    sameItem.quantity += parseInt(amount);
  } else {
    cart.push({
      productId: productId,
      quantity: parseInt(amount),
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

export function removeProduct(productId) {
  const newCart = [];
  cart.forEach((item) => {
    if (item.productId !== productId) {
      newCart.push(item);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity){
  let matchingItem;
  cart.forEach((item)=>{
    if(productId === item.productId){
      matchingItem = item;
    }
  })
  matchingItem.quantity = newQuantity;
  saveToStorage();
  renderPaymentSummary();
  renderOrderSummary();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let sameItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      sameItem = item;
    }
  });

  sameItem.deliveryOptionId = deliveryOptionId;

  saveToStorage()
}
export function updateCheckoutQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity
}
export function loadCart(fun){
  const xhr =  new XMLHttpRequest();

  xhr.addEventListener('load', ()=>{
    fun();
  })

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send()
}

export function emptyTheCart(){
  cart = [];
  saveToStorage()
}