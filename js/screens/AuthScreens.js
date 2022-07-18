const $template = document.createElement('template');
$template.innerHTML = `
    <div class = 'auth-screen'>
        <div style = "width:300px; height:410px; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;; margin: 100px auto; padding: 100px 100px; text-align: center;">
            <login-form></login-form>
        </div>
        <div style = "width:300px; height:410px; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;; margin: 100px auto; padding: 100px 100px; text-align: center;">
            <register-form></register-form>
        </div>
    <div>    
`;
export default class AuthScreen extends HTMLElement {
    constructor(){
        super();
        this.appendChild($template.content.cloneNode(true));
    }
}
window.customElements.define('auth-screen',AuthScreen);