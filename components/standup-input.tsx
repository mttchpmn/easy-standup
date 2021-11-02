import React, {useState} from 'react';
import {InputConverter} from "./convert-input";
import styles from '../styles/Home.module.css'

const StandupInput = () => {
    const [userInput, setUserInput] = useState("Type your update here...");
    const [output, setOutput] = useState("");
    const converter = new InputConverter();

    return (<div>
        <div>
            <div>
                <textarea className={styles.userInput} name={"userInput"} value={userInput} onChange={e => setUserInput(e.target.value)}/>
            </div>

            <button onClick={() => setOutput(converter.convertText(userInput))}>Convert to Standup update</button>
            {/*<p>Output</p>*/}
            {/*<pre>{output}</pre>*/}
            <div>{converter.convertHtml(userInput)}</div>
        </div>
    </div>)
}

export default StandupInput;