// budget_friendly.js

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
            const minRange = wrapper.querySelector('.range-min');
            const maxRange = wrapper.querySelector('.range-max');
            const removeButton = wrapper.querySelector('.remove-category');
            
            const minVal = parseFloat(minRange.value);
            const maxVal = parseFloat(maxRange.value);

            if (!removeButton.classList.contains('restored')) {
                minBudget += parseFloat(minRange.min);
                maxBudget += parseFloat(maxRange.max);
                selectedMin += minVal;
                selectedMax += maxVal;
            }
        });

        minBudgetEl.textContent = `$${minBudget.toFixed(2)}`;
        maxBudgetEl.textContent = `$${maxBudget.toFixed(2)}`;
        selectedBudgetEl.textContent = `$${selectedMin.toFixed(2)} - $${selectedMax.toFixed(2)}`;
    }

    function updateRange(minEl, maxEl, rangeEl) {
        const minVal = parseFloat(minEl.value);
        const maxVal = parseFloat(maxEl.value);

        const minPercent = ((minVal - parseFloat(minEl.min)) / (parseFloat(maxEl.max) - parseFloat(minEl.min))) * 100;
        const maxPercent = ((maxVal - parseFloat(minEl.min)) / (parseFloat(maxEl.max) - parseFloat(minEl.min))) * 100;

        rangeEl.style.left = `${minPercent}%`;
        rangeEl.style.width = `${maxPercent - minPercent}%`;
        updateBudget();
    }

    document.querySelectorAll('.range-min, .range-max').forEach(input => {
        input.addEventListener('input', function () {
            const wrapper = this.closest('.category-wrapper');
            const minEl = wrapper.querySelector('.range-min');
            const maxEl = wrapper.querySelector('.range-max');
            const rangeEl = wrapper.querySelector('.slider-range');
            updateRange(minEl, maxEl, rangeEl);
        });
    });

    document.querySelectorAll('.remove-category').forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('restored');
            const wrapper = this.closest('.category-wrapper');
            const minEl = wrapper.querySelector('.range-min');
            const maxEl = wrapper.querySelector('.range-max');
            const rangeEl = wrapper.querySelector('.slider-range');

            if (this.classList.contains('restored')) {
                this.textContent = 'Restore';
                minEl.disabled = true;
                maxEl.disabled = true;
                rangeEl.style.background = '#ddd';
            } else {
                this.textContent = 'Remove';
                minEl.disabled = false;
                maxEl.disabled = false;
                rangeEl.style.background = '#007bff';
            }
            updateRange(minEl, maxEl, rangeEl);
        });
    });

    let dragSrcEl = null;

    function handleDragStart(e) {
        if (e.target.classList.contains('drag-handle')) {
            dragSrcEl = this;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
            this.classList.add('dragging');
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDrop(e) {
        e.preventDefault();
        if (dragSrcEl !== this && e.target.classList.contains('drag-handle')) {
            const srcHtml = dragSrcEl.innerHTML;
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = srcHtml;
            updateEventListeners();
        }
        this.classList.remove('dragging');
    }

    function handleDragEnd() {
        this.classList.remove('dragging');
        updateBudget(); // Re-calculate budgets after reordering categories.
    }

    function updateEventListeners() {
        document.querySelectorAll('.drag-handle').forEach(handle => {
            handle.addEventListener('dragstart', handleDragStart);
            handle.addEventListener('dragover', handleDragOver);
            handle.addEventListener('drop', handleDrop);
            handle.addEventListener('dragend', handleDragEnd);
        });

        document.querySelectorAll('.range-min, .range-max').forEach(input => {
            input.addEventListener('input', function () {
                const wrapper = this.closest('.category-wrapper');
                const minEl = wrapper.querySelector('.range-min');
                const maxEl = wrapper.querySelector('.range-max');
                const rangeEl = wrapper.querySelector('.slider-range');
                updateRange(minEl, maxEl, rangeEl);
            });
        });
    }

    updateEventListeners(); // Apply event listeners initially.
});
