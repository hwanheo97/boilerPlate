

import {combineReducers} from 'redux';
import user from './user_reducer';
//import comment from './comment/comment_reducer';

const rootReducer = combineReducers({
   user
  // comment
})
export default rootReducer;


//stote 에 state값을 변경 시키는 reducer가 여러개 있음
//로그인, register 는 user_reducers 
//User Reduder, Post Reducer, Subscribe Reducer 등등
//combineReducers({ , , ,}) => RootReducer 가 하나로 합쳐준다