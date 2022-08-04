import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react';
import styles from './Inbox.module.css';
import Message from './Message';
import { updateSeenMsg } from '../../store/MailAction';
import { userAction } from '../../store/userServer';
const Inbox=()=>{
    const [openmessage,setOpenmessage]=useState(false);
    const [message,setMessage]=useState('');
    const dispatch=useDispatch();
    const open=(item)=>{
       setOpenmessage(true);
       setMessage(item);
    
       if(item.seen === false){
        const user=item.email.replace(/[^a-zA-Z0-9]/g,'');
        dispatch(updateSeenMsg(user,item.id,{...item,seen:true}));
        dispatch(userAction.updatecount(item));
       }
    }
    const inboxItem=useSelector(state=>state.user.inbox);
    const inboxMessage=inboxItem.map((item)=>(
                <li 
                className={styles.messageList}
                onClick={()=>open(item)} 
                key={item.id} 
                item={item}>
                <div className={item.seen? styles.seen : styles.notseen}></div>
                {item.email} ({item.subject})
                </li>))

          
return(
    <div className={styles.container}>
        <div className={styles.inbox}>
            <ul className={styles.message}>
                {inboxMessage}
            </ul>
        </div>
        {openmessage && <Message item={message} onCancel={()=>setOpenmessage(false)}/>}
        
    </div>
)

};

export default Inbox;