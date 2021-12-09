
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through all its children <Route> element and renders the first one
          whose path matches the current URL. Use a <Switch> any time you have multiple routes,
          but you want onle one of them to render as a time */}
              {/* Auth(1,2,3인자) //2번째 인자 option :null => 아무나 출입이 가능한 페이지
                                  //option : true => 로그인한 유저만 출입이 가능한 페이지
                                  //option: false => 로그인한 유저는 출입 불가능한 페이지 */}

        <Switch>
          <Route exact path="/" component={Auth(LandingPage,null)} />
          <Route exact path="/login"  component={Auth(LoginPage, false)} /> 
          <Route exact path="/register" component={Auth(RegisterPage,false)} />
        </Switch>        
      </div>
    </Router>
  );
}


export default App;
