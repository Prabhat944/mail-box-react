import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react';
import styles from './Inbox.module.css';
import Message from './Message';
import { DeleteFromInbox, updateSeenMsg } from '../../store/MailAction';
import { userAction } from '../../store/userServer';
const Inbox=()=>{
    const [openmessage,setOpenmessage]=useState(false);
    const [message,setMessage]=useState('');
    const dispatch=useDispatch();
    const open=(item)=>{
       setOpenmessage(true);
       setMessage(item);
       
       if(item.seen === false){
        const user=item.reciever.replace(/[^a-zA-Z0-9]/g,'');
        dispatch(updateSeenMsg(user,item.id,{...item,seen:true}));
        dispatch(userAction.updatecount(item));
       }
    }
    const DeleteHandler=(item)=>{
        const user=item.reciever.replace(/[^a-zA-Z0-9]/g,'');
        dispatch(DeleteFromInbox(user,item.id));
        dispatch(userAction.updatestatus({type:'loading',msg:'...Loading'}));
        dispatch(userAction.deletenessage(item));
        setOpenmessage(false);
    }
    const inboxItem=useSelector(state=>state.user.inbox);
    const inboxMessage=inboxItem.map((item)=>(
                <li 
                className={styles.messageList}
                key={item.id} 
                item={item}>
                <div className={item.seen? styles.seen : styles.notseen}></div>
                <span onClick={()=>open(item)} className={styles.mailText}><h3>{item.sender}</h3> :- {item.subject}</span>
                <span className={styles.delete} onClick={()=>DeleteHandler(item)}>delete</span>
                </li>))

          
return(
    <div className={styles.container}>
        <div className={styles.inbox}>
            <ul className={styles.message}>
                <div className={styles.title}><span>RECIEVED MESSAGES</span></div>
                {inboxMessage}
            </ul>
        </div>
        {openmessage && <Message item={message} onCancel={()=>setOpenmessage(false)} delete={()=>DeleteHandler(message)}/>}
        
    </div>
)

};

export default Inbox;