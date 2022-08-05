import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SentBoxMsg } from '../../store/MailAction';
import styles from './SentBox.module.css';
import Message from './Message';

const SentBox=(props)=>{
    const dispatch=useDispatch();
    const [openMsg,setOpenMsg]=useState(false);
    const [message,setMessage]=useState('');
    const sentMsg=useSelector(state=>state.user.sentBox);
    const email=useSelector(state=>state.auth.email);

    const OpenMessage=(item)=>{
        setOpenMsg(true);
        setMessage(item);
    }
    const MessageDeleteHandler=(message)=>{
          const updatedMsg=sentMsg.filter(msg=>msg.id !== message.id);
          const user=email.replace(/[^a-zA-Z0-9]/g,'');
          dispatch(SentBoxMsg(user,updatedMsg));
          setOpenMsg(false);
          
    }
    
    const sentList=sentMsg.map((item)=>(
        <li 
        className={styles.sent}
        key={item.id} 
        item={item}>
            <div className={styles.text}> 
                <span onClick={()=>OpenMessage(item)} className={styles.mailText}><h3>{item.reciever}</h3> :- {item.subject}</span>
                <span onClick={()=>MessageDeleteHandler(item)} className={styles.delete}>delete</span>
            </div>
        </li>
    ))

    return(
        <div className={styles.container}>
            <div className={styles.sentbox}>
                <ul className={styles.message}>
                    <div className={styles.title}><span>SENT MESSAGES</span></div>
                    {sentList}
                </ul>
            </div>
            {openMsg && <Message item={message} delete={()=>MessageDeleteHandler(message)} onCancel={()=>setOpenMsg(false)} />}
        </div>
    );
};

export default SentBox;