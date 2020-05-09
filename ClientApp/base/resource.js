class resource {
    constructor(resource) {
        this._resource = resource;
        this._containers = new Array();
    }

    /* mthods */
    async resolve(key) {
        let container = this._containers.filter(container => container.key == key)[0];
        return container ?? await this.register(key);
    }

    async register(key) {
        let container = this._containers.filter(container => container.key == key)[0];
        if (!container) {
            container = {
                key: key,
                value: await import(`../${this._resource}/${key}.js`)
            };
            this._containers.push(container);
        }
        return container;
    }
}

export default resource;