import {ListenAllUsers} from "../models/user.js"
const $template = document.createElement('template');
$template.innerHTML = `
    <div class ="app-stat">
        <div class ="stat">
            <i class="fas fa-users"></i>
            <span class = "free-user-count"> 100 </span>
        </div>
        <div class ="stat">
            <i class="fas fa-comments"></i>
            <span class = "chatting-user-count"> 50 </span>
        </div>
        <div class ="stat">
            <i class="fas fa-heart"></i>
            <span class = "flirting-user-count"> 20 </span>
        </div>
    </div>  
`;
export default class AppStart extends HTMLElement {
    constructor(){
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$free = this.querySelector(".free-user-count");
        this.$chatting = this.querySelector(".chatting-user-count");
        this.$flirting = this.querySelector(".flirting-user-count");
    }
    connectedCallback(){
        ListenAllUsers((usersData) => {
            console.log(usersData);
            let flirtings = 0;
            let frees = 0;
            let chattings = 0
            for(let data of usersData){
                if(data.status == "free"){
                    frees++;
                }
                else if(data.status == "chatting"){
                    chattings++;
                }
                else flirtings++;
            }
            this.$free.innerHTML = frees;
            this.$chatting.innerHTML = chattings;
            this.$flirting.innerHTML = flirtings;
        });
    }
}
window.customElements.define('app-stat',AppStart);