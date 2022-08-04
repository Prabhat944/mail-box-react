import {useState} from 'react';
import MailPage from './MailPage';
import Inbox from './Inbox';
import styles from './Home.module.css';
const Home=()=>{
   const [userinput,setUserInput]=useState({
      newmail:false,
      sentbox:false,
      inbox:false
   })
   console.log(userinput.newmail ,userinput.sentbox, userinput.inbox)
    return(
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.welcome}>
                       <span className={styles.welcomeMsg}>Welcome to your mail box !!!</span>
                    </div>
                </div>
                
                <div className={styles.userSection}>
                    <div className={styles.userSectionLeft}>
                        <div className={styles.left}>
                            <button onClick={()=>{setUserInput({newmail:true,sentbox:false,inbox:false})}}>Send New Mail</button>    
                        </div>
                        <div className={styles.left}>
                            <button onClick={()=>{setUserInput({newmail:false,sentbox:true,inbox:false})}}>Sent Box</button>    
                        </div>
                        <div className={styles.left}>
                            <button onClick={()=>{setUserInput({newmail:false,sentbox:false,inbox:true})}}>Inbox</button>    
                        </div>
                    </div>
                    <div className={styles.userSectionRight}>
                        {userinput.newmail && <MailPage/>}
                        {userinput.sentbox && <p>SentBox</p>}
                        {userinput.inbox && <Inbox/>}
                    </div>
                
                </div>
            </div>
        
    )
};
export default Home;