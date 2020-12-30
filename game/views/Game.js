import {useEffect, useReducer} from 'react'

import Box from 'shared/UI/Box'
import Button from "shared/UI/Button";
import Card from 'shared/UI/Card'
import GameModal from 'game/components/GameModal'


import styles from "game/views/Game.module.css";

const sortCards = () => {
    return Math.random() - .5
}

const restartGame = state => {
    state.remainingPairs = state.cards.length
    state.selectedCard = null
    state.turn = 0

    state.gameLogic.forEach(card => {
        card.isTurned = false
        card.matched = false
    })
}

const resetState = state => {
    restartGame(state)

    state.gameLogic.sort(sortCards)
    return state       
}

const reducer = (state, action) => {

    const newState = {...state}

    switch(action.type){
        case 'SETGAME':

            const gameLogic = action.deck.deck.map(pair => {
        

                const firstWord = {value:pair[0], isTurned:false, matched: false}
                const secondWord = {value:pair[1], isTurned:false, matched: false}
                
                firstWord.pair = secondWord
                secondWord.pair = firstWord
                
                return [firstWord, secondWord] 
            }
        ).reduce((a,b) => {
            return a.concat(b)
        }, []).sort(() => {return Math.random() - .5})

        newState.gameLogic = gameLogic
        newState.cards = action.deck.deck
        newState.title = action.deck.title
        newState.remainingPairs = action.deck.length

        return newState

        case 'RESTARTGAME':

            restartGame(newState)

            return newState
        
        case 'SORTCARDS':
          
            newState.gameLogic.sort(sortCards)
                
            return newState      
            
        case 'TURNTOFRONT':

            newState.gameLogic[action.id].isTurned = true
            
            if(state.turn === 0){
                newState.selectedCard = newState.gameLogic[action.id]
                newState.turn = 1
            }
            if(state.turn === 1){
                newState.turn = 2
            }
            return newState

        case 'CHECKMATCH':
                        
            if(newState.gameLogic[action.id].pair === newState.selectedCard){

                newState.remainingPairs = newState.remainingPairs - 1

                newState.gameLogic[action.id].matched = true
                newState.selectedCard.matched = true

                if(newState.remainingPairs === 0){
                    newState.modalIsOpen = true
                }

            } else {
                newState.gameLogic[action.id].isTurned = false
                newState.selectedCard.isTurned = false
            }

            newState.selectedCard = {}
            newState.turn = 0
            return newState
        case 'RESETSTATE':
            resetState(newState)
            break
        case 'CLOSEMODAL':
            newState.modalIsOpen = false
            return newState
        default:
            return state

    }
};

const Game = () => {

const [state, dispatch] = useReducer(reducer, 
    {
        cards: [],
        title: '',
        remainingPairs: 0,
        gameLogic: [],
        selectedCard: {},
        turn: 0,
        modalIsOpen: false
    }
    )

    const clickHandler = (id) => {
        if(state.turn === 1)
        
            setTimeout(() => {
                dispatch({type:'CHECKMATCH', id:id})
            }, 1000);
        dispatch({type:'TURNTOFRONT', id:id})
    }

    const restartGameHandler = () => {
        setTimeout(() => {
            dispatch({type:'SORTCARDS'})
        },1000)

        dispatch({type:'CLOSEMODAL'})
        dispatch({type:'RESTARTGAME'})

    }


    useEffect(() => {
        let currentDeck = JSON.parse(localStorage.getItem('currentDeck'))
        
        if(!currentDeck){

            const deckState = {title: 'MY GAME', pairs:[['perro', 'dog'], ['gato', 'cat']]} 
            localStorage.setItem('currentDeck', JSON.stringify(deckState))
            dispatch({type:'SETGAME', deck:deckState})
        } else {
            dispatch({type:'SETGAME', deck:currentDeck})
        }
    }, [])

    const deck = state.gameLogic.map((card, i) => {
        return <Card turn={state.turn} key={i} clicked={() => {clickHandler(i)}} info={card} />
     })


    return (
        <>
            <Box>
                <h1>{state.title}</h1>
                <div className={styles.grid}>
                    {deck}
                </div>
            </Box>
            <div className={`centered ${styles.buttonContainer}`}>
                <Button classes="button buttonMain" click={restartGameHandler}>Restart</Button>      
            </div>
        </>
    )
}

export default Game