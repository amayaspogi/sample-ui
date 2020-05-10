import { baseComponent, containers } from '../base.js';

export default class custom extends baseComponent {
    constructor(template, model) {
        super(template, model);
    }

    bindEvents() {
    }
}

if (!customElements.get(`app-com-signup`)) {
    customElements.define(`app-com-signup`, custom);
}   