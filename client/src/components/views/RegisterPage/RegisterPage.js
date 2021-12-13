
import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from'../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

function RegisterPage(props) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const onEmailHandler =(event) =>{
        setEmail( event.currentTarget.value)
    }
    const onNameHandler =(event)=>{
        setName(event.currentTarget.value)
    }
    const onPasswordHandler =(event)=>{
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler =(event)=>{
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler =(event)=>{
        event.preventDefault(); //아래를 실행하기위해 refresh되는 것 방지
        console.log('Email', Email)   
        console.log('Password', Password)
        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }
        let body={
            email: Email,
            name:Name,
            password: Password
        }
        //redux 1)dispatch 사용, action은 registerUser
        dispatch(registerUser(body))
            .then(response =>{
                if(response.payload.success){
                    props.history.push('/login')   //page이동시 사용   => error(21.12.4)
                   
                }else{
                    alert('Failed to sign up')
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

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <label>ConfirmPassword</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                <br/>
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}
export default withRouter(RegisterPage)
