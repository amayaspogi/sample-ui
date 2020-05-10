import * as util from './util.js';

class Resource {
    constructor(resource) {
        this._resource = resource;
        this._containers = new Array();
    }

    /* mthods */
    async resolve(key) {
        let resource = this._containers.filter(r => r.key == key)[0];
        return resource ?? await this.register(key);
    }

    async register(key) {
        let resource = this._containers.filter(r => r.key == key)[0];
        if (!resource) {
            resource = {
                key: key,
                value: await import(`./${this._resource}/${key}.js${util.version()}`)
            };
            this._containers.push(resource);
        }
        return resource;
    }
}

export let containers = new class Containers {
    constructor() {
        this._containers = new Array();
        this._component = new Resource(`components`);
        this._template = new Resource(`templates`);
        this._model = new Resource(`models`);
    }

    /* methods */
    async resolve(args) {
        let container = this._containers.filter(c => c.key == args.key)[0] ?? args;
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

        let container = this._containers.filter(c => c.key == key)[0];
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

        async connectedCallback() {
            let component = await containers.resolve({
                key: this.getAttribute(`key`),
                model: this.getAttribute(`model`)
            });
            this.appendChild(component);
        }
    });
}

export class baseComponent extends HTMLElement {
    constructor(template, model) {
        super();
        this._template = template;
        this._model = model ?? {};

        this.innerHTML = this._template(this._model);

        // find all data-router
        this.querySelectorAll(`a[data-router][href]`).forEach(x => {
            x.addEventListener('click', async (e) => {
                e.preventDefault();
                const { target } = e;

                let route = target.getAttribute('href');
                let view = target.getAttribute('data-router');

                let router = routers.resolve({key: route});
                let component = await containers.resolve({ key: router.container });

                let appview = document.querySelector(`app-view#${view}`);

                history.pushState({}, "", router.key);
                appview.innerHTML = "";
                appview.appendChild(component);
            });
        });

        this.bindEvents();
    }
}