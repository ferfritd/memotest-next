import { Fragment, useState } from 'react'

import styles from 'game/components/Input.module.css'



export default function Input({element, type, placeholder, onInput, id, value, classes, showError, errorMessage}) {

    const [error, setError] = useState(false)

    const inputChangeHandler = (e) => {
        const value = e.target.value
        onInput(id, value)
        setError(false)
    }

    const inputTouchHandler = (e) => {
        if(!e.target.value){
            setError(true)
        }
    }

    const HTMLInput = element === 'textarea' ? <textarea className={classes} style={(showError & error) ? {border:'1px solid #ffc107'} :  null} value={value} onChange={inputChangeHandler} onBlur={inputTouchHandler} placeholder={placeholder}/> : <input className={classes} style={(showError & error) ? {border:'1px solid #ffc107'} :  null} type={type} value={value} onChange={inputChangeHandler} onBlur={inputTouchHandler} placeholder={(showError && error) ? errorMessage : placeholder}/>

    
    return (
        <Fragment>
            {HTMLInput}
        </Fragment>    
        
    )
}
