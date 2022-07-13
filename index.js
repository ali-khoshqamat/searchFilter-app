// selectors:
const searchInput = document.querySelector("#search");
const productsDOM = document.querySelector(".products-center");
const btns = document.querySelectorAll(".btn");

let allProductsData = [];
const filters = {
  searchItems: "",
};

// event listeners:
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      allProductsData = res.data;
      // render products to DOM
      renderProducts(res.data, filters);
    })
    .catch((err) => console.log(err));
});

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  filters.searchItems = e.target.value;
  // render products to DOM
  renderProducts(allProductsData, filters);
});

btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const filter = e.target.dataset.filter;
      filters.searchItems = filter;
      // render to DOM
      renderProducts(allProductsData, filters);
    });
  });

// functions:
function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
  });
  // render to DOM
  productsDOM.innerHTML = ``;
  filteredProducts.forEach((item, index) => {
    // create
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("product");
    // content
    productsDiv.innerHTML = `<div class="img-container">
    <img class="product-img" src=${item.image} alt="p-${index}" />
    </div>
    <div class="product-desc">
    <p class="product-price">$ ${item.price}</p>
    <p class="product-title">${item.title}</p>
    </div>`;
    // oppend to .products-center
    productsDOM.appendChild(productsDiv);
  });
}

