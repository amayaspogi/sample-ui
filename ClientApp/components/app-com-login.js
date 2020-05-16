import { baseComponent } from '../base.js';

export class component extends baseComponent {
    constructor(tmp, mdl) {
        super(tmp ?? template, mdl ?? model);
    }

    bindEvents() {
    }
}

if (!customElements.get(`app-com-login`)) {
    customElements.define(`app-com-login`, component);
}

export function template (data) {
    return `<div data-model-context class="text-center border border-light p-5">
                <p class="h4 mb-4">Sign in</p>
                <input type="email" data-model-prop="email" class="form-control mb-4" placeholder="E-mail">
                <input type="password" id="password" class="form-control mb-4" placeholder="Password">
                <div class="d-flex justify-content-around">
                    <div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember">
                            <label class="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
                        </div>
                    </div>
                    <div>
                        <a href="">Forgot password?</a>
                    </div>
                </div>
                <button class="btn btn-info btn-block my-4" type="submit">Sign in</button>
                <p>Not a member?
                    <a data-router-view="login" href="signup">Register</a>
                </p>
                <p>or sign in with:</p>
                <a href="#" class="mx-2" role="button"><i class="fab fa-facebook-f light-blue-text"></i></a>
                <a href="#" class="mx-2" role="button"><i class="fab fa-twitter light-blue-text"></i></a>
                <a href="#" class="mx-2" role="button"><i class="fab fa-linkedin-in light-blue-text"></i></a>
                <a href="#" class="mx-2" role="button"><i class="fab fa-github light-blue-text"></i></a>
            </div>`;
}

export async function model (param) {
    return await (async () => {
        return {
            email: "howl.david@gmail.com"
        };
    })();
}