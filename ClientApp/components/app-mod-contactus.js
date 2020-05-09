import base from './base-component.js';

class custom extends base {
    constructor(template, model) {
        super(template, model);
    }

    bindEvents() {
    }
}

customElements.define(`app-mod-contactus`, custom);
export default custom;