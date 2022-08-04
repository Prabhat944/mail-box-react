import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import {useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

const Login=()=>{
    const [isLogin,setIsLogin]=useState(true);
 const emailRef=useRef();
 const passwordRef=useRef();
 const confirmPasswordRef=useRef();
 const history=useHistory();
 const dispatch=useDispatch()
 
 const LoginHandler=async(event)=>{
    event.preventDefault();
    const email=emailRef.current.value;
    const password=passwordRef.current.value;
    const confirmpassword=isLogin?'':confirmPasswordRef.current.value;
    if(password !== confirmpassword && !isLogin){
        alert('Please Enter Same Password');
        return;
    }
    const Url=isLogin?'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfEOGsnYBHkldzzfQzt2iV0-mP_YPZtGY':'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfEOGsnYBHkldzzfQzt2iV0-mP_YPZtGY';
    await fetch(Url,{
        method:'POST',
        body:JSON.stringify({
            email:email,
            password:password,
            returnSecureToken:true
        }),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>{
        if(res.ok){
          res.json().then((data)=>{
            setIsLogin(true);
            console.log(isLogin?'Login Successful':'User has successfully signed up');
            
            dispatch(authActions.loginHandler({
                token:data.idToken,
                email:data.email
            }))
              
            history.replace('/login/home');
          })
        }else{
            return res.json().then(data=>{
                let error='Authentication Failed';
                if(data && data.error && data.error.message){
                    error=data.error.message;
                    }
                    alert(error);
            })
        }
    })
 }

    return(
        <div className={styles.container}>
             <img src='corner.jpg' alt='corner'/>
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={LoginHandler}>
                <div className={styles.loginType}><span className={styles.type}>{isLogin?'Login':'SignUP'}</span></div>
                <div className={styles.inputs}>
                    <input type='text' placeholder='Email' ref={emailRef} required/>
                    <input type='password' placeholder='Password' ref={passwordRef} required/>
                    {!isLogin && <input type='password' placeholder='Confirm Password' ref={confirmPasswordRef} required/>}
                </div>
                <div className={styles.btn}>
                    <div className={styles.btnType}>
                        <button>{isLogin?'login':'SignUp'}</button>
                        {isLogin && <span className={styles.forget} onClick={()=>history.push('/login/forgetpassword')}>forget password</span>}
                        
                    </div>
                </div>
            </form>
            <div className={styles.userType}><span onClick={()=>setIsLogin((prev)=>!prev)}>{isLogin?"Don't have an account?SignUp":'Have an account?SignIn'}</span></div>
        </div>
        </div>
    )
};

export default Login;