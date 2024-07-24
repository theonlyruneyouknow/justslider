// script.js

document.addEventListener('DOMContentLoaded', () => {
    const minBudgetEl = document.getElementById('min-budget');
    const maxBudgetEl = document.getElementById('max-budget');
    const selectedBudgetEl = document.getElementById('selected-budget');

    function updateBudget() {
        let minBudget = 0;
        let maxBudget = 0;
        let selectedMin = 0;
        let selectedMax = 0;

        document.querySelectorAll('.category-wrapper').forEach(wrapper => {
            const fromSlider = wrapper.querySelector('.range-min');
            const toSlider = wrapper.querySelector('.range-max');
            const fromInput = wrapper.querySelector('.form_control_container__time__input#fromInput');
            const toInput = wrapper.querySelector('.form_control_container__time__input#toInput');
            const removeButton = wrapper.querySelector('.remove-category');
            
            const minVal = parseFloat(fromSlider.value);
            const maxVal = parseFloat(toSlider.value);

            if (!removeButton.classList.contains('restored')) {
                minBudget += parseFloat(fromSlider.min);
                maxBudget += parseFloat(toSlider.max);
                selectedMin += minVal;
                selectedMax += maxVal;
            }
        });

        minBudgetEl.textContent = `$${minBudget.toFixed(2)}`;
        maxBudgetEl.textContent = `$${maxBudget.toFixed(2)}`;
        selectedBudgetEl.textContent = `$${selectedMin.toFixed(2)} - $${selectedMax.toFixed(2)}`;
    }

    function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
        const [from, to] = getParsed(fromInput, toInput);
        fillSlider(fromInput, toInput, 'darkgreen', 'darkblue', controlSlider);
        if (from > to) {
            fromSlider.value = to;
            fromInput.value = to;
        } else {
            fromSlider.value = from;
        }
    }
    
    function controlToInput(toSlider, fromInput, toInput, controlSlider) {
        const [from, to] = getParsed(fromInput, toInput);
        fillSlider(fromInput, toInput, 'darkgreen', 'darkblue', controlSlider);
        setToggleAccessible(toInput);
        if (from <= to) {
            toSlider.value = to;
            toInput.value = to;
        } else {
            toInput.value = from;
        }
    }

    function controlFromSlider(fromSlider, toSlider, fromInput) {
        const [from, to] = getParsed(fromSlider, toSlider);
        fillSlider(fromSlider, toSlider, 'darkgreen', 'darkblue', toSlider);
        if (from > to) {
            fromSlider.value = to;
            fromInput.value = to;
        } else {
            fromInput.value = from;
        }
    }

    function controlToSlider(fromSlider, toSlider, toInput) {
        const [from, to] = getParsed(fromSlider, toSlider);
        fillSlider(fromSlider, toSlider, 'darkgreen', 'darkblue', toSlider);
        setToggleAccessible(toSlider);
        if (from <= to) {
            toSlider.value = to;
            toInput.value = to;
        } else {
            toInput.value = from;
            toSlider.value = from;
        }
    }

    function getParsed(currentFrom, currentTo) {
        const from = parseInt(currentFrom.value, 10);
        const to = parseInt(currentTo.value, 10);
        return [from, to];
    }

    function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
        const rangeDistance = to.max - to.min;
        const fromPosition = from.value - to.min;
        const toPosition = to.value - to.min;
        controlSlider.style.background = `linear-gradient(
          to right,
          ${sliderColor} 0%,
          ${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
          ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
          ${rangeColor} ${(toPosition) / (rangeDistance) * 100}%,
          ${sliderColor} ${(toPosition) / (rangeDistance) * 100}%,
          ${sliderColor} 100%)`;
    }

    function setToggleAccessible(currentTarget) {
        const toSlider = document.querySelector('#toSlider');
        if (Number(currentTarget.value) <= 0) {
            toSlider.style.zIndex = 2;
        } else {
            toSlider.style.zIndex = 0;
        }
    }

    const tentFromSlider = document.querySelector('#tent-fromSlider');
    const tentToSlider = document.querySelector('#tent-toSlider');
    const tentFromInput = document.querySelector('#tent-fromInput');
    const tentToInput = document.querySelector('#tent-toInput');
    fillSlider(tentFromSlider, tentToSlider, 'darkgreen', 'darkblue', tentToSlider);
    setToggleAccessible(tentToSlider);

    tentFromSlider.oninput = () => controlFromSlider(tentFromSlider, tentToSlider, tentFromInput);
    tentToSlider.oninput = () => controlToSlider(tentFromSlider, tentToSlider, tentToInput);
    tentFromInput.oninput = () => controlFromInput(tentFromSlider, tentFromInput, tentToInput, tentToSlider);
    tentToInput.oninput = () => controlToInput(tentToSlider, tentFromInput, tentToInput, tentToSlider);

    const sleepingBagFromSlider = document.querySelector('#sleepingbag-fromSlider');
    const sleepingBagToSlider = document.querySelector('#sleepingbag-toSlider');
    const sleepingBagFromInput = document.querySelector('#sleepingbag-fromInput');
    const sleepingBagToInput = document.querySelector('#sleepingbag-toInput');
    fillSlider(sleepingBagFromSlider, sleepingBagToSlider, 'darkgreen', 'darkblue', sleepingBagToSlider);
    setToggleAccessible(sleepingBagToSlider);

    sleepingBagFromSlider.oninput = () => controlFromSlider(sleepingBagFromSlider, sleepingBagToSlider, sleepingBagFromInput);
    sleepingBagToSlider.oninput = () => controlToSlider(sleepingBagFromSlider, sleepingBagToSlider, sleepingBagToInput);
    sleepingBagFromInput.oninput = () => controlFromInput(sleepingBagFromSlider, sleepingBagFromInput, sleepingBagToInput, sleepingBagToSlider);
    sleepingBagToInput.oninput = () => controlToInput(sleepingBagToSlider, sleepingBagFromInput, sleepingBagToInput, sleepingBagToSlider);

    const backpackFromSlider = document.querySelector('#backpack-fromSlider');
    const backpackToSlider = document.querySelector('#backpack-toSlider');
    const backpackFromInput = document.querySelector('#backpack-fromInput');
    const backpackToInput = document.querySelector('#backpack-toInput');
    fillSlider(backpackFromSlider, backpackToSlider, 'darkgreen', 'darkblue', backpackToSlider);
    setToggleAccessible(backpackToSlider);

    backpackFromSlider.oninput = () => controlFromSlider(backpackFromSlider, backpackToSlider, backpackFromInput);
    backpackToSlider.oninput = () => controlToSlider(backpackFromSlider, backpackToSlider, backpackToInput);
    backpackFromInput.oninput = () => controlFromInput(backpackFromSlider, backpackFromInput, backpackToInput, backpackToSlider);
    backpackToInput.oninput = () => controlToInput(backpackToSlider, backpackFromInput, backpackToInput, backpackToSlider);

    const hammockFromSlider = document.querySelector('#hammock-fromSlider');
    const hammockToSlider = document.querySelector('#hammock-toSlider');
    const hammockFromInput = document.querySelector('#hammock-fromInput');
    const hammockToInput = document.querySelector('#hammock-toInput');
    fillSlider(hammockFromSlider, hammockToSlider, 'darkgreen', 'darkblue', hammockToSlider);
    setToggleAccessible(hammockToSlider);

    hammockFromSlider.oninput = () => controlFromSlider(hammockFromSlider, hammockToSlider, hammockFromInput);
    hammockToSlider.oninput = () => controlToSlider(hammockFromSlider, hammockToSlider, hammockToInput);
    hammockFromInput.oninput = () => controlFromInput(hammockFromSlider, hammockFromInput, hammockToInput, hammockToSlider);
    hammockToInput.oninput = () => controlToInput(hammockToSlider, hammockFromInput, hammockToInput, hammockToSlider);
});
