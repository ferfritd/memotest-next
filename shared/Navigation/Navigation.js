import Link from 'next/link'

import styles from 'shared/Navigation/Navigation.module.css'

export default function Navigation({closeSideDrawerHandler}) {
    return (
        <nav className={styles.barNav}>
            <ul className={styles.navigation}>
                <li>
                    <Link href="/" onClick={closeSideDrawerHandler} >
                        <a>
                            Home
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/game" onClick={closeSideDrawerHandler}>
                        <a>
                            New Game
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/my-games" onClick={closeSideDrawerHandler} >
                        <a>
                            My Games
                        </a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
