import { db } from "./firebase";

import React from 'react';
import {useState} from 'react';

import TeamPageHeader from './components/team-page/TeamPageHeader';
import TeamPageBody from './components/team-page/TeamPageBody';
import GameMainMenu from './components/game-page/GameMainMenu';
import GameQuestion from './components/game-page/GameQuestion';
import GameWaitingRoom from './components/game-page/GameWaitingRoom';
import GameLeaderboard from './components/game-page/GameLeaderboard';
import GameReview from './components/game-page/GameReview';
import DevPanel from './components/game-page/DevPanel';

import evaluatex from "evaluatex";
// import sample_data from './components/game-page/sample_data';

import './App.css';

const SAMPLE_CSV = [
    {
        "xStart": 0,
        "xEnd": 10,
        "xInc": 1,
        "renderChoices": [ "x", "x^2", "log_{2} x", "\\sqrt{x}" ],
        "evalChoices": [ "x", "x^2", "logn(x,2)", "sqrt(x)" ],
        "answerIndex": 1,
    },
    {
        "xStart": 0,
        "xEnd": 10,
        "xInc": 1,
        "renderChoices": [ "x", "x^2", "log_{2} x", "\\sqrt{x}" ],
        "evalChoices": [ "x", "x^2", "logn(x,2)", "sqrt(x)" ],
        "answerIndex": 3,
    },
];
const numQuestions = 2;

function App() {

    const pageStates = {
        TEAM_PAGE: "TEAM_PAGE",
        GAME: {
            MAIN_MENU: "GAME_MAIN_MENU",
            WAITING_ROOM: "GAME_WAITING_ROOM",
            QUESTION: "GAME_QUESTION",
            LEADERBOARD: "GAME_LEADERBOARD",
            REVIEW: "GAME_REVIEW",
        },
    };
    const [pageState, setPageState] = useState(pageStates.TEAM_PAGE);
    const [questionIndex, setQuestionIndex] = useState(0);

    const [localPlayerObj, setLocalPlayerObj] = useState({
        "name": "John Doe",
        "score": 0,
        "section": 1337,
        "answers": [],
        "wrongAnswers": [],
        "times": [],
    });
    const [answerTime, setAnswerTime] = useState(null);

    const goToGame = () => {
        setPageState(pageStates.GAME.MAIN_MENU);
    }
    const goToTeam = () => {
        setPageState(pageStates.TEAM_PAGE);
    }
    const goToWaitingRoom = (name) => {
        setPageState(pageStates.GAME.WAITING_ROOM);
        // db.collection("playersDB").add({
        //     name: name,
        //     city: 1337
        // })
        // .then((docRef) => {
        //     console.log("Document written with ID: ", docRef.id);
        // })
        // .catch((error) => {
        //     console.error("Error adding document: ", error);
        // });
    }
    const goToQuestion = () => {
        setPageState(pageStates.GAME.QUESTION);
    }
    const goToLeaderboard = (t) => {
        setPageState(pageStates.GAME.LEADERBOARD);
        setAnswerTime(t);
    }
    const goToReview = () => {
        setPageState(pageStates.GAME.REVIEW);
    }

    const goToNextQuestion = () => {
        if (questionIndex === numQuestions-1) {
            goToReview();
        } else {
            setQuestionIndex(questionIndex+1);
            goToQuestion();
        }
    }

    const handleAnswerSubmit = async (a,t) => {
        console.log(localPlayerObj.name, "answer: ", a, "time: ", t);
        setLocalPlayerObj({
            ...localPlayerObj,
            answers: [...(localPlayerObj.answers),a],
            wrongAnswers: a===sample_data[questionIndex].answer ? [...(localPlayerObj.wrongAnswers)] : [...(localPlayerObj.wrongAnswers),a],
            times: [...(localPlayerObj.times),t],
        });

        const docRef = db.collection('playersDB').doc(localPlayerObj.name);
        docRef.get().then(async (doc) => {
            if (doc.exists) {
                // name, section, times, answers, score
                const playerObject = doc.data();
                await docRef.set({
                    ...playerObject,
                    answers: [...(playerObject.answers),a],
                    times: [...(playerObject.times),t]
                });
            }
        });
    }

    const [players, setPlayers] = useState([]);
    React.useEffect(() => {
        const fetchData = async () => {
            const data = await db.collection("playersDB").get();
            setPlayers(data.docs.map(doc => doc.data()));
        }
        fetchData();
        console.log("fetched players from firebase")
    }, []);

    // construct chart data
    const sample_data = SAMPLE_CSV.map(({xEnd, xStart, xInc, evalChoices, answerIndex}, index) => ({
        "id": `summation function ${index+1}`,
        "color": "hsl(24, 70%, 50%)",
        "data": [...Array(Math.floor((xEnd-xStart)/parseFloat(xInc))+1).keys()].map(e => (
            { "x":String(e), "y":evaluatex(evalChoices[answerIndex])({x:e}) }
        )),
        "answerChoices": ["x", "x^2", "logn(x,2)", "sqrt(x)"],
        "latexExp": ["x", "x^2", "log_{2} x", "\\sqrt{x}"],
        "answer": answerIndex,
    }));
    // console.log(sample_data)
    // [
    //     {
    //         "id": "summation function 1",
    //         "color": "hsl(24, 70%, 50%)",
    //         "data": data1,
    //         "answerChoices": ["x", "x^2", "logn(x,2)", "sqrt(x)"],
    //         "latexExp": ["x", "x^2", "log_{2} x", "\\sqrt{x}"],
    //         "answer": 1
    //     },
    // ];

    return (
        <>
        {pageState === pageStates.TEAM_PAGE ? <>
        <TeamPageHeader onGoToGameClick={goToGame} />
        <br />
        <TeamPageBody />
        </> : <></>}

        {pageState === pageStates.GAME.MAIN_MENU ? <>
        <GameMainMenu
            onGoToTeamClick={goToTeam}
            onSubmitName={(name) => {setLocalPlayerObj({...localPlayerObj, "name":name}); goToWaitingRoom(name);}}
        />
        </> : <></>}

        {pageState === pageStates.GAME.WAITING_ROOM ? <>
        <GameWaitingRoom
            displayName={localPlayerObj.name}
            playersList={players}
        />
        </> : <></>}

        {pageState === pageStates.GAME.QUESTION ? <>
        <GameQuestion
            displayName={localPlayerObj.name}
            chartData={sample_data[questionIndex]}
            questionTime={15}
            endQuestion={goToLeaderboard}
            selectAnswer={handleAnswerSubmit}
        />
        </> : <></>}

        {pageState === pageStates.GAME.LEADERBOARD ? <>
        <GameLeaderboard
            displayName={localPlayerObj.name}
            chartData={sample_data[questionIndex]}
            playersList={players}
            answerTime={answerTime}
            nextQuestion={goToNextQuestion}
        />
        </> : <></>}

        {pageState === pageStates.GAME.REVIEW ? <>
        <GameReview
            localPlayer={localPlayerObj}
            chartsData={sample_data}
            playersList={players}
            answerTime={answerTime}
        />
        </> : <></>}
        
        <br />
        <DevPanel
            goToLeaderboard={goToLeaderboard}
            goToReview={goToReview}
            goToQuestion={goToQuestion}
            goToWaitingRoom={goToWaitingRoom}
            displayName={localPlayerObj.name}
            setDisplayName={(name) => setLocalPlayerObj({...localPlayerObj, "name":name})}
        />
        </>
    );
}

export default App;
