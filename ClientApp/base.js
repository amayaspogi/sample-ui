import * as util from './util.js';

export let containers = new class Containers {
    constructor() {
        this._containers = new Array();
    }

    /* methods */
    async resolve(args) {
        const { single } = args;
        let container = this._containers.filter(c => c.key == args.key)[0];
        if (!container) {
            container = await this.register(args);
        }
        else if (!container.single) {
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
            let modmodel = await loadResource('models', model);
            data = modmodel.default;
        }

        let container = this._containers.filter(c => c.key == key)[0];
        if (!container || !single) {
            let resource = await this.loadResource('components', component);
            let element = new resource.component(resource.template, resource.model);

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

    async loadResource(source, file) {
        return await import(`./${source}/${file}.js${util.version()}`);
    }
}

export let routers = new class Routers {
    constructor() {
        this._containers = new Array();
    }
    
    resolve(args) {
        let router = this._containers.filter(r => r.key == args.key)[0] ?? args;
        if (!router) {
            router = this.register(router);
        }
        return router;
    }

    register(args) {
        let { key, container } = args;
        container = container ?? key;

        let router = this._containers.filter(r => r.key == key)[0];
        if (!router) {
            router = {
                key: key,
                container: container
            };
            this._containers.push(router);
        }
        return router;
    }
}

if (!customElements.get('app-view')) {
    customElements.define('app-view', class extends HTMLElement {
        constructor() {
            super();
        }

        async setComponent(key) {
            let component = await containers.resolve({ key: key, single: true });

            this.innerHTML = "";
            this.appendChild(component);
        }

        async connectedCallback() {
            let key = this.getAttribute(`key`);
            if (key) {
                await this.setComponent(key);
            }
        }
    });
}

export class baseComponent extends HTMLElement {
    constructor(template, model, param) {
        super();

        this._template = template;
        this._model = model ?? this.emptyModel;
        this._param = param ?? {};
    }

    async connectedCallback() {
        let { _model, _param } = this;
        this.data = await _model(_param);
    }

    render(data) {
        let { _template } = this;
        this._data = data;
        this.innerHTML = _template(data);

        // find all data-router
        this.bindRouter();
        this.bindEvents();
    }

    get data() { return this._data; }
    set data(value) { this.render(value); }

    bindRouter() {
        this.querySelectorAll(`a[data-router-view][href]`).forEach(x => {
            x.addEventListener('click', async (e) => {
                e.preventDefault();
                const { target } = e;

                let route = target.getAttribute('href');
                let view = target.getAttribute('data-router-view');

                let router = routers.resolve({ key: route });

                let appview = document.querySelector(`app-view#${view}`);
                await appview.setComponent(router.container);

                history.pushState({}, "", router.key);
            });
        });
    }

    async emptyModel() {
        return {};
    }
}