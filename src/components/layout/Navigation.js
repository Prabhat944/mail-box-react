import styles from './Navigation.module.css';
const Navigation=()=>{
    return(
        <header className={styles.navigation}>
            <div className={styles.logoContainer}><span className={styles.logo}>MailBox</span></div>
            <div className={styles.pagesContainer}>
                <ul>
                    <li className={styles.home}>Home</li>
                    <li className={styles.product}>Products</li>
                    <li className={styles.about}>About Us</li>
                </ul>
            </div>
            <div className={styles.isLogin}></div>

        </header>
    );
};

export default Navigation;