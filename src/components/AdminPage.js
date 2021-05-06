import React, {useState} from 'react';
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
    setAnswers,
} from './AdminFirebase';


const AdminPage = ({ pageStates, pageState, playersList, localGameState, setLocalGameState, questions, playerAnswers }) => {

    const initializeGame = () => {
        let newGameState = {
            pageState: pageStates.WAITING,
            questionIndex: null,
            questionActive: false,
        };
        setLocalGameState(newGameState);
        setFirebaseGameState(newGameState);
    }
    const clearGame = () => {
        let newGameState = {
            pageState: pageStates.OFFLINE,
            questionIndex: null,
            questionActive: false,
        };
        setLocalGameState(newGameState);
        setFirebaseGameState(newGameState);

        deletePlayers(playersList);
        deleteQuestions(questions);
        setAnswers({});
    }
    const startGame = () => {
        let newGameState = {
            pageState: pageStates.PLAYING,
            questionIndex: 0,
            questionActive: true,
        };
        setLocalGameState(newGameState);
        setFirebaseGameState(newGameState);
    }
    const prevQuestion = () => {
        let qIndex = localGameState.questionIndex - 1;
        if (qIndex >= 0) {
            let newGameState = {
                pageState: pageStates.PLAYING,
                questionIndex: qIndex,
                questionActive: true,
            };
            setLocalGameState(newGameState);
            setFirebaseGameState(newGameState);
        }
    }
    const nextQuestion = () => {
        let qIndex = localGameState.questionIndex + 1;
        let newGameState = {};
        if (qIndex < questions.length) {
            newGameState = {
                pageState: pageStates.PLAYING,
                questionIndex: qIndex,
                questionActive: true,
            };
        } else {
            newGameState = {
                pageState: pageStates.REVIEW,
                questionIndex: null,
                questionActive: false,
            };
        }
        setLocalGameState(newGameState);
        setFirebaseGameState(newGameState);
    }
    const endQuestion = () => {
        let newGameState = {
            pageState: pageStates.PLAYING,
            questionIndex: localGameState.questionIndex,
            questionActive: false,
        }
        setLocalGameState(newGameState);
        setFirebaseGameState(newGameState);
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
                noPlayers={playersList.length===0}
            />
        </> : <></>}

        {pageState === pageStates.PLAYING ? <>
            <AdminPlaying
                quitGame={clearGame}
                prevQuestion={prevQuestion}
                nextQuestion={nextQuestion}
                endQuestion={endQuestion}
                questions={questions}
                localGameState={localGameState}
                playersList={playersList}
                playerAnswers={playerAnswers[`q${localGameState.questionIndex}`]}
            />
        </> : <></>}
        
        {pageState === pageStates.REVIEW ? <>
            <AdminReview
                chartsData={questions}
                playersList={playersList}
                endGame={clearGame}
                playerAnswers={playerAnswers}
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