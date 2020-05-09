import containers from './base/containers.js';
import router from './base/router.js';
import models from './base/models.js';

(async () => {
    
    await containers.register({ key: `app-com-login`, single: true });
    await containers.register({ key: `app-com-signup`, single: true });

    window.addEventListener(`hashchange`, async () => {
        let hash = window.location.hash.replace(`#`, ``);
        let component = await containers.resolve({ key: hash });

        let content = document.querySelector(`#content`);
        content.innerHTML = ``;
        content.appendChild(component);
    });

    window.containers = containers;

    window.onmessage = (e) => {
        console.log(e.data);
    }
})();