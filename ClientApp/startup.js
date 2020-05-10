import { containers, routers } from './base.js';

(async () => {
    // register routers
    routers.register({key: `login`, container: `app-com-login`});
    routers.register({ key: `signup`, container: `app-com-signup` });

    document.querySelector("#login").setComponent("app-com-login");
})();