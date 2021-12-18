
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';


export default function foo(state = {},action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
            //break;
        case REGISTER_USER:
            return {...state, register:action.payload}
            //break;
            case AUTH_USER:
                 return {...state, userData:action.payload}  //action.payload에 모든 유저 정보 들어 있음
                //break;
            default:
                return state;
    }

}

// redux 3) action값을 참조해서 state 값 변경시키는 reducer   (previousState, action)=>nextState
// action에서 넘어오는 많은 타입들을 처리하기 위해 switch문 사용

