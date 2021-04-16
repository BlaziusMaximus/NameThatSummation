import React from 'react';
import {useState} from 'react';

import { db } from "./firebase";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import evaluatex from "evaluatex";

import Button from 'react-bootstrap/Button';

import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import TeamPageHeader from './components/team-page/TeamPageHeader';
import TeamPageBody from './components/team-page/TeamPageBody';
import AdminPage from './components/AdminPage';
import GamePage from './components/GamePage';

import {
    deletePlayers,
    setFirebaseGameState,
    deleteQuestions,
} from './components/AdminFirebase';

import './App.css';

function App() {

    const adminPageStates = {
        OFFLINE: "OFFLINE",
        WAITING: "WAITING",
        PLAYING: "PLAYING",
        REVIEW: "REVIEW",
    };

    const [players, setPlayers] = useState([]);
    React.useEffect(() => {
        db.collection("playersDB").onSnapshot((snapshot) => {
            console.log(snapshot.docs);
            if (snapshot.docs.length > 0) {
                setPlayers(snapshot.docs.map(doc => doc.data()));
            } else {
                setPlayers([]);
            }
        });
        console.log("fetched players from firebase")
    }, []);

    const [questions, setQuestions] = useState([]);
    React.useEffect(() => {
        db.collection("questions").onSnapshot((snapshot) => {
            console.log(snapshot.docs);
            setQuestions(snapshot.docs.map((doc) => {
                let { xEnd, xStart, xInc, evalChoices, renderChoices, answerIndex, maxScore } = doc.data();
                return {
                    "id": doc.id,
                    "color": "hsl(24, 70%, 50%)",
                    "data": [...Array(Math.floor((xEnd-xStart)/parseFloat(xInc))+1).keys()].map(e => (
                        { "x":String(e), "y":evaluatex(evalChoices[answerIndex])({x:e}) }
                    )),
                    "renderChoices": renderChoices,
                    "answerIndex": answerIndex,
                    "maxScore": maxScore==null?300:maxScore,
                    "evalChoices": evalChoices,
                    "xEnd": xEnd,
                    "xStart": xStart,
                    "xInc": xInc,
                };
            }).sort((a,b) => parseInt(a.id.substring(1))>parseInt(b.id.substring(1))?1:-1));

        });
        console.log("fetched questions from firebase")
    }, []);

    const [adminGameState, setAdminGameState] = useState({
        pageState: adminPageStates.OFFLINE,
        questionIndex: null,
    });
    React.useEffect(() => {
        db.collection("adminVars").doc("GameState").onSnapshot((doc) => {
            console.log(doc.data());
            if (doc.data() !== undefined) {
                setAdminGameState(doc.data());
            }

            db.collection("playersDB").get().then(playersDB => {
                setPlayers(playersDB.docs.map(doc => doc.data()))
            });
        });
        console.log("fetched adminVars.GameState from firebase")
    }, []);

    const [playerAnswers, setPlayerAnswers] = useState({});
    React.useEffect(() => {
        db.collection("adminVars").doc("PlayerAnswers").onSnapshot((doc) => {
            console.log(doc.data());
            if (doc.data() !== undefined) {
                setPlayerAnswers(doc.data());
            }
        });
        console.log("fetched adminVars.PlayerAnswers from firebase");
    }, []);

    return (
    <Router basename="/NameThatSummation">
        <Switch>
            <Route exact path="/">
                <nav>
                    <LinkContainer to="/team-page">
                        <Button>TEAM PAGE</Button>
                    </LinkContainer>
                    <LinkContainer to="/game-page">
                        <Button>GAME PAGE</Button>
                    </LinkContainer>
                    <LinkContainer to="/admin-page">
                        <Button>ADMIN PAGE</Button>
                    </LinkContainer>
                    <Button onClick={ () => {
                        let newGameState = {
                            pageState: adminPageStates.OFFLINE,
                            questionIndex: null,
                        };
                        setAdminGameState(newGameState);
                        setFirebaseGameState(newGameState);

                        deletePlayers(players);
                        deleteQuestions(questions);
                    }} id="cleargame" variant="danger" size="lg" block>Clear Game</Button>
                </nav>
            </Route>
            <Route path="/team-page">
                <TeamPageHeader />
                <br />
                <TeamPageBody />
            </Route>
            <Route path="/game-page">
                <GamePage
                    questions={questions}
                    chartData={adminGameState.questionIndex!=null?questions[adminGameState.questionIndex]:{
                        "id": "",
                        "color": null,
                        "data": [],
                        "renderChoices": [],
                        "answerIndex": null,
                        "maxScore": null,
                    }}
                    players={players}
                    adminQuestionIndex={adminGameState.questionIndex}
                    waitingRoomIsOpen={adminGameState.pageState === adminPageStates.WAITING}
                    playerAnswers={playerAnswers}
                />
            </Route>
            <Route path="/admin-page">
                <AdminPage
                    pageStates={adminPageStates}
                    pageState={adminGameState.pageState}
                    playersList={players}
                    localGameState={adminGameState}
                    setLocalGameState={setAdminGameState}
                    questions={questions}
                    playerAnswers={playerAnswers}
                />
            </Route>
        </Switch>
        
        <br /><br />
        <LinkContainer to="/">
            <Button>HOME</Button>
        </LinkContainer>
    </Router>
    );
}

export default App;
