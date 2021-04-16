import {useState} from 'react';
import PropTypes from 'prop-types';

import AdminWaiting from './admin-page/AdminWaiting';
import AdminPlaying from './admin-page/AdminPlaying';
import AdminReview from './admin-page/AdminReview';
import AdminOffline from './admin-page/AdminOffline';

import {
    deletePlayers,
    kickPlayer,
    setFirebaseGameState,
    uploadQuestions,
    deleteQuestions,
    clearAnswers,
} from './AdminFirebase';


const AdminPage = ({ pageStates, pageState, playersList, localGameState, setLocalGameState, questions, playerAnswers }) => {

    const initializeGame = () => {
        let newGameState = {
            pageState: pageStates.WAITING,
            questionIndex: null,
        };
        setLocalGameState(newGameState);
        setFirebaseGameState(newGameState);
    }
    const clearGame = () => {
        let newGameState = {
            pageState: pageStates.OFFLINE,
            questionIndex: null,
        };
        setLocalGameState(newGameState);
        setFirebaseGameState(newGameState);

        deletePlayers(playersList);
        deleteQuestions(questions);
    }
    const startGame = () => {
        let newGameState = {
            pageState: pageStates.PLAYING,
            questionIndex: 0,
        };
        setLocalGameState(newGameState);
        setFirebaseGameState(newGameState);
        console.log(newGameState)
    }
    const prevQuestion = () => {
        let qIndex = localGameState.questionIndex - 1;
        if (qIndex >= 0) {
            let newGameState = {
                pageState: pageStates.PLAYING,
                questionIndex: qIndex,
            };
            setLocalGameState(newGameState);
            setFirebaseGameState(newGameState);
            clearAnswers();
        }
    }
    const nextQuestion = () => {
        let qIndex = localGameState.questionIndex + 1;
        let newGameState = {};
        if (qIndex < questions.length) {
            newGameState = {
                pageState: pageStates.PLAYING,
                questionIndex: qIndex,
            };
        } else {
            newGameState = {
                pageState: pageStates.REVIEW,
                questionIndex: null,
            };
        }
        setLocalGameState(newGameState);
        setFirebaseGameState(newGameState);
        clearAnswers();
    }

    return (<>

        {pageState === pageStates.OFFLINE ? <>
            <AdminOffline
                initializeGame={initializeGame}
                clearGame={clearGame}
                playersList={playersList}
                uploadQuestions={uploadQuestions}
                noQuestions={questions.length===0}
            />
        </> : <></>}

        {pageState === pageStates.WAITING ? <>
            <AdminWaiting
                playersList={playersList}
                startGame={startGame}
                quitGame={clearGame}
                kickPlayer={kickPlayer}
            />
        </> : <></>}

        {pageState === pageStates.PLAYING ? <>
            <AdminPlaying
                quitGame={clearGame}
                prevQuestion={prevQuestion}
                nextQuestion={nextQuestion}
                questions={questions}
                localGameState={localGameState}
                playersList={playersList}
                playerAnswers={playerAnswers}
            />
        </> : <></>}
        
        {pageState === pageStates.REVIEW ? <>
            <AdminReview
                chartsData={questions}
                playersList={playersList}
                endGame={clearGame}
            />
        </> : <></>}
        
    </>);
}

AdminPage.propTypes = {
    pageStates: PropTypes.object.isRequired,
    pageState: PropTypes.string.isRequired,
    playersList: PropTypes.array.isRequired,
    chartData: PropTypes.object,
    localGameState: PropTypes.object.isRequired,
    setLocalGameState: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    playerAnswers: PropTypes.object.isRequired,
}

export default AdminPage;