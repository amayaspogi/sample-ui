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
    return `<!--Default form login-->
            <form class="text-center border border-light p-5">

                <p class="h4 mb-4">Sign in</p>

                <!-- Email -->
                <input type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail" value="${data.email}">

                <!-- Password -->
                <input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password">

                <div class="d-flex justify-content-around">
                    <div>
                        <!-- Remember me -->
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember">
                            <label class="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
                        </div>
                    </div>
                    <div>
                        <!-- Forgot password -->
                        <a href="">Forgot password?</a>
                    </div>
                </div>

                <!-- Sign in button -->
                <button class="btn btn-info btn-block my-4" type="submit">Sign in</button>

                <!-- Register -->
                <p>Not a member?
                    <a data-router-view="login" href="signup">Register</a>
                </p>

                <!-- Social login -->
                <p>or sign in with:</p>

                <a href="#" class="mx-2" role="button"><i class="fab fa-facebook-f light-blue-text"></i></a>
                <a href="#" class="mx-2" role="button"><i class="fab fa-twitter light-blue-text"></i></a>
                <a href="#" class="mx-2" role="button"><i class="fab fa-linkedin-in light-blue-text"></i></a>
                <a href="#" class="mx-2" role="button"><i class="fab fa-github light-blue-text"></i></a>

            </form>
            <!-- Default form login -->`;
}

export async function model (param) {
    return await (async () => {
        return {
            email: "howl.david@gmail.com"
        };
    })();
}