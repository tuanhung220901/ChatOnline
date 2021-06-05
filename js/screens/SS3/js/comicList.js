import ComicContainer from "./ComicContainer.js";
// hỏi a Chinh xem cái document.createElement('tempalte') là gì
const $template = document.createElement('template');
$template.innerHTML = `
    <div class = "comic-list">
    
    </div>
`;
export default class ComicList extends HTMLElement{
    constructor(){
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$list = this.querySelector('.comic-list');
    }
    static get observedAttributes(){
        return ['comics'];
    }
    attributeChangedCallback(attrName1, oldValue, newValue) {
        if(attrName1 == 'comics'){
            console.log(newValue);
            let data = JSON.parse(newValue);
            console.log(data);
            for(let comicData of data){
                let $comicContainer = new ComicContainer();
                $comicContainer.setAttribute('id',comicData.id);
                $comicContainer.setAttribute('originalName',comicData.originalName);
                $comicContainer.setAttribute('name',comicData.name);
                $comicContainer.setAttribute('duration',comicData.duration);
                $comicContainer.setAttribute('image',comicData.image);
                $comicContainer.setAttribute('type',comicData.type);
                this.$list.appendChild($comicContainer);
                // if(cnt == 4){
                //     var t = document.createTextNode("This is a paragraph.");  
                //     this.$list.appendChild(t);
                //     cnt = 0;
                // }
            }
        }
    }
}
window.customElements.define('comic-list',ComicList);
// phân tích 1 cái json sẽ được:
// + Object
// + mảng