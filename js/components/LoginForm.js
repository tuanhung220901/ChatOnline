import { login } from "../models/user.js";

const $template = document.createElement('template');
$template.innerHTML = `
    <form class="login-form">
        <h1 class = "title">Sign in</h1>
        <input-wrapper class="email" placeholder = "Your email" type = "email" error=""></input-wrapper>
        <input-wrapper class="password" placeholder = "Your password" type = "password" error=""></input-wrapper>
        <button class="login-btn">Login</button>
    </form>
`;
export default class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$loginForm = this.querySelector(".login-form");
        this.$email = this.querySelector(".email");
        this.$password = this.querySelector(".password");
    }
    connectedCallback() {
        this.$loginForm.onsubmit = (event) => {
            event.preventDefault();
            let isPassed = this.$email.validate((value) => {
                return value != "";
            }, "Invalid name") &
                this.$password.validate((value) => {
                    return value != "";
                }, "Invalid password");
            
                let data = {
                    email: this.$email.value,
                    password: this.$password.value
                }
            if(isPassed){
                login(data.email,data.password)
                // console.log(data);
            }   
             
        };
    } 
}
window.customElements.define("login-form", LoginForm);