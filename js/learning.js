// create -> add

import { getDataFromDocs } from "./ultils.js";



// read 
/*
    - lấy document thông qua id
    async function getDocById(id){
        let response = await firebase.firestore().collection("users").doc(id).get();
        console.log(response.data());
    }
    getDocById("6l7gN4LDjsBf9P7pjQRh");

    - lấy tất cả documentes có trong collection
    
    async function getAllDocs() {
        let response = await firebase.firestore().collection("users").get();
        console.log(getDataFromDocs(response.docs));
    }
    getAllDocs();

    - lây các document thỏa mãn điều kiện cho trước: age > 30


*/
async function getDocByCondition(){
    let response = await firebase.firestore().collection("users").where("age", ">=",30).get();
    console.log(getDataFromDocs(response.docs));
}
getDocByCondition();
// update, delete ,on snapshot.