import {useState} from 'react';
import PropTypes from 'prop-types';

import { db } from "../firebase";

import AdminWaiting from './admin-page/AdminWaiting';
import AdminPlaying from './admin-page/AdminPlaying';
import AdminReview from './admin-page/AdminReview';
import AdminOffline from './admin-page/AdminOffline';


const AdminPage = ({ gameStates, gameState, playersList, adminGameState, setAdminGameState, questions }) => {

    const initializeGame = () => {
        let newGameState = {
            state: gameStates.WAITING,
            questionIndex: null,
        };
        setAdminGameState(newGameState);
        db.collection("adminVars").doc("GameState").set(newGameState);
    }
    const clearGame = () => {
        let newGameState = {
            state: gameStates.OFFLINE,
            questionIndex: null,
        };
        setAdminGameState(newGameState);
        db.collection("adminVars").doc("GameState").set(newGameState);

        playersList.forEach(player => {
            db.collection('playersDB').doc(player.name).delete();
        });
    }
    const startGame = () => {
        let newGameState = {
            state: gameStates.PLAYING,
            questionIndex: 0,
        };
        setAdminGameState(newGameState);
        db.collection("adminVars").doc("GameState").set(newGameState);
    }
    const prevQuestion = () => {
        let qIndex = adminGameState.questionIndex - 1;
        if (qIndex >= 0) {
            let newGameState = {
                state: gameStates.PLAYING,
                questionIndex: qIndex,
            };
            setAdminGameState(newGameState);
            db.collection("adminVars").doc("GameState").set(newGameState);
        }
    }
    const nextQuestion = () => {
        let qIndex = adminGameState.questionIndex + 1;
        if (qIndex < questions.length) {
            let newGameState = {
                state: gameStates.PLAYING,
                questionIndex: qIndex,
            };
            setAdminGameState(newGameState);
            db.collection("adminVars").doc("GameState").set(newGameState);
        } else {
            let newGameState = {
                state: gameStates.REVIEW,
                questionIndex: null,
            };
            setAdminGameState(newGameState);
            db.collection("adminVars").doc("GameState").set(newGameState);
        }
    }

    const kickPlayer = (player) => {
        db.collection('playersDB').doc(player.name).delete();
    }

    return (<>

        {gameState === gameStates.OFFLINE ? <>
            <AdminOffline
                initializeGame={initializeGame}
                clearGame={clearGame}
                playersList={playersList}
            />
        </> : <></>}

        {gameState === gameStates.WAITING ? <>
            <AdminWaiting
                playersList={playersList}
                startGame={startGame}
                quitGame={clearGame}
                kickPlayer={kickPlayer}
            />
        </> : <></>}

        {gameState === gameStates.PLAYING ? <>
            <AdminPlaying
                quitGame={clearGame}
                prevQuestion={prevQuestion}
                nextQuestion={nextQuestion}
                questions={questions}
                adminGameState={adminGameState}
                playersList={playersList}
            />
        </> : <></>}
        
        {gameState === gameStates.REVIEW ? <>
            <AdminReview
                chartsData={questions}
                playersList={playersList}
                endGame={clearGame}
            />
        </> : <></>}
        
    </>);
}

AdminPage.propTypes = {
    gameStates: PropTypes.object.isRequired,
    gameState: PropTypes.string.isRequired,
    playersList: PropTypes.array.isRequired,
    chartData: PropTypes.object,
    adminGameState: PropTypes.object.isRequired,
    setAdminGameState: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
}

export default AdminPage;