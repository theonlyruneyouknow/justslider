document.addEventListener("DOMContentLoaded", function() {
    const dragButtons = document.querySelectorAll('.drag-button');

    dragButtons.forEach(button => {
        button.addEventListener('dragstart', () => {
            const container = button.closest('.range_container');
            container.classList.add('dragging');
        });

        button.addEventListener('dragend', () => {
            const container = button.closest('.range_container');
            container.classList.remove('dragging');
            container.classList.remove('dragging-over');
        });
    });

    const mainContent = document.querySelector('.content');

    mainContent.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(mainContent, e.clientY);
        const draggingContainer = document.querySelector('.dragging');
        if (afterElement == null) {
            mainContent.appendChild(draggingContainer);
        } else {
            mainContent.insertBefore(draggingContainer, afterElement);
        }

        const allContainers = document.querySelectorAll('.range_container');
        allContainers.forEach(container => {
            if (container !== draggingContainer) {
                container.classList.add('dragging-over');
            }
        });
    });

    mainContent.addEventListener('dragleave', () => {
        const allContainers = document.querySelectorAll('.range_container');
        allContainers.forEach(container => {
            container.classList.remove('dragging-over');
        });
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.range_container:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});
