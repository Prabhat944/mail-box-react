import { useDispatch } from 'react-redux';
import { NavLink,useHistory } from 'react-router-dom';
import { authActions } from '../../store';
import styles from './Navigation.module.css';
const Navigation=(props)=>{
    const history=useHistory();
    const dispatch=useDispatch();
    const LogoutHandler=()=>{
        dispatch(authActions.logoutHandler());
        props.logout();
        history.replace('/login');
    }
    return(
        <header className={styles.navigation}>
            <div className={styles.logoContainer}><span className={styles.logo}>@MailBox</span></div>
            <div className={styles.pagesContainer}>
                <ul>
                    <li className={styles.home}><NavLink activeClassName={styles.active} className={styles.link} to='/login/home'>Home</NavLink></li>
                    <li className={styles.product}><NavLink activeClassName={styles.active} className={styles.link} to='/login/products'>Products</NavLink></li>
                    <li className={styles.about}><NavLink activeClassName={styles.active} className={styles.link} to='/login/about'>About Us</NavLink></li>
                </ul>
            </div>
            <div className={styles.isLogin}>
                <span className={styles.login} onClick={LogoutHandler}>{props.isLogin?'Logout':'Login'}</span></div>
        </header>
    );
};

export default Navigation;