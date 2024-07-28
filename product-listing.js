import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const categoryDropdown = document.getElementById('categoryDropdown');
const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
let currentCategory = categoryDropdown.value;
const listing = new ProductList(currentCategory, dataSource, listElement);

categoryDropdown.addEventListener('change', (event) => {
    currentCategory = event.target.value;
    listing.category = currentCategory;
    listing.init();
});

listing.init();

const sliders = [
    { minSlider: "fromSliderTent", maxSlider: "toSliderTent", minInput: "fromInputTent", maxInput: "toInputTent", category: "tent" },
    { minSlider: "fromSliderSleepingBag", maxSlider: "toSliderSleepingBag", minInput: "fromInputSleepingBag", maxInput: "toInputSleepingBag", category: "sleepingbag" },
    { minSlider: "fromSliderBackpack", maxSlider: "toSliderBackpack", minInput: "fromInputBackpack", maxInput: "toInputBackpack", category: "backpack" },
    { minSlider: "fromSliderHammock", maxSlider: "toSliderHammock", minInput: "fromInputHammock", maxInput: "toInputHammock", category: "hammock" }
];

function updateFilters() {
    const filteredProducts = listing.products.filter(product => {
        return sliders.every(slider => {
            if (slider.category !== currentCategory) return true;
            const minPrice = parseInt(document.getElementById(slider.minInput).value) || 0;
            const maxPrice = parseInt(document.getElementById(slider.maxInput).value) || Infinity;
            return product.ListPrice >= minPrice && product.ListPrice <= maxPrice;
        });
    });
    listing.renderList(filteredProducts);
}

sliders.forEach(slider => {
    const minSlider = document.getElementById(slider.minSlider);
    const maxSlider = document.getElementById(slider.maxSlider);
    const minInput = document.getElementById(slider.minInput);
    const maxInput = document.getElementById(slider.maxInput);

    minSlider.addEventListener("input", () => {
        if (slider.category !== currentCategory) return;
        minInput.value = minSlider.value;
        updateFilters();
    });
    maxSlider.addEventListener("input", () => {
        if (slider.category !== currentCategory) return;
        maxInput.value = maxSlider.value;
        updateFilters();
    });
    minInput.addEventListener("input", () => {
        if (slider.category !== currentCategory) return;
        minSlider.value = minInput.value;
        updateFilters();
    });
    maxInput.addEventListener("input", () => {
        if (slider.category !== currentCategory) return;
        maxSlider.value = maxInput.value;
        updateFilters();
    });
});

const showHideButtons = document.querySelectorAll(".show-hide-button");

showHideButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const category = event.target.dataset.category;
        const categoryContainer = document.getElementById(`${category}-category`);
        if (event.target.textContent === "Show Category") {
            event.target.textContent = "Hide Category";
            event.target.style.backgroundColor = "blue";

            // Add category header and products
            const header = document.createElement("h3");
            header.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            header.id = `header-${category}`;
            listElement.appendChild(header);

            const categoryProducts = listing.products.filter(product => product.Category.toLowerCase() === category);
            listing.renderList(categoryProducts);

            updateFilters();
        } else {
            event.target.textContent = "Show Category";
            event.target.style.backgroundColor = "green";

            // Remove category header and products
            const header = document.getElementById(`header-${category}`);
            if (header) {
                header.remove();
            }

            // Clear the product list
            listElement.innerHTML = "";
        }
    });
});
