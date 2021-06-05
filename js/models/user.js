import { getDataFromDoc, getDataFromDocs } from "../ultils.js";

export async function register(name,email,password){
    try{
        await firebase.auth().createUserWithEmailAndPassword(email,password);
        await firebase.auth().currentUser.updateProfile({
            displayName : name
        })
        // console.log(firebase.auth().currentUser);
        
        let currentUser = firebase.auth().currentUser;

        await firebase.firestore().collection("users").doc(currentUser.uid).set({

            status: 'free',
            currentConversationId: '',
        });

    }
    catch(error){
        alert(error.message)
    }
    console.log("This code must be executed")
}
// xử lý bất đồng bộ là chuyển một đoạn code bất đồng bộ thành đồng bộ.
// setTimeout
// setInterval
// lấy dữ liệu từ bên ngoài API
// await/ aysnc
export async function login(email,password){
    try{
        await firebase.auth().signInWithEmailAndPassword(email,password);
        alert("login successfully");
    }catch(error){
        alert(error.message);
    }
}
export function authStateChaged(){
    // đăng ký, đăng nhập, đăng xuất
    firebase.auth().onAuthStateChanged(function(user){
        if(user != null){
            document.getElementById("app").innerHTML = '<chat-screen></chat-screen>';
        }
        else{
            document.getElementById("app").innerHTML = '<auth-screen></auth-screen>';
        }
    });
}

export async function ListenAllUsers(callback){
    // on Snapshot 
    // let response = await firebase.firestore().collection("users").get();
    // // respone.docs mảng lưu tất cả thông tin của người dùng 
    // let usersData =  getDataFromDocs(response.docs);
    // callback(usersData);

    firebase.firestore().collection("users").onSnapshot((respone) =>{
        let usersData = getDataFromDocs(respone.docs);
        callback(usersData);
    });
}
export async function updateCurrentUsers(data){
    let currentUser = firebase.auth().currentUser;
    await firebase.firestore().collection("users").doc(currentUser.uid).update(data);
    
}
export function ListenCurrentUser(callback){
    let currentUser = firebase.auth().currentUser;
    firebase.firestore().collection('users').doc(currentUser.uid).onSnapshot((response) => {
        console.log(response);
        let data = getDataFromDoc(response);
        callback(data);
    });
}
export async function getFlirtingUsers(){
    let response = await firebase.firestore().collection('users').where('status','==','flirting').get();
    //console.log(getDataFromDocs(response.docs));
    return getDataFromDocs(response.docs);
}
export async function updateUser(id,data){
    await firebase.firestore().collection('users').doc(id).update(data);
}