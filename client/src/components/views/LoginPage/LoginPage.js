
import React,{useState} from 'react';
//import  Axios  from 'axios';
import {useDispatch} from 'react-redux';
import {loginUser} from'../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

//import { response } from 'express';

function LoginPage(props) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const dispatch = useDispatch();
    const onEmailHandler =(event) =>{
        setEmail( event.currentTarget.value)
    }
    const onPasswordHandler =(event)=>{
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler =(event)=>{
        event.preventDefault(); //아래를 실행하기위해 refresh되는 것 방지
        //console.log('Email', Email)   //state에 들어 있는 email 정보
        //console.log('Password', Password)
        let body={
            email: Email,
            password: Password
        }
        //redux 1)dispatch 사용, action은 loginUser
        dispatch(loginUser(body))
            .then(response =>{
                if(response.payload.loginSuccess){
                    props.history.push('/')   //page이동시 사용   => error(21.12.4)
                    console.log('loginpage', response);    //response = {type: 'login_user', payload: {…}}
                    
                }else{
                    alert('error')
                }
            })
    }
    return (
        <div style={{ display:'flex', justifyContent:'center',alignItems: 'center',
                      width:'100%', height:'100vh'}}>
            <form style={{display:'flex',flexDirection:'column'}}
                    onSubmit={onSubmitHandler}
                 >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default withRouter(LoginPage)
