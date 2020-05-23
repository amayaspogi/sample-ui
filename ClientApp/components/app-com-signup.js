import { BaseComponent } from '../base.js';

export class component extends BaseComponent {
    constructor(template, model) {
        super(template, model);
    }
}

if (!customElements.get(`app-com-signup`)) {
    customElements.define(`app-com-signup`, component);
}

export function template() {
    return `<style>
                .error {
                    color: #ff0000;
                }
            </style>
            <form class="text-center border border-light p-5" action="#" data-model-context>
                <p class="h4 mb-4">Sign up</p>
                <div class="form-row mb-4">
                    <div class="col">
                        <input type="text" data-model-prop="value" data-model-field="firstName" id="defaultRegisterFormFirstName" class="form-control" placeholder="First name">
                    </div>
                    <div class="col">
                        <input type="text" data-model-prop="value" data-model-field="lastName" id="defaultRegisterFormLastName" class="form-control" placeholder="Last name">
                    </div>
                </div>
                <input type="email" data-model-prop="value" data-model-field="email" id="defaultRegisterFormEmail" class="form-control mb-4" placeholder="E-mail">
                <input type="password" id="defaultRegisterFormPassword" class="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock">
                <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
                    At least 8 characters and 1 digit
                </small>
                <input type="text" id="defaultRegisterPhonePassword" class="form-control" placeholder="Phone number" aria-describedby="defaultRegisterFormPhoneHelpBlock">
                <small id="defaultRegisterFormPhoneHelpBlock" class="form-text text-muted mb-4">
                    Optional - for two step authentication
                </small>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="defaultRegisterFormNewsletter">
                    <label class="custom-control-label" for="defaultRegisterFormNewsletter">Subscribe to our newsletter</label>
                </div>
                <a data-router-view="login" href="login" class="btn btn-info my-4 btn-block">Sign in</a>
                <p>or sign up with:</p>
                <a href="#" class="mx-2" role="button"><i class="fab fa-facebook-f light-blue-text"></i></a>
                <a href="#" class="mx-2" role="button"><i class="fab fa-twitter light-blue-text"></i></a>
                <a href="#" class="mx-2" role="button"><i class="fab fa-linkedin-in light-blue-text"></i></a>
                <a href="#" class="mx-2" role="button"><i class="fab fa-github light-blue-text"></i></a>
                <hr>
                <p>By clicking
                    <em>Sign up</em> you agree to our
                    <a href="" target="_blank">terms of service</a>
                </p>
                <a data-router-view="login" href="login">Login</a>
                <div data-model-prop="className" data-model-field="layout">
                    <div data-model-prop="innerHTML" data-model-field="message"></div>
                </div>
            </form>`;
}

export let model = new class Model {
    constructor() {
    }

    get firstName() { return this._firstName ?? ""; }
    set firstName(value) { this._firstName = value; }

    get lastName() { return this._lastName ?? ""; }
    set lastName(value) { this._lastName = value; }

    get password() { return this._password ?? ""; }
    set password(value) { this._password = value; }

    get phoneNo() { return this._phoneNo ?? ""; }
    set phoneNo(value) { this._phoneNo = value; }

    get message() { return this._message ?? ""; }
    set message(value) { this._message = value; }

    get layout() { return this.message ? "error" : "" }

    async signup() {
        this.message = "";
        if (!this.firstName || !this.lastName || !this.email || !this.password || !this.phoneNo) {
            this.message = "Please fillout all fields!";
        }
        return !this.message;
    }
}