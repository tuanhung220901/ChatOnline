import { getDataFromDoc } from "../ultils.js";

export async function createConversation(users){
    let response = await firebase.firestore().collection('conversations').add({
        users: users,
        messages : []
    });
    return response;
}
export function listenConversation(id,callback){
    firebase.firestore().collection('conversations').doc(id).onSnapshot((response) => {
        //console.log(response);
        let data = getDataFromDoc(response);
        callback(data);
    });
}
export async function SendMessage(conversationId, messageContent){
    let message = {
        content: messageContent,
        userId: firebase.auth().currentUser.uid,
        dateModified: new Date().toISOString(),
    };
    await firebase.firestore().collection('conversations').doc(conversationId).update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    });
}