import resource from './resource.js';

class containers {
    constructor() {
        this._containers = new Array();
        this._component = new resource(`components`);
        this._template = new resource(`templates`);
        this._model = new resource(`models`);
        this._timestamp = Date.now();
        console.log(this.info);
    }

    /* properties */
    static get instance() { return this._instance ?? (this._instance = new containers()); }
    get timestamp() { return this._timestamp; }
    get info() {
        return {
            name: this.constructor.name,
            timestamp: this.timestamp
        };
    }

    /* methods */
    async resolve(args) {
        let container = this._containers.filter(container => container.key == args.key)[0] ?? args;
        if (!container.single) {
            container = await this.register(container);
        }

        return container.element;
    }

    async register(args) {
        let { key, component, template, single, model } = args;
        component = component ?? key;
        template = template ?? component;
        single = !!single;

        let data = null;
        if (model) {
            let modmodel = await this._model.resolve(model);
            data = modmodel.value.default;
        }

        let container = this._containers.filter(container => container.key == key)[0];
        if (!container || !single) {
            let modcomp = await this._component.resolve(component);
            let modtemp = await this._template.resolve(template);
            let element = new modcomp.value.default(modtemp.value.default, data);

            container = {
                key: key,
                component: component,
                template: template,
                single: single,
                element: element
            };
            this._containers.push(container);
        }

        return container;
    }
}

class appContainer extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        let component = await containers.instance.resolve({
            key: this.getAttribute(`key`),
            model: this.getAttribute(`model`)
        });
        this.appendChild(component);
    }
}

customElements.define('app-container', appContainer);
export default containers.instance;