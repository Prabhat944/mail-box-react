import { useSelector } from 'react-redux';
import styles from './Inbox.module.css';
const Inbox=()=>{
    const OpenMessage=(item)=>{
        console.log('Message opened');
    }
    const inboxItem=useSelector(state=>state.user.inbox);
    console.log(inboxItem);
    const inboxMessage=inboxItem.map((item)=><li onClick={OpenMessage(item)} key={item.id} id={item.id}>{item.email} ({item.subject})</li>)
return(
    <div className={styles.container}>
        <div className={styles.inbox}>
            <ul className={styles.message}>
                <li>Name  Message</li>
                <li>Name Message</li>
                {inboxMessage}
            </ul>
        </div>
    </div>
)

};

export default Inbox;