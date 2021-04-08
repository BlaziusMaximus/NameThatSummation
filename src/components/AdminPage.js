import {useState} from 'react';
import PropTypes from 'prop-types';

import { db } from "../firebase";

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import GameChart from './game-page/GameChart';

import { MathComponent } from 'mathjax-react';
import { LinkContainer } from 'react-router-bootstrap/lib/LinkContainer';


const AdminPage = ({ gameStates, gameState, playersList, adminGameState, setAdminGameState, questions }) => {

    const openWaitingRoom = (state) => {
        let newGameState = {
            state: state,
            questionIndex: null,
        };
        setAdminGameState(newGameState);
        db.collection("adminVars").doc("GameState").set(newGameState);
    }
    const startGameSession = (state) => {
        let newGameState = {
            state: state,
            questionIndex: 0,
        };
        setAdminGameState(newGameState);
        db.collection("adminVars").doc("GameState").set(newGameState);
    }
    const nextSessionQuestion = () => {
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

    const initializeGame = () => {
        openWaitingRoom(gameStates.WAITING);
    }
    const gameInitButton = <Button onClick={initializeGame} id="startgame" variant="danger" size="lg" block>Initialize Game</Button>;

    const startGame = () => {
        startGameSession(gameStates.PLAYING);
    }
    const gameStartButton = <Button onClick={startGame} id="startgame" variant="danger" size="lg" block>Start Game</Button>;

    const nextQuestion = () => {
        nextSessionQuestion();
    }
    const nextQuestionButton = <Button onClick={nextQuestion} id="startgame" variant="danger" size="lg" block>Next Question</Button>;

    return (
    <>
        {gameState === gameStates.OFFLINE ? <>
            {gameInitButton}
        </> : <></>}

        {gameState === gameStates.WAITING ? <>
            {gameStartButton}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Section</th>
                    </tr>
                </thead>
                <tbody>
                {playersList.map(player =>
                    <tr key={player.name+""+player.city}>
                        <td>{player.name}</td>
                        <td>{player.section}</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </> : <></>}

        {gameState === gameStates.PLAYING ? <>
            {nextQuestionButton}
            <Card style={{height:"60vh"}} className="text-center">
                <Card.Body>
                    <GameChart data={questions[adminGameState.questionIndex]} />
                </Card.Body>
                <Card.Footer>
                    {questions[adminGameState.questionIndex].latexExp.map((e,index) => (
                    <Button
                        id={index}
                        key={index}
                        disabled
                        style={{margin: "0 2%"}}
                        variant={questions[adminGameState.questionIndex].answer===index?"success":"primary"}>
                            <MathComponent tex={`y = ${e}`} />
                    </Button>
                    ))}
                </Card.Footer>
            </Card>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Section</th>
                    </tr>
                </thead>
                <tbody>
                {playersList.map(player =>
                    <tr key={player.name+""+player.city}>
                        <td>{player.name}</td>
                        <td>{player.section}</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </> : <></>}
        
        {gameState === gameStates.REVIEW ? <>
            {}
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