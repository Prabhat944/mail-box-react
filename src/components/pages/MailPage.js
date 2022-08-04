import styles from './MailPage.module.css';
import TextEditor from '../UI/TextEditor';
import { useEffect, useRef, useState } from 'react';
import { useDispatch} from 'react-redux';
import { SendMail } from '../../store/MailAction';

 
const config={
    buttons:['bold','italic','underline','link','unlink','source','fullsize','redo','undo','ol','ul','font','image'],
    placeholder:'body',
    
};

let user=null;
const MailPage=(props)=>{
    const dispatch=useDispatch();
    const [value,setValue]=useState('');
    const EmailRef=useRef();
    const SubjectRef=useRef();
    console.log(value)
    console.log(user)
    useEffect(()=>{
       if(localStorage.getItem('Email')){
        user=localStorage.getItem('Email').replace(/[^a-zA-Z0-9]/g,'');
       }
    },[])
    const SendMailHandler=(event)=>{
        event.preventDefault();
        const email=EmailRef.current.value;
        const subject=SubjectRef.current.value;
        const message=value;
        const body={
            email:email,
            subject:subject,
            message:message
        }
        const ToEmail=email.replace(/[^a-zA-Z0-9]/g,'');
       dispatch(SendMail(ToEmail,body));
        
    }
    return(
        <div className={styles.container}>
            <form className={styles.form} onSubmit={SendMailHandler}>
                <div className={styles.toemail}>
                    <span className={styles.to}>To</span>
                    <input type='email' className={styles.email} ref={EmailRef}/>
                    <span className={styles.sometext}>Cc/Bcc</span>
                </div>
                <div className={styles.subject}><input  type='text' placeholder='Subject' ref={SubjectRef}/></div>
                <div className={styles.middlebody} >
                    <TextEditor  
                        setValue={setValue}
                        config={config}
                    />
                </div>
                <div className={styles.lowerbody}>
                <div className={styles.btn}>
                        <button>Send</button>
                </div>
                </div>
            </form>
        </div>
    )
};


export default MailPage;