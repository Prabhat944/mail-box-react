import { Fragment } from "react";
import ReactDOM from 'react-dom';
import styles from './Model.module.css';

const BackDrop=(props)=>{
   return(<div className={styles.backdrop} onClick={props.onCancel}></div>);
}
const ModelOverlay=(props)=>{
    return (<div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>)
}
const Model=(props)=>{
    
    return(
        <Fragment>
            {ReactDOM.createPortal(<BackDrop onCancel={props.onCancel} />,document.getElementById('backdrop'))}
            {ReactDOM.createPortal(<ModelOverlay children={props.children}/>,document.getElementById('overlays'))}
        </Fragment>
    )
};

export default Model;