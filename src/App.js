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

import sample_data from './components/game-page/sample_data';

import './App.css';


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

    const [answerTime, setanswerTime] = useState(null);

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
        setanswerTime(t);
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
        </> : <></>}

        {pageState === pageStates.GAME.WAITING_ROOM ? <>
        <GameWaitingRoom displayName={displayName} playersList={players} />
        <Button onClick={goToQuestion}>QUESTION</Button>
        </> : <></>}

        {pageState === pageStates.GAME.QUESTION ? <>
        <GameQuestion displayName={displayName} chartData={sample_data} questionTime={15} endQuestion={goToLeaderboard} />
        </> : <></>}

        {pageState === pageStates.GAME.LEADERBOARD ? <>
        <GameLeaderboard displayName={displayName} playersList={players} answerTime={answerTime} />
        </> : <></>}

        {pageState === pageStates.GAME.REVIEW ? <>
        <GameLeaderboard displayName={displayName} />
        </> : <></>}
        </>
    );
}

export default App;
