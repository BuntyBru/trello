class Trello {
  constructor() {
    this.listArray = [];
    this.id = 0;
  }

  addList() {
    let addListForm = document.getElementsByClassName("add_list_form")[0];
    addListForm.getElementsByClassName("form-button")[0].onclick = () => {
      let formElement = addListForm.getElementsByTagName("form")[0];
      formElement.style.display = "block";
      document.getElementById("list_name_input").focus();

      document.getElementById("saveBtn").onclick = (evt) => {
        evt.preventDefault();
        if (
          document.getElementById("list_name_input").value.trim().length > 0
        ) {
          this.addListItems(
            document.getElementById("list_name_input").value.trim(),
            this.id
          );
          document.getElementById("list_name_input").value = "";

          formElement.style.display = "none";
          this.id++;
        }
      };
    };
  }

  addListItems(formObj, id) {
    id = "card_" + id;
    let newItem = new List(formObj, id);
    this.listArray.push(newItem);

    if (this.listArray.length > 0) {
      this.renderElements(newItem);
    }
  }

  renderElements(newItem) {
    let item = document.createElement("div");
    item.id = newItem.id;
    item.innerHTML = newItem.renderCard();

    item
      .getElementsByClassName("deleteCard")[0]
      .addEventListener("click", () => {
        this.deleteElements(newItem);
      });

    item
      .getElementsByClassName("addCardListBtn")[0]
      .addEventListener("click", () => {
        newItem.addCards();
      });

    item.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    item.addEventListener("dragenter", (e) => {
      e.preventDefault();
    });
    item.addEventListener("drop", () => {
      if (item.id !== JSON.parse(localStorage.draggedElement).parent) {
        let startListName = JSON.parse(localStorage.draggedElement).parent;
        let draggedElement = JSON.parse(localStorage.draggedElement);
        let endListName = item.id;
        Drop(startListName, draggedElement, endListName);
      }
    });
    listSection.append(item);
    Storage.addItems(trelloBoard);
  }

  deleteElements(entry) {
    deleteElems("list", entry, this.listArray, listSection);
  }
}

let trelloBoard = new Trello();
let listSection = document.getElementById("list_container");
trelloBoard = Storage.fillList();
trelloBoard.addList();

if (trelloBoard.listArray.length > 0) {
  trelloBoard.listArray.forEach((x) => {
    trelloBoard.renderElements(x);
    x.cards
      .slice()
      .reverse()
      .forEach((y) => {
        x.renderEntries(y);
      });
  });
}
