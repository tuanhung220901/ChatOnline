import MessageContainer from "./MessageContainer.js";

const $template = document.createElement('template');
$template.innerHTML = `
    <div class = "message-list">
       <message-container content = "hello" owned = "true"> </message-container>
       <message-container content = "hi" owned = "false"> </message-container>
       <message-container content = "how are you" owned = "true"> </message-container>
       <message-container content = "hello" owned = "false"> </message-container>

    </div>    
`;
export default class MessageList extends HTMLElement{
    constructor(){
        super();
        this.appendChild($template.content.cloneNode(true));
        this.currentUser = firebase.auth().currentUser;
        this.$list = this.querySelector('.message-list');
    }
    static get observedAttributes(){
        return ['messages'];
    }
    attributeChangedCallback(attrName,oldValue,newValue){
        if(attrName == 'messages'){
            console.log(newValue);
            let messages = JSON.parse(newValue);
            this.$list.innerHTML = '';
            for(let message of messages){
                let $messageContainer = new MessageContainer();
                $messageContainer.setAttribute('content',message.content);
                $messageContainer.setAttribute('owned',message.userId == this.currentUser.uid);
                this.$list.appendChild($messageContainer);
            }
        }
    }
}

window.customElements.define('message-list',MessageList);
