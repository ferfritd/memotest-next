import {useState} from 'react'

import Logo from 'shared/UI/Logo'
import Navigation from 'shared/Navigation/Navigation'
import BurgerMenu from 'shared/Navigation/BurgerMenu'
import SideDrawer from 'shared/Navigation/SideDrawer'
import Backdrop from 'shared/UI/Backdrop'

import styles from 'shared/Navigation/Header.module.css'

export default function Header(props) {

    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const openSideDrawerHandler = () => {
        setShowSideDrawer(true)
    }

    const closeSideDrawerHandler = () => {
        setShowSideDrawer(false)
    }

    return (
        <header className={styles.header}>
            {showSideDrawer
             && <Backdrop OnCloseBackdrop={closeSideDrawerHandler}/>}
             {showSideDrawer &&
             <SideDrawer>
                 <p className={styles.closeSideDrawer} onClick={closeSideDrawerHandler}>close</p>
                 <Navigation closeSideDrawerHandler={closeSideDrawerHandler} showNavClass='sideDrawerNav'/>
            </SideDrawer>
             }
            <Logo className={styles.logo}/>
            <BurgerMenu openSideDrawerHandler={openSideDrawerHandler}/>
            <Navigation/>
        </header>

    )
}
