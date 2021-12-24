import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataToSubmit)  {    //redux 2) action의 body를 매개변수 dataToSubmit로 받기
 const request = axios.post('https://benplate.herokuapp.com/api/users/login', dataToSubmit)   //body를 Axios를 이용해 서버에 보내기
     .then(response => response.data)                  //서버에서 받은 response.data를 request에 저장
        
    return{  //redux 2) action 의 type 과 response(payload) 를 return 하여 reducer에 전달
        type:LOGIN_USER,
        payload: request        //action 의 두번째인자를 payload :request = Email 과 Password
    }
}

export function registerUser(dataToSubmit)  {    //redux 2) action body를 매개변수 dataToSubmit로 받기
    const request = axios.post('https://benplate.herokuapp.com/api/users/register', dataToSubmit)   //body를 Axios를 이용해 서버에 보내기
          .then(response => response.data)                  //서버에서 받은 response.data를 request에 저장
           console.log('dataToSubmit',dataToSubmit);
            console.log('registerUser', request);
       return{  //redux 2) action 의 type 과 response(payload) 를 return 하여 reducer에 전달
           type:REGISTER_USER,
           payload: request        //action 의 두번째인자를 payload :request = Email 과 Password
       }
   }

   export function auth()  {    //redux 2) action quth 보내기 
    const request = axios.get('https://benplate.herokuapp.com/api/users/auth')   //get 메소드로 body 필요없음 , Axios를 이용해 서버에 보내기
        .then(response => response.data)                  //서버에서 받은 response.data를 request에 저장
        
       return{  //redux 2) action 의 type 과 response(payload) 를 return 하여 reducer에 전달
           type:AUTH_USER,
           payload: request        //action 의 두번째인자를 payload :request = Email 과 Password
       }
   }
