import { baseComponent } from '../base.js';

export default class custom extends baseComponent {
    constructor(template, model) {
        super(template, model);
    }

    bindEvents() {
    }
}

if (!customElements.get(`app-com-login`)) {
    customElements.define(`app-com-login`, custom);
}