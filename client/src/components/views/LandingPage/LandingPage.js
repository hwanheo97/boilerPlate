import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';



function LandingPage(props) {

    // useEffect(()=>{
    //     axios.get('/api/hello')  //request를 get 방식으로 서버에 보내기 ,proxy 설치후<=http://localhost:5000/api/hello
    //     .then(response => console.log(response.data))
    // },[])

    const onClickHandler =() =>{
        axios.get('/api/users/logout')
            .then(response =>{
               console.log('logout',response.data);
 
                if(response.data.success){
                    props.history.push('/login')
                }else{
                    alert('로그아웃 하는데 실패 했습니다.')
                }
            })
    }
   
    return (
        <div style={{ display:'flex', justifyContent:'center',alignItems: 'center',
                        width:'100%', height:'100vh'}}>
            <h2 >LandingPage</h2>
          
                <button style={{marginLeft: "10px"}} onClick={onClickHandler}>
                    로그아웃
                </button>
                      
        </div>
    )
}

export default withRouter(LandingPage)
