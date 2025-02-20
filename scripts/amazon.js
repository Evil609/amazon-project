import { products ,loadProducts} from "../data/products.js";
import { updateCartQuantity, addToCart } from "../data/cart.js"; 
import { formatCurrency } from "./utils/money.js";

loadProducts(() =>{
  renderProductGrid()
})
function renderProductGrid() {
  let productsHTML = "";
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
            src="${product.image}">
          </div>
          
          <div class="product-name limit-text-to-2-lines">
          ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getImageURL()}">
              <div class="product-rating-count link-primary">
              ${product.rating.count}
              </div>
              </div>
              
              <div class="product-price">
              ${product.getProductPrice()}
              </div>
              
              <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              </select>
              </div>
              
              ${product.extraInfoHTML()}

              <div class="product-spacer"></div>

              
          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          
          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            product.id
          }">
            Add to Cart
          </button>
        </div>
  `;
  document.querySelector(".js-products-grid").innerHTML = productsHTML;
});
updateCartQuantity()

let timeID;
function time(productId) {
  const img = document.querySelector(`.js-added-to-cart-${productId}`);
  img.classList.add("added-to-cart100");
  clearTimeout(timeID);
  timeID = setTimeout(() => {
    img.classList.remove("added-to-cart100");
  }, 2000);
}
document.querySelectorAll(".js-add-to-cart").forEach((add) => {
  add.addEventListener("click", () => {
    const productId = add.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
    time(productId);
  });
});
}

