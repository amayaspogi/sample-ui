import * as util from './util.js';

export let components = new class Components {
    constructor() {
        this._containers = new Array();
    }

    async resolve(args) {
        let container = this._containers.filter(c => c.key == args.key)[0];
        return (container ?? await this.register(args)).element;
    }

    async register(args) {
        let { key, component } = args;
        component = component ?? key;

        let container = this._containers.filter(c => c.key == key)[0];
        if (!container) {
            let resource = await this.loadResource('components', component);
            let element = new resource.component(resource.template, resource.model, resource.lambda);

            container = { key: key, element: element };
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
        return router ?? this.register(router);
    }

    register(args) {
        let { key, component } = args;
        component = component ?? key;

        let router = this._containers.filter(r => r.key == key)[0];
        if (!router) {
            router = { key: key, component: component };
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
            let component = await components.resolve({ key: key });
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

export class BaseComponent extends HTMLElement {
    constructor(template, model, lambda) {
        super();
        this._model = {};
        this._init = false;
        this._actions = new Map();

        this.innerHTML = template();
        this.buildModel(model, lambda);
    }

    async connectedCallback() {
        if (this._init) return;
 
        this.bindRouter();
        this.dispatchEvent(new CustomEvent("load"));

        this._init = true;
    }

    get model() { return this._model; }

    buildModel(model, lambda) {
        let context = this.querySelector("[data-context]");
        if (!context) return;

        // build proxy model
        let fields = new Array();
        let iterateModel = (model, context) => {
            for (let property in model) {
                if (util.isObject(model[property])) {
                    iterateModel(model[property], `${context}.${property}`);
                    model[property] = new Proxy(model[property], this.proxyHandler(fields, lambda));
                }
                else {
                    fields.push({ property, context, trigger: "", elements: new Array() });
                    model._context = context;
                }
            }
            return;
        };

        if (util.isObject(model)) {
            iterateModel(model, "model");
            model = new Proxy(model, this.proxyHandler(fields, lambda));
        }

        // set global variable
        this._model = model;
        lambda.model = model;

        // bind field
        this.querySelectorAll("[data-field]").forEach(x => {
            let context = util.getContext(x);
            let model = util.toJSON(x.getAttribute("data-field"));
            let trigger = x.getAttribute("data-field-trigger") ?? "";
            let event = x.getAttribute("data-field-event") ?? "change";

            for (let property in model) {
                let field = model[property];

                let fieldItem = fields.filter(x => x.property == field && x.context == context && x.trigger == trigger)[0];
                if (!fieldItem && trigger) {
                    fieldItem = { property: field, context, trigger, elements: new Array() };
                    fields.push(fieldItem);
                }
                if (!fieldItem) continue;

                fieldItem.elements.push({ element: x, property: property });
                x.addEventListener(event, (e) => {
                    this.model[field] = e.currentTarget[property];
                });
            }
        });

        // bind action
        this.querySelectorAll("[data-action]").forEach(x => {
            let model = util.toJSON(x.getAttribute("data-action"));
            for(let event in model) {
                let action = model[event];

                let item = this._actions.get(action);
                if (!item) {
                    item = { elements: new Array() };
                    this._actions.set(action, item);
                }

                item.elements.push({ element: x, event: event });
                x.addEventListener(event, async (e) => {
                    e.preventDefault();
                    let propagate = await lambda[action](this.model);
                    if (!propagate) {
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                    }
                });
            }
        });
    }

    proxyHandler(fields, lambda, model) {
        return {
            get: function (obj, prop) {
                return obj[prop];
            },
            set: function (obj, prop, value) {
                if (obj[prop] != value) {
                    obj[prop] = value;

                    let fieldItem = this.fields.filter(x => x.property == prop && x.context == obj._context)[0];
                    if (!fieldItem) return true;

                    fieldItem.elements.forEach(x => {
                        x.element[x.property] = value;
                    });

                    let fieldTrigger = this.fields.filter(x => `${obj._context}.${prop}` == x.trigger)[0];
                    if (!fieldTrigger) return true;

                    fieldTrigger.elements.map(x => { 
                        return { element: x.element, property: x.property, lambda: this.lambda[fieldTrigger.property], model: this.lambda.model }; 
                    }).forEach(async (x) => {
                        x.element[x.property] = await x.lambda(obj, x.model);
                    });
                }
                return true;
            },
            fields: fields,
            lambda: lambda
        }
    }

    bindRouter() {
        this.querySelectorAll(`a[data-router-view][href]`).forEach(x => {
            x.addEventListener('click', async (e) => {
                e.preventDefault();
                const { target } = e;

                let route = target.getAttribute('href');
                let view = target.getAttribute('data-router-view');

                let router = routers.resolve({ key: route });

                let appview = document.querySelector(`app-view#${view}`);
                await appview.setComponent(router.component);

                history.pushState({}, "", router.key);
            });
        });
    }
}