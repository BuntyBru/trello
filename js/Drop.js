const Drop = (startListName, draggedElement, endListName) => {
  trelloBoard.listArray.forEach((x) => {
    if (x.id == startListName) {
      let newElement = new Card(
        draggedElement.id,
        draggedElement.name,
        draggedElement.parent,
        draggedElement.desc
      );
      x.deleteCardElements(
        newElement,
        document.getElementById("card-list" + draggedElement.parent)
      );
    }
  });

  trelloBoard.listArray.forEach((x) => {
    if (x.id == endListName) {
      draggedElement.parent = endListName;
      x.cards.unshift(draggedElement);
      let newElement = new Card(
        draggedElement.id,
        draggedElement.name,
        draggedElement.parent,
        draggedElement.desc
      );

      x.renderEntries(newElement);
    }
  });
};
