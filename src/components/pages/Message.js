import Model from "../UI/Model"
import htmlToFormattedText from 'html-to-formatted-text';
import styles from './Message.module.css';

const Message=(props)=>{
      const text=htmlToFormattedText(props.item.message);
      const email=localStorage.getItem('Email');
    return(
        <Model onCancel={props.onCancel}>
            <div className={styles.container}>
                <div className={styles.closeContainer} onClick={props.onCancel}><span className={styles.close}>Close</span></div>
                <div className={styles.topsection}>
                    <span className={styles.to}><h3>To: </h3>{email}</span>
                    <span className={styles.from}><h3>From: </h3>{props.item.email}</span>
                </div>
                <div className={styles.middlesection}>
                    <span className={styles.subject}><h3>subject: </h3>{props.item.subject}</span>
                </div>
                <div className={styles.bottomsection}>
                    <span className={styles.body}>{text}</span>
                </div>
            </div>
        </Model>
    )
};

export default Message;