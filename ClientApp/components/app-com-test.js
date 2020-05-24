import { BaseComponent } from '../base.js';

export class component extends BaseComponent {
    constructor(template, model, lambda) {
        super(template, model, lambda);
    }
}

if (!customElements.get(`app-com-test`)) {
    customElements.define(`app-com-test`, component);
}

export function template() {
    return `<div data-context="model">
                <input data-field="value:name1" />
                <input type="button" data-action="click:subadd" value="Sub Add" />
                <input type="button" data-action="click:add" value="Add" />
                <div data-context="sub">
                    <input data-field="value:name" />
                    <div data-context="sub">
                        <input data-field="value:name" />
                    </div>
                </div>
                <div data-field-trigger="model.sub.sub.name" data-field="innerHTML:total"></div>
            </div>`;
}

export let model = {
    name: "",
    sub: {
        name: "",
        sub: {
            name: ""
        }
    }
};

export let lambda = {
    add: async (model) => {
        model.list.push(model.name);
        return true;
    },
    subadd: async(model) => {
        model.sub.name = `sub-${model.name}`;
        model.sub.sub.name = `sub-${model.sub.name}`;
        return true;
    },
    total: async (data,model) => {
        return `${JSON.stringify(model)} ==== ${JSON.stringify(data)}`;
    }
}