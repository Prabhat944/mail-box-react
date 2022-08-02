import styles from './Layout.module.css';
import Navigation from './Navigation';


const Layout=(props)=>{

    return(
        <>
        <Navigation />
        <div className={styles.body}>{props.children}</div>
        </>
    )
};

export default Layout;