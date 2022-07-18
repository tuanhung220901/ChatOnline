// class Calcular{
//     static sum(a, b){
//         return a + b;
//     }
//     static subtract(a, b){
//         return a - b;
//     }
//     multiply(a, b){
//         return a * b;
//     }
// }
// // let calc = new Calcular();
// // calc.sum(1, 2);
// console.log(Calcular.sum(1, 2)); 
// Calcular.subtract(5, 3);
import Navbar from "./Navbar.js";
import ComicContainer from "./ComicContainer.js";
import ComicList from "./comicList.js";
import data from "./data.js"
import dataTest from "./dataTest.js";
// let json = JSON.stringify(data);
// console.log(json);
// let $comicList = document.getElementById('my-list');
// $comicList.setAttribute('comics',JSON.stringify(data));
let json = JSON.stringify(dataTest);
console.log(json);
let $comicList = document.getElementById('my-list');
$comicList.setAttribute('comics',json);
// class Person{
//     firstName;
//     lastName;
//     _age;
//     constructor(firstName,lastName){
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
//     get fullName(){
//         return this.firstName + " " + this.lastName;
//     }
//     set age(a){
//         if(a < 0 || a > 150){
//             console.log("sai rồi");
//         }
//         else{
//             this._age = a;
//         }
//     }
//     get age(){
//         return this._age;
//     }
// }
// let ngocTrinh = new Person("Trinh","Ngọc");
// ngocTrinh.age = 22;
// console.log(ngocTrinh.age);
// // phương thức trùng tên khong sao.
// let $comicContainer = new ComicContainer();
// // $comicContainer.setAttribute('name',"naruto");
// // document.body.appendChild($comicContainer);
// let $content = document.querySelector('.web');
// $content.appendChild($comicContainer);