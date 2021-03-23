import { db } from "./firebase";

import Button from 'react-bootstrap/Button';

import React from 'react';
import {useState} from 'react';

import TeamPageHeader from './components/team-page/TeamPageHeader';
import TeamPageBody from './components/team-page/TeamPageBody';
import GameMainMenu from './components/game-page/GameMainMenu';
import GameQuestion from './components/game-page/GameQuestion';
import GameWaitingRoom from './components/game-page/GameWaitingRoom';
import GameLeaderboard from './components/game-page/GameLeaderboard';
import GameReview from './components/game-page/GameReview';

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
]

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

    const [displayName, setDisplayName] = useState("John Doe");

    const [answerTime, setAnswerTime] = useState(null);

    const [questionIndex, setQuestionIndex] = useState(0);

    const goToGame = () => {
        setPageState(pageStates.GAME.MAIN_MENU);
    }
    const goToTeam = () => {
        setPageState(pageStates.TEAM_PAGE);
    }
    const goToWaitingRoom = (name) => {
        setPageState(pageStates.GAME.WAITING_ROOM);
        setDisplayName(name);
        db.collection("playersDB").add({
            name: name,
            city: 1337
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
    const goToQuestion = () => {
        setPageState(pageStates.GAME.QUESTION);
    }
    const goToLeaderboard = (t) => {
        setPageState(pageStates.GAME.LEADERBOARD);
        setAnswerTime(t);
    }
    const goToReview = (t) => {
        setPageState(pageStates.GAME.REVIEW);
        setAnswerTime(t);
    }

    const handleAnswerSubmit = (a) => {
        console.log("answer: ", a);
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
    const sample_data = SAMPLE_CSV.map(({xEnd, xStart, xInc, evalChoices, answerIndex}) => (
        {
            "id": "summation function 1",
            "color": "hsl(24, 70%, 50%)",
            "data": [...Array(Math.floor((xEnd-xStart)/parseFloat(xInc))+1).keys()].map(e => (
                { "x":String(e), "y":evaluatex(evalChoices[answerIndex])({x:e}) }
            )),
            "answerChoices": ["x", "x^2", "logn(x,2)", "sqrt(x)"],
            "latexExp": ["x", "x^2", "log_{2} x", "\\sqrt{x}"],
            "answer": 1,
        }
    ));
    console.log(sample_data)
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

    console.log(answerTime)

    return (
        <>
        {pageState === pageStates.TEAM_PAGE ? <>
        <TeamPageHeader onGoToGameClick={goToGame} />
        <br />
        <TeamPageBody />
        </> : <></>}

        {pageState === pageStates.GAME.MAIN_MENU ? <>
        <GameMainMenu onGoToTeamClick={goToTeam} onSubmitName={goToWaitingRoom} />
        <br />
        <Button onClick={() => goToWaitingRoom(displayName)}>WAITING ROOM</Button>
        <Button onClick={goToQuestion}>QUESTION</Button>
        <Button onClick={() => goToLeaderboard(1)}>LEADERBOARD</Button>
        <Button onClick={() => goToReview(1)}>REVIEW</Button>
        </> : <></>}

        {pageState === pageStates.GAME.WAITING_ROOM ? <>
        <GameWaitingRoom displayName={displayName} playersList={players} />
        <Button onClick={goToQuestion}>QUESTION</Button>
        </> : <></>}

        {pageState === pageStates.GAME.QUESTION ? <>
        <GameQuestion displayName={displayName} chartData={sample_data[questionIndex]} questionTime={15} endQuestion={goToLeaderboard} selectAnswer={handleAnswerSubmit} />
        </> : <></>}

        {pageState === pageStates.GAME.LEADERBOARD ? <>
        <GameLeaderboard displayName={displayName} chartData={sample_data[questionIndex]} playersList={players} answerTime={answerTime} />
        </> : <></>}

        {pageState === pageStates.GAME.REVIEW ? <>
        <GameReview displayName={displayName} chartsData={sample_data} playersList={players} answerTime={answerTime} />
        </> : <></>}
        </>
    );
}

export default App;
