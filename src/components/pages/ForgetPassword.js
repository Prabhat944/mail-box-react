import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import {useRef} from 'react';

const Login=()=>{
 const emailRef=useRef();
 const history=useHistory();
 
 const ForgetPasswordHandler=async(event)=>{
    event.preventDefault();
    const email=emailRef.current.value;
    
    const Url='https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDfEOGsnYBHkldzzfQzt2iV0-mP_YPZtGY';
    await fetch(Url,{
        method:'POST',
        body:JSON.stringify({
            requestType:"PASSWORD_RESET",
            email:email
        }),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>{
        if(res.ok){
          res.json().then((data)=>{
            alert('Password reset link sent to your email',data.email);
            history.replace('/login');
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
             <img src='/asset/corner.jpg' alt='corner'/>
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={ForgetPasswordHandler}>
                <div className={styles.loginType}><span className={styles.type}>{'Forget Password'}</span></div>
                <div className={styles.inputs}>
                    <input type='text' placeholder='Email' ref={emailRef} required/>
                </div>
                <div className={styles.btn}>
                    <div className={styles.btnType}>
                        <button>{'Send Reset Link'}</button>
                        <span className={styles.forget} onClick={()=>history.push('/login')}>signIn? press here</span>
                    </div>
                </div>
            </form>
            <div className={styles.userType}><span onClick={()=>history.push('/login')}>Login or SignUp </span></div>
        </div>
        </div>
    )
};

export default Login;