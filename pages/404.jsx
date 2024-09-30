import React from 'react';
import styles from "../styles/scss/404.module.scss";

const Custom404 = () => {
    return (
        <div className={styles.textCenter}>
            <h1>404 - Page Not Found</h1>
            <img src="/img/button_h.png" alt="Logo" className={styles.logo} />
        </div>
    );
}

export default Custom404;
