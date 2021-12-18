
import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {auth} from '../_actions/user_action';

export default function foo(SpecificComponent, option,adminRoute = null) {
    //option :null => 아무나 출입이 가능한 페이지
    //option : true => 로그인한 유저만 출입이 가능한 페이지
    //option: false => 로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props){

        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth())
             .then(response =>{
                console.log('auth.js',response);
                
                //로그인 하지않은 상태
                if(!response.payload.isAuth){  //isAuth가 false이면 고그 하지 않은 상태
                    if(option){  //option === true은 로그인한 자만 들어갈 수있는 페이지
                        props.history.push('/login')   
                    }
                }else{  //isAuth가 true
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isdAdmin){   //adminRoute는 관리자만 들어갈 수있는 페이지 이고, isAdmin 이 false이면
                        props.history.push('/')
                    }else{
                        if(option === false)  //로그인한 유저가 출입 불가능한 페이지, Register,login page
                            props.history.push('/')
                        }
                    }
                })
                            
        }, )   //[])

        return (
        <SpecificComponent />
        )
      
    }
    return AuthenticationCheck
}
