const dragItems = document.querySelectorAll('.drag-item');
const dragWrapper = document.querySelectorAll('.drag-wrapper');


dragItems.forEach(item => {
    item.addEventListener('dragstart', () => {
        item.classList.add('dragging');
    });

    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
    });
});


dragWrapper.forEach(parent => {
    parent.addEventListener('dragover', (e) => {
        const draggable = document.querySelector('.dragging');
        const afterElement = getDragAfterElement(parent, e.clientX);

        if (afterElement == null) {
            parent.append(draggable);
        } else {
            parent.insertBefore(draggable, afterElement);
        }
    });
});

function getDragAfterElement(parent, x) {
    const draggableElements = [...parent.querySelectorAll('.drag-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}