import InputWrapper from "./components/InputWrapper.js";
import RegisterForm from "./components/RegisterForm.js";
import LoginForm from "./components/LoginForm.js";
import { authStateChaged} from "./models/user.js";
import AppStart from "./components/AppStart.js";
import UserAction from "./components/UsersAction.js";
import AuthScreen from "./screens/AuthScreens.js";
import ChatScreen from "./screens/ChatScreen.js";
import MessageContainer from "./components/MessageContainer.js";
import MessageList from"./components/MessageList.js";
import SendMessageForm from "./components/SendMessageForm.js";
function hello(name){
    return "Xin chào" + name;
}
// function saySomething(cb){
//     let name = "Ngoc Trinh";
//     console.log(cb(name));
// }
// saySomething(function(name){
//     return "hi " + name;
// });
authStateChaged();
let $registerForm = new RegisterForm();
console.log($registerForm.dataTrave);
