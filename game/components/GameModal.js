import Modal from 'shared/UI/Modal'

export default function GameModal({restartGameHandler, extraStyles, closeModalHandler}) {

    return (
        <Modal
            extraStyles={extraStyles}
            onAccept={restartGameHandler}
            acceptText='Play Again'
            onCancel={closeModalHandler}
            cancelText='Return to game' 
            transition={'slow-transition'}>
            <div>
                <p>Congrats, you win! You're awesome!</p>
            </div>
        </Modal>
    )
}
