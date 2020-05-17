import { components, routers } from './base.js';

(async () => {
    // register component
    let login = (await components.register({ key: `app-com-login`})).element;

    // register routers
    routers.register({key: `login`, component: `app-com-login`});
    routers.register({ key: `signup`, component: `app-com-signup` });

    document.querySelector("#login").setComponent("app-com-login");
})();