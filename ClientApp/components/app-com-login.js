import { BaseComponent } from '../base.js';

export class component extends BaseComponent {
    constructor(template, model, lambda) {
        super(template, model, lambda);
    }
}

if (!customElements.get(`app-com-login`)) {
    customElements.define(`app-com-login`, component);
}

export function template () {
    return `<style>
                .error {
                    background-color: #ff0000;
                }
            </style>
            <div class="text-center border border-light p-5" data-context>
                <p class="h4 mb-4">Sign in</p>
                <input type="email" data-field-event="keyup" data-field="value:email" class="form-control mb-4" placeholder="E-mail">
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
                <a data-action="click:login" data-router-view="login" href="signup" class="btn btn-info btn-block my-4">Sign in</a>
                <p>Not a member?
                    <a data-router-view="login" href="signup">Register</a>
                </p>
                <p>or sign in with:</p>
                <a href="#" class="mx-2" role="button"><i class="fab fa-facebook-f light-blue-text"></i></a>
                <a href="#" class="mx-2" role="button"><i class="fab fa-twitter light-blue-text"></i></a>
                <a href="#" class="mx-2" role="button"><i class="fab fa-linkedin-in light-blue-text"></i></a>
                <a href="#" class="mx-2" role="button"><i class="fab fa-github light-blue-text"></i></a>
                <div data-trigger="message" data-field="className:layout,innerHTML:message">
                </div>
                <div data-field="innerHTML:email"></div>
            </div>`;
}

export let model = {
    email: "",
    message: ""
};

export let lambda = {
    login: async(model) => {
        model.message = "";
        if (!model.email) {
            model.message = "error";
        }
        else if (model.email != "howl.david@gmail.com") {
            model.message = "Invalid email address";
        }
        return !model.message;
    },
    layout: async(model) => {
        return model.message == "error" ? "error" : "";
    }
}