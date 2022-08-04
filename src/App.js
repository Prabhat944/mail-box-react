import {Switch,Route, Redirect} from 'react-router-dom';
import Layout from "./components/layout/Layout";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import ForgetPassword from './components/pages/ForgetPassword';
import NotReady from './components/pages/NotReady';
import { useEffect,useState } from 'react';
import {useSelector} from 'react-redux';

const token=localStorage.getItem('Token');
function App() {
  const [isLogin,setIsLogin]=useState(token?true:false);
  const login=useSelector(state=>state.login);
  useEffect(()=>{
  if(login){
    setIsLogin(true)
  }
  },[login])
  const LogoutHandler=()=>{
    setIsLogin(false);
  }
  console.log(isLogin);
  return (
     <Layout isLogin={isLogin} logout={LogoutHandler}>
      <Switch>
        <Route path='/' exact>
            <Redirect to='/login'/>
        </Route>
        <Route path='/login' exact>
            <Login/>
          </Route>
        <Route path='/login/forgetpassword'>
          <ForgetPassword />
        </Route>
        <Route path='/login/home' exact>
            {isLogin && <Home/>}
            {!isLogin && <Redirect to='/login'/>}
        </Route>
        <Route path='*'>
          {isLogin && <NotReady/>}
          {!isLogin && <Redirect to='/login'/>}
        </Route>
      </Switch>
     </Layout>
  );
}

export default App;
