import { createPortal } from 'react-dom'


import styles from 'shared/Navigation/SideDrawer.module.css'

export default function SideDrawer(props) {

    return createPortal(
        <aside className={styles.sideDrawer}>
            {props.children}
        </aside>, document.getElementById('sideDrawer-hook')
    )
}
