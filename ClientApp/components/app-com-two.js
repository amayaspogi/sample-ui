import base from './base-component.js';

class custom extends base {
    constructor(template, model) {
        super(template, model);
    }

    bindEvents() {
        this.querySelector(`#print`).addEventListener(`click`, () => {
            let message = this.querySelector(`#message`).value;
            alert(`com-2 ${message}`);
        });
    }
}

customElements.define(`app-com-two`, custom);
export default custom;