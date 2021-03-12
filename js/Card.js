class Card {
  constructor(id, name, parent, desc) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.desc = desc;
  }

  renderCard() {
    return `
        <div class= 'card-entry-main-parent'>
        <div>
        <p> ${this.name} </p>
        <p> ${this.desc} </p>
        </div>
  
        <button id=${"del-card" + this.id}>
        x
        </button>
        </div>
        `;
  }
}
