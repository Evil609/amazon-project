export const orders = JSON.parse(localStorage.getItem('orders')) ||[];

export function addOrder(order){
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders))
}

export function getOrder(orderId){
  let matchingOrder = "";
  orders.forEach((order)=>{
    if(orderId === order.id){
      matchingOrder = order
    }
  })
  return matchingOrder;
}
export function getOrderProduct(orderProducts , productId){
  let matchingOrderProduct = "";
  orderProducts.forEach((product)=>{
    if(productId === product.productId){
      matchingOrderProduct = product
    }
  })
  return matchingOrderProduct;
}