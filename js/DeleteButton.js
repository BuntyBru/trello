const deleteElems = (type, entry, arrayElem, UI) => {
  let removedIndex = 0;
  arrayElem.forEach((x, index) => {
    if (x.id == entry.id) {
      removedIndex = index;
    }
  });
  arrayElem.splice(removedIndex, 1);
  type == "card"
    ? UI.removeChild(UI.childNodes[removedIndex])
    : UI.removeChild(UI.childNodes[removedIndex + 1]);
  Storage.addItems(trelloBoard);
};
