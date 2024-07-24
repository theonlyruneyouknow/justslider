document.addEventListener("DOMContentLoaded", function() {
    const toggleButtons = document.querySelectorAll(".toggle-button");
    const showHideButtons = document.querySelectorAll(".show-hide-button");
    const selectedBudgetSpan = document.getElementById("selected-budget");

    let selectedBudget = {
        min: parseInt(document.getElementById("min-budget").textContent.replace('$', '')),
        max: parseInt(document.getElementById("max-budget").textContent.replace('$', ''))
    };

    function updateSelectedBudget() {
        const rangeContainers = document.querySelectorAll(".range_container");
        let totalMin = 0, totalMax = 0;
        rangeContainers.forEach(container => {
            const fromInput = container.querySelector('input[type="number"][id^="fromInput"]');
            const toInput = container.querySelector('input[type="number"][id^="toInput"]');
            if (fromInput && toInput) {
                totalMin += parseInt(fromInput.value);
                totalMax += parseInt(toInput.value);
            }
        });
        selectedBudgetSpan.textContent = `$${totalMin} - $${totalMax}`;
    }

    toggleButtons.forEach(button => {
        const category = button.closest('.range_container');
        const sliders = category.querySelectorAll('input[type="range"]');
        const inputs = category.querySelectorAll('input[type="number"]');
        const slidersContainer = category.querySelector('.sliders_buttons_container');
        const formContainer = category.querySelector('.form_buttons_container');

        let storedValues = {
            sliders: [],
            inputs: []
        };

        button.addEventListener("click", function() {
            if (button.textContent === "Remove") {
                button.textContent = "Restore";
                button.style.backgroundColor = '#28a745'; // Change to green

                // Store current values
                storedValues.sliders = Array.from(sliders).map(slider => slider.value);
                storedValues.inputs = Array.from(inputs).map(input => input.value);

                // Set values to 0 and gray out containers
                sliders.forEach(slider => slider.value = 0);
                inputs.forEach(input => input.value = 0);
                slidersContainer.style.opacity = 0.5;
                formContainer.style.opacity = 0.5;
                slidersContainer.style.pointerEvents = 'none';
                formContainer.style.pointerEvents = 'none';

                // Update selected budget
                updateSelectedBudget();
            } else {
                button.textContent = "Remove";
                button.style.backgroundColor = '#dc3545'; // Change to red

                // Restore stored values
                sliders.forEach((slider, index) => slider.value = storedValues.sliders[index]);
                inputs.forEach((input, index) => input.value = storedValues.inputs[index]);
                slidersContainer.style.opacity = 1;
                formContainer.style.opacity = 1;
                slidersContainer.style.pointerEvents = 'all';
                formContainer.style.pointerEvents = 'all';

                // Update selected budget
                updateSelectedBudget();
            }
        });

        // Initial state
        button.style.backgroundColor = '#dc3545'; // Initial red color
    });

    showHideButtons.forEach(button => {
        button.textContent = "Show Category"; // Initial state
        button.style.backgroundColor = '#28a745'; // Initial green color
        button.addEventListener("click", function() {
            if (button.textContent === "Show Category") {
                button.textContent = "Hide Category";
                button.style.backgroundColor = '#007bff'; // Change to blue
            } else {
                button.textContent = "Show Category";
                button.style.backgroundColor = '#28a745'; // Change to green
            }
        });
    });
});
