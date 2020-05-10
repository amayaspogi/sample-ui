import { containers } from './base.js';

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