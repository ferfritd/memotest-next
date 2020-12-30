
import styles from 'shared/UI/Card.module.css'

export default function Card({info, clicked, turn}) {

    const isClickable = turn !== 2 ? true : false
    
    return (
            <div className={styles.card} onClick={!info.isTurned && isClickable ? clicked : () => {}}>
                <div className={!info.isTurned ? `${styles.cardFront} ${styles.greyBackground}` : `${styles.cardBack}`}>?</div>
                <div className={!info.isTurned ? `${styles.cardBack}` : info.matched ? `${styles.cardFront} ${styles.greenBackground}` : `${styles.cardFront} ${styles.whiteBackground}`}>
                    <p>
                        {info.value}
                    </p>
                </div>

            </div>
    )
}
