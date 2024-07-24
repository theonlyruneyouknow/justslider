function controlFromInput(fromSlider, fromInput, toInput, controlSlider, category) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromSlider.value = from;
    }
    updateSelectedBudget();
}

function controlToInput(toSlider, fromInput, toInput, controlSlider, category) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
    }
    updateSelectedBudget();
}

function controlFromSlider(fromSlider, toSlider, fromInput, category) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromInput.value = from;
  }
  updateSelectedBudget();
}

function controlToSlider(fromSlider, toSlider, toInput, category) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  setToggleAccessible(toSlider);
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
    toSlider.value = from;
  }
  updateSelectedBudget();
}

function getParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max-to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
      ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
      ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
  const toSlider = document.querySelector(`#${currentTarget.id.replace('from', 'to')}`);
  if (Number(currentTarget.value) <= 0 ) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
}

function updateSelectedBudget() {
  const fromSliders = document.querySelectorAll('[id^=fromSlider]');
  const toSliders = document.querySelectorAll('[id^=toSlider]');
  
  let minSum = 0;
  let maxSum = 0;

  fromSliders.forEach(slider => minSum += parseInt(slider.value, 10));
  toSliders.forEach(slider => maxSum += parseInt(slider.value, 10));

  const selectedBudget = document.querySelector('#selected-budget');
  selectedBudget.textContent = `$${minSum} - $${maxSum}`;
}

const categories = ['Tent', 'SleepingBag', 'Backpack', 'Hammock'];

categories.forEach(category => {
  const fromSlider = document.querySelector(`#fromSlider${category}`);
  const toSlider = document.querySelector(`#toSlider${category}`);
  const fromInput = document.querySelector(`#fromInput${category}`);
  const toInput = document.querySelector(`#toInput${category}`);

  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  setToggleAccessible(toSlider);

  fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput, category);
  toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput, category);
  fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider, category);
  toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider, category);
});
