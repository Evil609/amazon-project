export let cart = JSON.parse(localStorage.getItem("cart"));
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

function saveToCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let sameItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      sameItem = item;
    }
  });
  const amount = document.querySelector(
    `.js-quantity-selector-${productId}`
  ).value;
  if (sameItem) {
    sameItem.quantity += parseInt(amount);
  } else {
    cart.push({
      productId: productId,
      quantity: parseInt(amount),
      deliveryOptionId: '1'
    });
  }
  saveToCart();
}

export function removeProduct(productId) {
  const newCart = [];
  cart.forEach((item) => {
    if (item.productId !== productId) {
      newCart.push(item);
    }
  });
  cart = newCart;
  saveToCart();
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

export function updateQuantity(productId, newQuantity){
  let matchingItem;
  cart.forEach((item)=>{
    if(productId === item.productId){
      matchingItem = item;
    }
  })
  matchingItem.quantity = newQuantity;
  saveToCart()
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let sameItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      sameItem = item;
    }
  });

  sameItem.deliveryOptionId = deliveryOptionId;

  saveToCart()
}