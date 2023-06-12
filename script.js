console.log('connecté !');

//I. For DRAG AND DROP API TO WORK you need to add attributes in the HTML. 'ondrop' will be fired when we drop an element on a valid drop target. 'ondragover' will fire when we drag an item over a drop area. 'draggable' = can be dragged. 'ondragstart' will fire when a user starts to drag an element. 

//II. provide visual feedback to the feedback indicating him that he drags an item

const dragStart = (event) => {
    event.currentTarget.classList.add('dragging')
}

const dragEnd = (event) => {
    event.currentTarget.classList.remove('dragging')
}

document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('dragstart', dragStart)
    card.addEventListener('dragend', dragEnd)
})

//III. On assigne à l'objet dataTransfer 2 propriétés : le contenu HTML de la carte(mime-type) et son ID(payload). The dataTransfer object is used in HTML drag and drop operations to transfer data between the source (the element being dragged) and the target (the element where the dragged item is dropped). "mime type" refers to the type of data being set in the dataTransfer object during a drag event. the mime type 'text/html' indicates that the data being set is in HTML format. The event.currentTarget.outerHTML represents the HTML content of the element being dragged. This allows the dropped element to be recreated with its original HTML structure. the mime type 'text/plain' indicates that the data being set is in plain text format. The event.currentTarget.dataset.id retrieves the value of the id attribute from the element being dragged. This plain text data can be used by the drop target for purposes such as identification or processing.

const drag = (event) => {
    event.dataTransfer.setData('text/html', event.currentTarget.outerHTML);
    event.dataTransfer.setData('text/plain', event.currentTarget.dataset.id)
}

//IV. Inform the user when they drag a card over a column

const dragEnter = (event) =>{
    event.currentTarget.classList.add('drop')
}

const dragLeave = (event) => {
    event.currentTarget.classList.remove('drop')
}

document.querySelectorAll('.column').forEach((column) => {
    column.addEventListener('dragenter', dragEnter)//dragenter: This event will be fired when a draggable element enters a valid drop area.
    column.addEventListener('dragleave', dragLeave)//dragleave: This event will be fired when a draggable element leaves a valid drop area.
})

//V. Add the dragged card to the column

const drop = event => {
    document.querySelectorAll('.column').forEach(column => column.classList.remove('drop'));
    document.querySelector(`[data-id="${event.dataTransfer.getData('text/plain')}"]`).remove();

    event.currentTarget.innerHTML = event.currentTarget.innerHTML + event.dataTransfer.getData('text/html');
};

const allowDrop = event => {
    event.preventDefault();
};