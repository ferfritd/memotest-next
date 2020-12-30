import { createPortal } from 'react-dom'

import Button from 'shared/UI/Button'

import styles from 'shared/UI/Modal.module.css'

export default function Modal({onAccept, acceptText, onCancel, cancelText, children, classes, transition, extraStyles}) {

    const modal = <div role="modal" style={extraStyles} className={` modal ${classes || ''} ${transition || ''}`}>
                    <>
                        {children}
                        <div className={styles.modalButtons}>
                            {acceptText &&                                  <Button classes={`${styles.button} ${styles.buttonMain}`} click={onAccept}>{acceptText}</Button>
                            }
                            {cancelText &&
                            <Button classes={`${styles.button} ${styles.buttonInverted}`} click={onCancel}>{cancelText}</Button>
                            }
                        </div>
                    </>
                 </div>

    return createPortal(modal, document.getElementById('modal-hook'))
}
