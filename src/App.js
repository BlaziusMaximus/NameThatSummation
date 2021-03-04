import Button from 'react-bootstrap/Button';

import {useState} from 'react';

import TeamPageHeader from './components/team-page/TeamPageHeader';
import TeamPageBody from './components/team-page/TeamPageBody';
import GameMainMenu from './components/game-page/GameMainMenu';
import GameQuestion from './components/game-page/GameQuestion';

import './App.css';

// const pageStates = {
//   TEAM_PAGE: "TEAM_PAGE",
//   GAME: {
//     MAIN_MENU: "GAME_MAIN_MENU",
//     WAITING_ROOM: "GAME_WAITING_ROOM",
//     QUESTION: "GAME_QUESTION",
//   },
// };
// let pageState = pageStates.TEAM_PAGE;

function App() {

    // const handleGoToGameClick = () => {
    //   console.log(pageState, pageStates.TEAM_PAGE, pageState===pageStates.TEAM_PAGE)
    //   pageState = pageStates.GAME.MAIN_MENU;
    // }

    const pageStates = {
        TEAM_PAGE: "TEAM_PAGE",
        GAME: {
            MAIN_MENU: "GAME_MAIN_MENU",
            WAITING_ROOM: "GAME_WAITING_ROOM",
            QUESTION: "GAME_QUESTION",
        },
    };
    const [pageState, setPageState] = useState(pageStates.TEAM_PAGE);

    const [displayName, setDisplayName] = useState("");

    const goToGame = () => {
        setPageState(pageStates.GAME.MAIN_MENU);
    }
    const goToTeam = () => {
        setPageState(pageStates.TEAM_PAGE);
    }
    const goToWaitingRoom = (name) => {
        setPageState(pageStates.GAME.WAITING_ROOM);
        setDisplayName(name);
    }
    const goToQuestion = () => {
        setPageState(pageStates.GAME.QUESTION);
    }

    return (
        <>
        {pageState === pageStates.TEAM_PAGE ? <>
        <TeamPageHeader onGoToGameClick={goToGame} />
        <br />
        <TeamPageBody />
        </> : <></>}

        {pageState === pageStates.GAME.MAIN_MENU ? <>
        <GameMainMenu onGoToTeamClick={goToTeam} onSubmitName={goToWaitingRoom} />
        </> : <></>}

        {pageState === pageStates.GAME.WAITING_ROOM ? <>
        <h1>WAITING</h1>
        <h2>Name: {displayName}</h2>
        <Button onClick={goToQuestion}>QUESTION</Button>
        </> : <></>}

        {pageState === pageStates.GAME.QUESTION ? <>
        <GameQuestion />
        </> : <></>}
        </>
    );
}

export default App;
