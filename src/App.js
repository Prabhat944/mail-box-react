import {Switch,Route, Redirect} from 'react-router-dom';
import Layout from "./components/layout/Layout";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import NotReady from './components/pages/NotReady';
import { useEffect,useState } from 'react';
import {useSelector} from 'react-redux'

function App() {
  const [isLogin,setIsLogin]=useState(false);
  const login=useSelector(state=>state.login);
  useEffect(()=>{
  if(login){
    setIsLogin(true)
  }
  },[login])
  console.log(isLogin);
  return (
   
    <Layout isLogin={isLogin}>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/login'/>
        </Route>
         <Route path='/login' exact>
            <Login/>
         </Route>
         <Route path='/login/home' exact>
            {isLogin && <Home/>}
            {!isLogin && <Login/>}
         </Route>
         <Route path='*'>
          <NotReady/>
         </Route>
      </Switch>
    </Layout>
  );
}

export default App;
