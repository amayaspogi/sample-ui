import containers from '../containers.js';
import base from './base-component.js';

class custom extends base {
    constructor(template, model) {
        super(template, model);
    }

    bindEvents() {
        this.querySelector(`#c1`).addEventListener(`click`, async () => {
            /* this will auto create the component */
            await this.create(`app-com-one`);
        });

        this.querySelector(`#c2`).addEventListener(`click`, async () => {
            await this.create(`app-com-two`);
        });
    }

    /* methods */
    async create(key) {
        let component = await containers.resolve({
            key: key
        });
        await this.display(component);
    }

    async display(component) {
        let content = this.querySelector(`#comcontainer`);
        content.appendChild(component);
    }
}

customElements.define(`app-mod-test`, custom);
export default custom;