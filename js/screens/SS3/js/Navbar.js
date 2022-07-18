const $template  = document.createElement('template');
$template.innerHTML = `
    <div class="navbar">
        <div class="navabar-item"><a href="./index.html">home</a></div>
        <div class="navabar-item"><a href="./about.html">about</a></div>
        <div class="navabar-item"><a href="./contact.html">contact</a></div>
    </div>
`;
export default class Navbar extends HTMLElement{
    constructor(){
        super();
        this.appendChild($template.content.cloneNode(true));
    }
}
window.customElements.define('my-navbar',Navbar);