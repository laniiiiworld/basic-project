export default class Header {
  constructor({ $target, initialState }) {
    this.$header = document.createElement('header');
    this.state = initialState;
    $target.appendChild(this.$header);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    this.$header.innerHTML = `
          <div class="logo">
            <i class="fa-brands fa-youtube"></i>
            <span class="name">YouTube Clone</span>
          </div>
          <ul class="icons">
            <i class="fas fa-search"></i>
            <i class="fas fa-ellipsis-v"></i>
          </ul>
        `;
  }
}
