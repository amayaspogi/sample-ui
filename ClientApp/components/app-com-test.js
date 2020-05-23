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
    return `<div data-context>
                <input data-field="value:name" />
                <input type="button" data-action="click:subadd" value="Sub Add" />
                <input type="button" data-action="click:add" value="Add" />
                <div data-field="context:sub">
                    <input data-field="value:name" />
                </div>
                <div data-field-trigger="list" data-field="innerHTML:total"></div>
            </div>`;
}

export let model = {
    name: "",
    sub: {
        name: "",
    },
    list: new Array()
};

export let lambda = {
    add: async (model) => {
        model.list.push(model.name);
        return true;
    },
    subadd: async(model) => {
        model.sub.name = model.name + "-sub";
        return true;
    },
    total: async (model) => {
        return model.list.length;
    }
}