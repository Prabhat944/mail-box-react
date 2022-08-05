import {Switch,Route, Redirect} from 'react-router-dom';
import Layout from "./components/layout/Layout";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import ForgetPassword from './components/pages/ForgetPassword';
import NotReady from './components/pages/NotReady';
import { useEffect,useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { updateinbox} from './store/MailAction';
import { userAction } from './store/userServer';

const token=localStorage.getItem('Token');
function App() {
  const [isLogin,setIsLogin]=useState(token?true:false);
  const dispatch=useDispatch();
  const login=useSelector(state=>state.auth.login);
  const email=useSelector(state=>state.auth.email);
  const update=useSelector(state=>state.user.update);

  useEffect(()=>{
    if(email)
    {const user=email.replace(/[^a-zA-z0-9]/g,'');
    setTimeout(()=>{
      if(user){dispatch(updateinbox(user));}
       },500);
    setTimeout(()=>{
        dispatch(userAction.update());
       },10000);}
  },[dispatch,email,update])

  useEffect(()=>{
  if(login){setIsLogin(true)}
  },[login])

  const LogoutHandler=()=>{
    setIsLogin(false);
  }


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
