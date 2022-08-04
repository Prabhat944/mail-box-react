import {useRef} from 'react';
import JoditEditor from 'jodit-react';
import './TextEditor.css';


const TextEditor=({setValue,config})=>{
const editor=useRef(null);

    return(
        <JoditEditor ref={editor} onChange={content=>setValue(content)} config={config}/>
    )
};

export default TextEditor;