class List {
  constructor(name, id) {
    this.name = name;
    this.cards = [];
    this.id = id;
    this.cardID = 0;
  }

  addCards() {
    let form = document.getElementById("card_add_form" + this.id);
    form.style.display = "block";
    let title = document.getElementById("card_title" + this.id);
    let desc = document.getElementById("card_desc" + this.id);
    document
      .getElementById("saveBtn" + this.id)
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        if (title.value.trim().length > 0 && desc.value.trim().length > 0) {
          let newItem = new Card(
            this.id + this.cardID,
            title.value,
            this.id,
            desc.value
          );

          this.cards.unshift(newItem);
          if (this.cards.length > 0) {
            this.renderEntries(newItem);
          }
          this.cardID++;
          title.value = "";
          desc.value = "";
          form.style.display = "none";
        }
      });
  }

  renderEntries(newItem) {
    let item = document.createElement("div");
    item.id = newItem.id;
    item.draggable = true;
    item.innerHTML = newItem.renderCard();
    let cardListUI = document.getElementById("card-list" + this.id);
    cardListUI.prepend(item);
    document
      .getElementById("del-card" + newItem.id)
      .addEventListener("click", () => {
        this.deleteCardElements(newItem, cardListUI);
      });

    item.addEventListener("dragstart", () => {
      localStorage.draggedElement = JSON.stringify(newItem);
    });
    Storage.addItems(trelloBoard);
  }

  deleteCardElements(entry, cardListUI) {
    deleteElems("card", entry, this.cards, cardListUI);
  }

  renderCard() {
    return `<div class='list_parent'>
      <div class="top_shelf">
      <p class="list_title_name">${this.name}</p>
      <button class="deleteCard">X</button>
      </div>
     
      <div class ='card-list' id=${"card-list" + this.id}>
  
      </div>
      <div class="add_cards">
          <button class='addCardListBtn' >Add card</button>
          <form id = ${"card_add_form" + this.id} style='display:none;'>  
          <div class="card_form_parent">
          <input id=${
            "card_title" + this.id
          } type="text" placeholder="Card Title">
          <input id=${
            "card_desc" + this.id
          } type="text" placeholder="Card description">
          <input id=${"saveBtn" + this.id} type="submit" value="Save">
          </div>
          </form>
      </div>
      </div>
      `;
  }
}
