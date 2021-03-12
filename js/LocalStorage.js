class Storage {
  static fillList() {
    let trelloBoardStorage;
    if (localStorage.getItem("trelloBoard") == null) {
      return new Trello();
    } else {
      trelloBoardStorage = JSON.parse(localStorage.getItem("trelloBoard"));
    }
    return Storage.ClassConverter(trelloBoardStorage);
  }

  static addItems(item) {
    localStorage.setItem("trelloBoard", JSON.stringify(item));
  }

  static ClassConverter(item) {
    let returnedItem = new Trello();

    item.listArray.forEach((x) => {
      let listItem = new List(x.name, x.id);
      x.cards.forEach((y) => {
        let cardItem = new Card(y.id, y.name, y.parent, y.desc);
        listItem.cards.push(cardItem);
      });
      listItem.id = x.id;
      listItem.cardID = x.cardID;
      returnedItem.listArray.push(listItem);
      returnedItem.id = item.id + 1;
    });

    return returnedItem;
  }
}
