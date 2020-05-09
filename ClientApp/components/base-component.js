class base extends HTMLElement {
    constructor(template, model) {
        super();
        this._template = template;
        this._model = model ?? {};

        this.innerHTML = this._template(this._model);
        this.bindEvents();
    }

    bindEvents() { }
}

export default base;