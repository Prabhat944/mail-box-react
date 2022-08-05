import Model from "../UI/Model"
import parse from 'html-react-parser';
import styles from './Message.module.css';

const Message=(props)=>{
      
    return(
        <Model onCancel={props.onCancel}>
            <div className={styles.container}>
                <div className={styles.closeContainer} onClick={props.onCancel}><span className={styles.close}>Close</span></div>
                <div className={styles.topsection}>
                    <span className={styles.to}><h3>To: </h3>{props.item.reciever}</span>
                    <span className={styles.from}><h3>From: </h3>{props.item.sender}</span>
                </div>
                <div className={styles.middlesection}>
                    <span className={styles.subject}><h3>subject: </h3>{props.item.subject}</span>
                </div>
                <div className={styles.bottomsection}>
                    <span className={styles.body}>{parse(props.item.message)}</span>
                </div>
                <div className={styles.delete}><button onClick={props.delete}>Delete</button></div>
            </div>
        </Model>
    )
};

export default Message;