import { containers, routers } from './base.js';

(async () => {
    // register cointaners
    containers.register({ key: `app-com-login`, single: true });
    containers.register({ key: `app-com-signup`, single: true });

    // register routers
    routers.register({key: `login`, container: `app-com-login`});
    routers.register({ key: `signup`, container: `app-com-signup` });
})();