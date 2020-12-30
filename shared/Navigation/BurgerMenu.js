import styles from 'shared/Navigation//BurgerMenu.module.css'

export default function BurgerMenu({openSideDrawerHandler}) {
    return (
        <div onClick={openSideDrawerHandler} className={styles.burgerMenu}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
