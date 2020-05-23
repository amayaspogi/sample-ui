import { components, routers } from './base.js';

(async () => {
    // register routers
    routers.register({key: `login`, component: `app-com-login`});
    routers.register({ key: `signup`, component: `app-com-signup` });

    document.querySelector("#login").setComponent("app-com-test");
})();