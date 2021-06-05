import { createConversation } from "../models/conversation.js";
import { updateCurrentUsers, updateUser } from "../models/user.js";
import {getFlirtingUsers} from "../models/user.js";
const $template = document.createElement('template');
$template.innerHTML = `
    <div class = "user-action"> 
        <div class = "status-free">
            <button class = "btn btn-flirt"> Let's Flirt </button>
            <button class = "btn btn-bite"> Bite </button>
        </div>
        
        <div class = "status-flirting">
            <button class = "btn btn-stop"> Stop flirting </button>
        </div>
        <div class = "status-chatting">
        <button class = "btn btn-end-chat"> End conversation </button>
    </div>
    </div>
`;
export default class UserAction extends HTMLElement{
    constructor(){
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$statusFree = this.querySelector('.status-free');
        this.$statusFlirting = this.querySelector('.status-flirting');
        this.$statusChatting = this.querySelector('.status-chatting');

        this.$flirtBtn = this.querySelector(".btn-flirt");
        this.$biteBtn = this.querySelector(".btn-bite");
        this.$stopFlirtBtn = this.querySelector(".btn-stop");
        this.$endChatBtn = this.querySelector(".btn-end-chat");
        this.partnerId = '';
    }

    connectedCallback(){
        this.$flirtBtn.onclick = () => {
            updateCurrentUsers({status:'flirting'});
        }
        this.$biteBtn.onclick = async () => {
            // lấy ra những người dùng đang flirting
            let flirtingUsers = await getFlirtingUsers();
            if(flirtingUsers.length == 0){
                alert("There are no flirting users");
                return;
            }
            let index  = Math.floor(Math.random() * flirtingUsers.length);
            let randomUser = flirtingUsers[index];
            let currentUser = firebase.auth().currentUser;
            this.partnerId = randomUser.id;
            let conversation =  await createConversation([randomUser.id,currentUser.uid]);
    
            updateCurrentUsers({status:"chatting",currentConversationId: conversation.id});
            updateUser(randomUser.id,{status: 'chatting', currentConversationId: conversation.id});
            // kiểm tra số lượng flirting
            // nếu số lượng  > 0 -> ghép đôi -> updateCurrentUser
            //updateCurrentUsers({status:'chatting',currentConversationId: 'id của conversation nào đó'});
        }
        this.$stopFlirtBtn.onclick = () =>{
            updateCurrentUsers({status:'free'});
            
        }
        this.$endChatBtn.onclick = () =>{
            updateCurrentUsers({status:'free', currentConversationId:""});
            updateUser(this.partnerId, {status:'free', currentConversationId:""});
        }
    }
    static get observedAttributes(){
        return ['status'];
    }
    attributeChangedCallback(attrName,oldValue,newValue){
        if(attrName == 'status'){
            this.$statusFree.style.display = 'none';
            this.$statusChatting.style.display = 'none';
            this.$statusFlirting.style.display = 'none';
            if(newValue == 'free'){
                this.$statusFree.style.display = 'block';
            } else if(newValue == 'chatting'){
                this.$statusChatting.style.display = 'block';
            } else if(newValue == 'flirting'){
                this.$statusFlirting.style.display = 'block';

            }
        }
    }
}
window.customElements.define('user-actions', UserAction);