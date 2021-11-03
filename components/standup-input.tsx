import React, {useRef, useState} from 'react';
import {InputConverter} from "./convert-input";
import styles from '../styles/Home.module.css'

const StandupInput = () => {
    const placeholder = "Type your input here...";
    const [userInput, setUserInput] = useState(placeholder);
    const [showHelp, setShowHelp] = useState(false);
    const converter = new InputConverter();

    const contentRef = useRef(null);

    const copyToClipboard = () => {
        const content = document.getElementById("updateContent")?.innerHTML;

        navigator.clipboard.writeText(content ?? "").then(() => "Copied")
    }

    const clearInput = () =>
    {
       if (userInput === placeholder) setUserInput("") ;
    }

    return (<div>
        <div>
            <div>
                <h2>Your input</h2>
                <textarea className={styles.userInput} name={"userInput"} value={userInput} onClick={clearInput} onChange={e => setUserInput(e.target.value)}/>

            </div>
            <div>

                <button onClick={() => setShowHelp(prev => !prev)}>Toggle help</button>
                {showHelp &&<div>
                    <ul>
                        <li><strong>*</strong> = focus item</li>
                        <li><strong>o</strong> = meeting</li>
                        <li><strong>!</strong> = blocker</li>
                        <li><strong>{"<"}</strong> = completed task</li>
                        <li><strong>-</strong> = current task</li>
                        <li><strong>{">"}</strong> = future task</li>
                        <li><strong>?</strong> = question</li>
                    </ul>
                </div>}
            </div>
            {/*TODO */}
            {/*<button onClick={() => copyToClipboard()}>Copy update to clipboard</button>*/}
            <div className={styles.updateContentContainer}>
                <h2>Your update</h2>
                <div ref={contentRef} id={"updateContent"} className={styles.updateContent}>{converter.convertHtml(userInput)}</div>
            </div>
        </div>
    </div>)
}

export default StandupInput;