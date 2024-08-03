// LoginPage.js
// Hierarchy: LoginPage
import React, { useState, useContext } from 'react';
import { UserContext } from '../../contextVariables/UserContext';
import styles from './LoginPage.module.css'; // Importing CSS module

// Import user information from an external JSON or JS file
import { registeredUserInformation } from './registeredUserInformation';

export const LoginPage = () => {
    const { setCurrentUsernameStr } = useContext(UserContext);
    const [enteredUsernameStr, setEnteredUsernameStr] = useState("");

    const handleLogin = () => {
        if (enteredUsernameStr in registeredUserInformation) {
            setCurrentUsernameStr(enteredUsernameStr);
            alert('Welcome ' + enteredUsernameStr);
            setEnteredUsernameStr('');
        } else {
            alert("Sorry, we do not recognise you.");
        }
    };

    return (
        <div className={styles.loginPageDiv} aria-live="polite">
            <div className={styles.betaBannerDiv}>
                Beta Version - Features and Improvements Coming Soon!
            </div>
            <h2 className={styles.pageHeadingH2}>Enter your login details</h2>
            <input 
                type="text"
                maxLength="50"
                placeholder="Enter your username"
                aria-label="Username"
                className={styles.usernameInput}
                value={enteredUsernameStr}
                onChange={(e) => setEnteredUsernameStr(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleLogin();
                    }
                }}
            />
            <button className={styles.enterButton} onMouseOver={() => styles.enterButtonHover} onClick={handleLogin}>
                Enter
            </button>
        </div>
    );
};
