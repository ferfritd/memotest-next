import { useEffect, useContext, useState, Fragment } from 'react'
import addDeckToCollection from 'shared/utils/addDeckToCollection'

import { useRouter } from 'next/router'

import useForm from 'shared/hooks/useForm'
// import useScroll from '../../shared/hooks/useScroll'

import Input from 'game/components/input'
import Button from "shared/UI/Button"
import Box from "shared/UI/Box"
// import Modal from 'shared/UI/Modal'

import styles from "game/views/GameForm.module.css";

const NewGame = () => {

    const router = useRouter()

    const [state,{inputChangeHandler, addInputHandler, removeInputHandler, changeTitleHandler, submitFormHandler}] = useForm('', [])

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

    useEffect(() => {

        if(state.deck.length > 0){

            fetch('http://localhost:8080/create-deck',
            {   method:'POST',  
                
                body:JSON.stringify({
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
                    const deckObject = {title:state.title, deck: state.deck}

                addDeckToCollection(deckObject)
                router.push('/')        
                
                })
                .catch(error => {
                    console.log(error)
                })

            
        }
    }, [state.deck])

    return(
        <div className="centered">
                 <h1  style={{textAlign:"center", marginBottom:"4rem"}}>Create New Deck</h1>
                 <Box>
                     <form className={styles.deckForm} onSubmit={submitFormHandler}>
                         <Input classes={styles.titleInput} id="deckName" placeholder="Insert deck's name" onInput={changeTitleHandler} showError={true} errorMessage="Don't forget to fill this field"/>
                         {inputArray}
                         <div className={styles.addButtons}>
                             <Button type="button" classes="button buttonMain buttonSmall buttonCircle" click={() => addInputHandler(1)}>+1</Button>
                             <Button type="button" classes="button buttonInverted buttonSmall buttonCircle" click={() => addInputHandler(4)}>+4</Button>
                         </div>
                         <div className={styles.buttonContainer}>
                             <Button type="submit" classes="button buttonMain">Create deck</Button>
                         </div>
                     </form>
                 </Box>
             </div>
    )
}

export default NewGame
