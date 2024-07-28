import { renderListWithTemplate, renderWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.ListPrice}</p>
      </a>
      <button id="${product.Id}" class="preview">Quick View</button>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    console.log('Fetching products for category:', this.category);
    this.products = await this.dataSource.getData(this.category);
    console.log('Products fetched:', this.products);
    this.renderList(this.products);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "beforeend"
    );
  }

  filterByPrice(minPrice, maxPrice) {
    console.log(`Filtering products between $${minPrice} and $${maxPrice}`);
    const filteredProducts = this.products.filter(product => {
      return product.ListPrice >= minPrice && product.ListPrice <= maxPrice;
    });
    console.log('Filtered Products:', filteredProducts);
    this.renderList(filteredProducts);
  }
}
