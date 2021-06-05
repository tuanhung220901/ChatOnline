import { listenConversation } from "../models/conversation.js";
import { ListenCurrentUser } from "../models/user.js";

const $template = document.createElement('template');
$template.innerHTML = `
    <div class = 'chat-screen'>
        <div class = "aside-left">
            <app-stat> </app-stat>
            <user-actions></user-actions>
        </div>
        <div class = "chat-container">
            <message-list></message-list>
            <send-message-form></send-message-form>
        </div>
    <div>    
`;
let fakeMessage = [
    {content: 'hello', userId: 'id người gửi 1', dataModified: "2021/06/01"},
    {content: 'chào cậu', userId: 'id người gửi 2', dataModified: "2021/06/01"},
    {content: 'cậu ăn cơm chưa', userId: 'id người gửi 1', dataModified: "2021/06/01"},

]
export default class ChatScreen extends HTMLElement {
    constructor(){
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$userAction = this.querySelector('user-actions');
        this.$messageList = this.querySelector('message-list');
        this.$sendMessageForm = this.querySelector('send-message-form');
    }
    connectedCallback(){
        ListenCurrentUser((data) => {
            console.log(data);
            this.$userAction.setAttribute('status',data.status);
            this.$sendMessageForm.setAttribute('conversation-id',data.currentConversationId);

            if(data.status == "chatting") {
                listenConversation(data.currentConversationId, (data) =>{
                   // console.log(data);
                    this.$messageList.setAttribute('messages',JSON.stringify(data.messages));
                });
            }
            else if(data.status == "free"){
                this.$messageList.setAttribute('messages','[]');
            }
        });
        // Json: kiểu dữ liệu dạng string có quy tắc --> phân tích --> 1 mảng // 1 object
    }
}
window.customElements.define('chat-screen',ChatScreen);