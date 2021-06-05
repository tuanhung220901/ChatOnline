import { SendMessage } from "../models/conversation.js";

const $template = document.createElement('template');
$template.innerHTML = `
    <form class = "send-message-form">
        <input type = "text" class = "message-content">
        <button class="send-message-btn"> <i class = "fas fa-paper-plane"></i></button>
        </input>
    </form>
`;
export default class SendMessageForm extends HTMLElement{
    constructor(){
        super();
        this.appendChild($template.content.cloneNode(true));

        this.$form = this.querySelector(".send-message-form");
        this.$content = this.querySelector(".message-content");
    }
    connectedCallback(){
        this.$form.onsubmit = (event) => {
            // trong form có action là điểm đến dùng để xử lý 
            // khi submit form sẽ điều hướng sang action
            // nếu khong khai báo thì web sẽ chuyển trực tiếp đến trang
            event.preventDefault();
            let content = this.$content.value.trim();
            if(content != ""){
                SendMessage(this.getAttribute('conversation-id'),content);
            }
        } 
    }
    static get observedAttributes() {
        return ['conversation-id'];
    }
}
window.customElements.define('send-message-form',SendMessageForm);