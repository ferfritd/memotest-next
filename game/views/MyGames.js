import {useEffect, useState , useLayoutEffect} from 'react'
import { useRouter } from 'next/router'
// import { DeckContext } from '../../shared/Context/DeckContextProvider' 
import Link from 'next/link'


import useDidMountEffect from 'shared/hooks/useDidMountEffect'
// import useScroll from '../../shared/hooks/useScroll'

import Button from 'shared/UI/Button'
import Box from 'shared/UI/Box'
// import DeleteGameModal from '../Components/DeleteGameModal'
// import Backdrop from '../../shared/UI/Backdrop'
// import Modal from '../../shared/UI/Modal';


import styles from 'game/views/MyGames.module.css'

const MyGames = () => {

    const router = useRouter()

    const [deckToPlay, setDeckToPlay] = useState(null)
    const [collectionState, setCollectionState] = useState([])

    const playGameHandler = (id) => {
        const selectedDeck = collectionState.filter( deck => {
            return deck.id === id
        })
        setDeckToPlay(selectedDeck[0])
    }


    const myGames = 
    collectionState.length > 0 ?
    <div className={styles.gameContainer}>
        {collectionState.map(deck => {
            return (
                <div className={styles.infoCard} key={deck.id}>
                    <h2>
                        {deck.title}
                    </h2>
                    <p>
                        {deck.timeStamp}
                    </p>
                    <div className={styles.gameInfo} >
                        {deck.deck.map((pair, i) => {
                            return(
                                
                                <p key={i}>
                                    {`${pair[0]} - ${pair[1]} `}
                                </p>
                                
                            ) 
                            
                        })}
                    </div>
                    <div className={styles.buttons}>
                        <Button classes="button buttonSmall buttonMain" type="button" click={() => playGameHandler(deck.id)}>Play</Button>
                        <Button href={{pathname:'edit/[deckId]', query:{deckId:deck.id}}} classes="button buttonSmall buttonInverted buttonLink">
                            Edit
                        </Button>
                        <Button classes="button buttonSmall buttonMain" click={() => openCloseModalHandler(deck.id)}>Delete</Button>
                        <Button classes="button buttonSmall buttonInverted" type="button" click={() => shareDeckHandler(deck.id)}>Share</Button>
                    </div>
                        
                </div>)
                    
        })}
    </div> 
    : <div className={styles.newGameSection}>    
        <h2 style={{fontSize:'4rem', color: '#3f6854'}}>No games yet! Why don't you try creating a new one?</h2>
        
        <Button to='/game' exact={"true"} classes="button button-main">
            New Deck
        </Button>

        </div>

    useLayoutEffect(() => {
        setCollectionState(JSON.parse(localStorage.getItem('deckCollection')))
    }, [])

    useEffect(()=>{         
        if(deckToPlay){
            localStorage.setItem('currentDeck', JSON.stringify(deckToPlay))
        router.push('/')
        }
    },[deckToPlay])

    return(
        <>
            <h1 style={{textAlign:"center"}}>
                MY GAMES
            </h1>
            <Box>
                {myGames}
            </Box>
        </>
    )
}

export default MyGames

// export default function MyGames(props) {

//     document.title = props.title

//     const [deck, setstate] = useState(deckState)
//     const [collectionState, setCollectionState] = useState(collection)
//     const [showModal, setShowModal] = useState(false)
//     const [deckToRemove, setDeckToRemove] = useState(null)
//     const [deckToShare, setDeckToShare] = useState(null)
    
//     const [scrollPosition, scrollHandler] = useScroll(0)

//     const shareURL = useRef()


//     const openCloseModalHandler = (id) => {

//         if(deckToShare){
//             const range = document.createRange()
//             range.selectNode(shareURL.current)
//             window.getSelection().removeAllRanges();
//             window.getSelection().addRange(range);
//             document.execCommand("copy");
//             window.getSelection().removeAllRanges();

//             setDeckToShare(null)
//         } else {
//             const removedDeck = collectionState.filter( deck => {
//                 return deck.id === id
//             })
//             setDeckToRemove(...removedDeck)
//         }
//         setShowModal(!showModal)
//     }

//     const deleteDeckHandler = (id) => {
//         const selectedDecks = collectionState.filter( deck => {
//             return deck.id !== id
//         })

//         const removedDeck = collectionState.filter( deck => {
//             return deck.id === id
//         })

//         localStorage.setItem('deckCollection', JSON.stringify(selectedDecks))
        
//         if(removedDeck.id === deck.id){
//         localStorage.setItem('currentDeck', JSON.stringify([]))
//         }
//         setCollectionState(selectedDecks)
//     }

//     const shareDeckHandler = (id) => {
//         const selectedDeck = collectionState.filter( deck => {
//             return deck.id === id
//         })

//         setDeckToShare(selectedDeck[0])
//         setShowModal(true)

//     }


//     useDidMountEffect(() => {
//         onSetCollection(collectionState)
//         onCreateDeck([['Perro', 'Dog'], ['Gato', 'Cat']])
//         onsetTitle("My Game")
//         setShowModal(false)
//     },[collectionState])

//     return (
//         <Fragment>
//             {showModal 
//                 ?
//                 !deckToShare
//                 ?
//                 <Fragment>
//                     <Backdrop OnCloseBackdrop={openCloseModalHandler}/>
//                     <DeleteGameModal
//                         deckName={deckToRemove.title}
//                         openCloseModalHandler={openCloseModalHandler} deleteDeckHandler={() =>deleteDeckHandler(deckToRemove.id)}  
//                         extraStyles={{top:`calc(50% + ${scrollPosition}px)`}}
//                     /> 
//                 </Fragment>
//                 :
//                 <Fragment>
//                     <Backdrop OnCloseBackdrop={openCloseModalHandler}/>
//                     <Modal classes='share-URL-modal' acceptText='COPY' extraStyles={{top:`calc(50% + ${scrollPosition}px)`}} onAccept={openCloseModalHandler}> 
//                         <p className="share-text">
//                             {`For sharing "${deckToShare.title}" just send this link to your friends and it will be automatically added to their games. Click on the button below to copy it to your billboard`} 
//                         </p>
//                         <div className='URL-container'>
//                             <p className="URL" ref={shareURL}>
//                                 {`https://kiokugame.netlify.app/shared/${encodeURIComponent(JSON.stringify(deckToShare))}`}
//                             </p>
//                         </div>
//                     </Modal>
//                 </Fragment>
//                 :
//                 ''
//             }
//         </Fragment>
//     )
// }
