import React from 'react'

import styles from 'shared/UI/Box.module.css'

export default function Box(props) {
    return (
        <div className={`${styles.box} ${props.extraClasses || ""}`}>
            {props.children}
        </div>
    )
}
