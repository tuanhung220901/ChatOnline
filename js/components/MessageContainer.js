const $template = document.createElement('template');
$template.innerHTML = `
    <div class = "message-container">
        <span class = "message-content"> ối dồi ôi</span>
    </div>    
`;
export default class MessageContainer extends HTMLElement{
    constructor(){
        super();
        this.appendChild($template.content.cloneNode(true));

        this.$content = this.querySelector('.message-content');
        this.$container = this.querySelector('.message-container');
    }
    static get observedAttributes(){
        return ['content','owned'];
    }
    attributeChangedCallback(attrName,oldValue,newValue){
        if(attrName == 'content'){
            this.$content.innerHTML = newValue;
        }
        else if(attrName == 'owned'){
            if(newValue == 'true'){
                this.$container.classList.add('owned');
            }
        }
    }
}

window.customElements.define('message-container',MessageContainer);
