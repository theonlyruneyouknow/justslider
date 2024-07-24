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
            
            const minVal = parseInt(minRange.value, 10);
            const maxVal = parseInt(maxRange.value, 10);

            if (!removeButton.classList.contains('restored')) {
                minBudget += parseInt(minRange.min, 10);
                maxBudget += parseInt(maxRange.max, 10);
                selectedMin += minVal;
                selectedMax += maxVal;
            }
        });

        minBudgetEl.textContent = `$${minBudget}`;
        maxBudgetEl.textContent = `$${maxBudget}`;
        selectedBudgetEl.textContent = `$${selectedMin} - $${selectedMax}`;
    }

    function updateRange(minEl, maxEl, rangeEl) {
        const minVal = parseInt(minEl.value, 10);
        const maxVal = parseInt(maxEl.value, 10);
        if (maxVal - minVal < 0) {
            if (minEl.classList.contains('range-min')) {
                minEl.value = maxVal;
            } else {
                maxEl.value = minVal;
            }
        } else {
            rangeEl.style.left = `${(minVal / minEl.max) * 100}%`;
            rangeEl.style.width = `${((maxVal - minVal) / minEl.max) * 100}%`;
        }
        updateBudget();
    }

    document.querySelectorAll('.range-min, .range-max').forEach(input => {
        input.addEventListener('input', (e) => {
            const wrapper = e.target.closest('.category-wrapper');
            const minEl = wrapper.querySelector('.range-min');
            const maxEl = wrapper.querySelector('.range-max');
            const rangeEl = wrapper.querySelector('.slider-range');
            updateRange(minEl, maxEl, rangeEl);
        });
    });

    document.querySelectorAll('.remove-category').forEach(button => {
        button.addEventListener('click', () => {
            const wrapper = button.closest('.category-wrapper');
            button.classList.toggle('restored');
            button.textContent = button.classList.contains('restored') ? 'Restore' : 'Remove';
            updateBudget();
        });
    });

    let dragSrcEl = null;

    function handleDragStart(e) {
        dragSrcEl = this.closest('.category-wrapper');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.closest('.category-wrapper').innerHTML);
        dragSrcEl.classList.add('dragging');
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (dragSrcEl !== this.closest('.category-wrapper')) {
            dragSrcEl.innerHTML = this.closest('.category-wrapper').innerHTML;
            this.closest('.category-wrapper').innerHTML = e.dataTransfer.getData('text/html');
            updateEventListeners();
        }
        dragSrcEl.classList.remove('dragging');
        return false;
    }

    function updateEventListeners() {
        const categories = document.querySelectorAll('.category-wrapper');
        categories.forEach(category => {
            category.removeEventListener('dragstart', handleDragStart);
            category.removeEventListener('dragover', handleDragOver);
            category.removeEventListener('drop', handleDrop);

            category.addEventListener('dragstart', handleDragStart);
            category.addEventListener('dragover', handleDragOver);
            category.addEventListener('drop', handleDrop);

            const minEl = category.querySelector('.range-min');
            const maxEl = category.querySelector('.range-max');
            const rangeEl = category.querySelector('.slider-range');
            updateRange(minEl, maxEl, rangeEl);
        });
    }

    document.querySelectorAll('.drag-handle').forEach(handle => {
        handle.addEventListener('dragstart', handleDragStart);
    });

    updateEventListeners();

    document.querySelectorAll('.category-wrapper').forEach(wrapper => {
        const minEl = wrapper.querySelector('.range-min');
        const maxEl = wrapper.querySelector('.range-max');
        const rangeEl = wrapper.querySelector('.slider-range');
        updateRange(minEl, maxEl, rangeEl);
    });
});
