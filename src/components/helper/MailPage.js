import styles from './MailPage.module.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRef, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { SendMail, SentBoxMsg } from '../../store/MailAction';
import { userAction } from '../../store/userServer';


const MailPage=(props)=>{
    const dispatch=useDispatch();
    const [text,setText]=useState('');
    const EmailRef=useRef();
    const SubjectRef=useRef();
    const user=useSelector(state=>state.auth.email);
    const prevSentMsg=useSelector(state=>state.user.sentBox);

    const SendMailHandler=(event)=>{
        event.preventDefault();
        const email=EmailRef.current.value;
        const subject=SubjectRef.current.value;
        const message=text;
        const body={
            sender:user,
            reciever:email,
            subject:subject,
            message:message,
            seen:false
        }
        if(user === email){
            alert('Please Choose a Different Mail othen than yourself !!');
            return;
        }
        const ToEmail=email.replace(/[^a-zA-Z0-9]/g,'');
        const userEmail=user.replace(/[^a-zA-Z0-9]/g,'');
        dispatch(userAction.updatestatus({type:'loading',msg:"...Loading"}));
       dispatch(SendMail(ToEmail,body));
       dispatch(SentBoxMsg(userEmail,[...prevSentMsg,{...body,id:Math.random().toString()}]));
       EmailRef.current.value='';
       SubjectRef.current.value='';
       setText('');
       
    }
    return(
        <div className={styles.container}>
            <form className={styles.form} onSubmit={SendMailHandler}>
                <div className={styles.toemail}>
                    <span className={styles.to}>To</span>
                    <input type='email' className={styles.email} ref={EmailRef} required/>
                    <span className={styles.sometext}>Cc/Bcc</span>
                </div>
                <div className={styles.subject}><input  type='text' placeholder='Subject' ref={SubjectRef} required/></div>
                <div className={styles.middlebody} >
                    <CKEditor 
                        editor={ClassicEditor}
                        data={text}
                        onChange={(event,editor)=>{
                            const data=editor.getData()
                            setText(data)}}
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