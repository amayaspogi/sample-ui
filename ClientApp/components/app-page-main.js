import { baseComponent } from '../base.js';

export default class custom extends baseComponent {
    constructor(template, model) {
        super(template, model);
    }
}

if (!customElements.get(`app-page-main`)) {
    customElements.define(`app-page-main`, custom);
}