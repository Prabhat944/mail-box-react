import {useState} from 'react';
import MailPage from '../helper/MailPage';
import Inbox from '../helper/Inbox';
import styles from './Home.module.css';
import { useSelector } from 'react-redux';
import SentBox from '../helper/SentBox';

const Home=()=>{
   const [userinput,setUserInput]=useState({
      newmail:false,
      sentbox:false,
      inbox:false
   })
    const unseen=useSelector(state=>state.user.unseenMsg);

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
                            <button onClick={()=>{setUserInput({newmail:false,sentbox:false,inbox:true})}}>Inbox<span className={styles.unseen}>{unseen}</span></button>    
                        </div>
                    </div>
                    <div className={styles.userSectionRight}>
                        {userinput.newmail && <MailPage/>}
                        {userinput.sentbox && <SentBox />}
                        {userinput.inbox && <Inbox/>}
                    </div>
                
                </div>
            </div>
        
    )
};
export default Home;