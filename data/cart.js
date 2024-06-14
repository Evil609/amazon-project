export const cart =[];
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
    });
  }
}
