import base from './base-component.js';

class custom extends base {
    constructor(template, model) {
        super(template, model);
    }
}

customElements.define(`app-page-main`, custom);
export default custom;