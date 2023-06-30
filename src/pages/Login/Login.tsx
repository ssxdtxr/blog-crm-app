import React from 'react';
import styles from "./Login.module.scss"
import {NavLink} from "react-router-dom";
import email from "../../images/email.svg"
import password from "../../images/password.svg"

export const Login = () => {
    return (
        <div className={styles.login}>
            <div className={styles.loginForm}>
                <form>
                    <h1>Login to your Account</h1>
                    <div className={styles.inputs}>
                        <div className={styles.inputItem}>
                            <img src={email} alt="email"/>
                            <input placeholder="Email" type="text"/>
                        </div>
                        <div className={styles.inputItem}>
                            <img src={password} alt="password"/>
                            <input placeholder="Password" type="password"/>
                        </div>
                    </div>
                    <div className={styles.buttonPanel}>
                        <button>LOG IN</button>
                        <p className={styles.newAcc}>Don’t have account? <NavLink className={styles.active} to="/sign-in">Create an account</NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

