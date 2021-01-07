import {useEffect} from 'react'
import {useRouter} from 'next/router'


import useForm from 'shared/hooks/useForm'
import useDidMountEffect from 'shared/hooks/useDidMountEffect'
import addDeckToCollection from 'shared/utils/addDeckToCollection'

import Input from 'game/components/input'
import Box from 'shared/UI/Box'
import Button from 'shared/UI/Button'

import styles from "game/views/GameForm.module.css";

const EditGame = () => {

    const router = useRouter()
    
    const [state, {inputChangeHandler, changeTitleHandler, addInputHandler,removeInputHandler, submitFormHandler, fillInputsHandler}] = useForm('', [])

    const deckId = router.query.deckId

    useEffect(() => {    

        if(deckId){
            const deckCollection = JSON.parse(localStorage.getItem('deckCollection'))
    
            const selectedDeck = deckCollection.filter(deck => {
                        return deck.id === deckId
                    })[0]
    
            fillInputsHandler(selectedDeck)
        }
       
    },[router])

    useDidMountEffect(() => {
        if(deckId){
            console.log('if', deckId)
            fetch('http://localhost:8080/edit-deck',
            {   method:'PUT',  
                
                body:JSON.stringify({
                    id: deckId,
                    title:state.title,
                    cards:state.deck,
                    primaryLanguage:'Spanish',
                    goalLanguage: 'English',
                    isPublic: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                const deckCollection = JSON.parse(localStorage.getItem('deckCollection'))
                const deckIndex = deckCollection.findIndex(deck => {
                    return deck.id === deckId
                })

                deckCollection[deckIndex] = {...deckCollection[deckIndex], title: data.deck.title, deck:data.deck.cards}

                localStorage.setItem('deckCollection', JSON.stringify(deckCollection))
                
                router.replace('/my-games')
            })
            .catch(error => {
                console.error(error)
            })
        }
    },[state.deck])

    const inputArray = state.inputs.map((el, id) => {
        return (
        <div key={el.id} id={el.id} className={styles.inputsField}>
            <p className={styles.removeInput} onClick={()=>removeInputHandler(el.id)}>Remove</p>
            
            <p className={styles.inputNumber}>{`${id + 1}`}</p>
            <div className={styles.pairInput}>
                <Input classes={el.showError ? 'inputError' : ''} type="text" id={`${el.id}FirstInput`} value={el.pairs[0]} onInput={inputChangeHandler} showError={el.showError} errorMessage='Looks like you forgot to fill this one'/>
            </div>
            <p className="dash">-</p>
            <div className={styles.pairInput}>
                <Input classes={el.showError ? 'inputError' : ''} type="text" value={el.pairs[1]} id={`${el.id}SecondInput`} onInput={inputChangeHandler} showError={el.showError} errorMessage='Looks like you forgot to fill this one'/>
            </div>
        </div>)
    })

    return (
        <>
            <h1 style={{textAlign:"center", marginBottom:"4rem"}}>Edit Deck</h1>
            <Box>
                <form className={styles.deckForm} onSubmit={submitFormHandler}>
                    <Input  value={state.title} classes={styles.titleInput} id="deckName" placeholder="Insert deck's name" onInput={changeTitleHandler} showError={true} errorMessage="Don't forget to fill this field"/>
                    {inputArray}
                    <div className={styles.addButtons}>
                        <Button type="button" classes="button buttonMain buttonSmall buttonCircle" click={() => addInputHandler(1)}>+1</Button>
                        <Button type="button" classes="button buttonInverted buttonSmall buttonCircle" click={() => addInputHandler(4)}>+4</Button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button type="submit" classes="button buttonMain">Edit deck</Button>
                    </div>
                </form>
            </Box>
        </>
    )
}

export default EditGame
