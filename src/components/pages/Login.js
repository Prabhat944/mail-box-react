import styles from './Login.module.css';
import {useRef} from 'react';

const Login=()=>{
 const emailRef=useRef();
 const passwordRef=useRef();
 const confirmPasswordRef=useRef();

 const LoginHandler=async(event)=>{
    event.preventDefault();
    const email=emailRef.current.value;
    const password=passwordRef.current.value;
    const confirmpassword=confirmPasswordRef.current.value;
    if(password !== confirmpassword ){
        alert('Please Enter Same Password');
        return;
    }
    await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfEOGsnYBHkldzzfQzt2iV0-mP_YPZtGY',{
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
          res.json().then(data=>console.log('User has successfully signed up.'));
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
                <div className={styles.loginType}><span className={styles.type}>SignUP</span></div>
                <div className={styles.inputs}>
                    <input type='text' placeholder='Email' ref={emailRef} required/>
                    <input type='password' placeholder='Password' ref={passwordRef} required/>
                    <input type='password' placeholder='Confirm Password' ref={confirmPasswordRef} required/>
                </div>
                <div className={styles.btn}>
                    <div className={styles.btnType}>
                        <button>SignUp</button>
                        
                    </div>
                </div>
            </form>
            <div className={styles.userType}><span>Have an account?SignIn</span></div>
        </div>
        </div>
    )
};

export default Login;