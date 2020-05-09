class router {
    constructor() {
        window.onpopstate = () => {
            window.postMessage({
                route: window.location.pathname
            });

        };
    }

    /* properties */
    static get instance() { return this._instance ?? (this._instance = new router()); }

    /* methods */
}

class appRouter extends HTMLElement {
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

customElements.define('app-router', appRouter);
export default router.instance;