import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {
    GameMainMenu,
    GameQuestion,
    GameWaitingRoom,
    GameLeaderboard,
    GameReview,
} from './game-page';

import DevPanel from './DevPanel';

import {
    setPlayer,
    setAnswers,
} from './GameFirebase';


const GamePage = ({ questions, chartData, players, adminQuestionIndex, waitingRoomIsOpen, playerAnswers }) => {

    const questionTime = 15;

    const pageStates = {
        MAIN_MENU: "MAIN_MENU",
        WAITING_ROOM: "WAITING_ROOM",
        QUESTION: "QUESTION",
        LEADERBOARD: "LEADERBOARD",
        REVIEW: "REVIEW",
    };
    const [pageState, setPageState] = useState(pageStates.MAIN_MENU);
    
    const [timer, setTimer] = useState(questionTime);
    
    const [questionIndex, setQuestionIndex] = useState(null);

    const [localPlayerObj, setLocalPlayerObj] = useState({
        id: null,
        name: null,
        score: null,
        section: null,
        answers: [],
        wrongAnswers: {},
        times: [],
    });

    const [showKickModal, setShowKickModal] = useState(false);
    const handleShowKick = () => setShowKickModal(true);
    const handleCloseKick = () => setShowKickModal(false);
    
    const goToMainMenu = () => {
        setPageState(pageStates.MAIN_MENU);
    }
    const goToWaitingRoom = (name, section) => {
        setPageState(pageStates.WAITING_ROOM);
        const newPlayerObj = {
            ...localPlayerObj,
            id: Math.floor(Math.random()*Date.now()),
            "name": name,
            "section": parseInt(section),
            "score": 0,
        }
        setLocalPlayerObj({...newPlayerObj});
        setPlayer({...newPlayerObj});
    }
    const goToQuestion = React.useCallback(() => {
        setPageState(pageStates.QUESTION);
        setQuestionIndex(adminQuestionIndex);
        console.log(adminQuestionIndex)
        setTimer(questionTime);
    }, [adminQuestionIndex, pageStates.QUESTION]);
    const goToLeaderboard = React.useCallback(() => {
        setPageState(pageStates.LEADERBOARD);
    }, [pageStates.LEADERBOARD]);
    const goToReview = React.useCallback(() => {
        setPageState(pageStates.REVIEW);
    }, [pageStates.REVIEW]);

    React.useEffect(() => {
        if (adminQuestionIndex != null && (pageState === pageStates.WAITING_ROOM || adminQuestionIndex !== questionIndex)) {
            goToQuestion();
        }
        if (adminQuestionIndex === null && (pageState === pageStates.QUESTION || pageState === pageStates.LEADERBOARD)) {
            goToReview();
        }
    }, [adminQuestionIndex, questionIndex, pageState, pageStates.WAITING_ROOM, pageStates.QUESTION, pageStates.LEADERBOARD, goToQuestion, goToReview]);

    const handleAnswerSubmit = async (a,t) => {
        // console.log(localPlayerObj.name, "answer:", a, "time:", t, "score:",chartData.maxScore*t);
        const score = parseFloat(chartData.maxScore)*parseFloat(t)/parseFloat(questionTime);
        let was = localPlayerObj.wrongAnswers;
        let newAnswer = false;
        if (was[chartData.id] === undefined) { was[chartData.id] = []; newAnswer = true; }
        if (a !== chartData.answerIndex) { was[chartData.id].push(a); }
        const newPlayerObj = {
            ...localPlayerObj,
            answers: newAnswer?[...(localPlayerObj.answers),a]:[...(localPlayerObj.answers)],
            wrongAnswers: was,
            times: newAnswer?[...(localPlayerObj.times),questionTime-t]:[...(localPlayerObj.times)],
            score: localPlayerObj.score + newAnswer?Math.floor(score):0,
        };
        setLocalPlayerObj({...newPlayerObj});
        setPlayer({...newPlayerObj});

        let newAnswers = playerAnswers;
        newAnswers[localPlayerObj.id] = a;
        setAnswers({...newAnswers});
        console.log(playerAnswers, newAnswers);
    }

    const [topPlayers, setTopPlayers] = useState([]);
    React.useEffect(() => {
        setTopPlayers(
            players.filter(a => Number.isInteger(a.score))
                   .sort((a,b) => a.score<b.score ? 1 : -1)
                   .slice(0,5)
        );
        
        if (pageState !== pageStates.MAIN_MENU && players.find(player => player.id === localPlayerObj.id) === undefined) {
            // console.log("local player not in playersDB", players, localPlayerObj);
            setPageState(pageStates.MAIN_MENU);
            handleShowKick();
        }
    }, [players, pageStates.MAIN_MENU]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (pageState === pageStates.QUESTION) {
                if (timer > 0) {
                    setTimer(timer-1);
                } else {
                    const newPlayerObj = {
                        ...localPlayerObj,
                        answers: [...(localPlayerObj.answers),null],
                        times: [...(localPlayerObj.times),null],
                    };
                    setLocalPlayerObj({...newPlayerObj});
                    setPlayer({...newPlayerObj});
                    goToLeaderboard();
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timer, goToLeaderboard, pageState, pageStates.QUESTION]);

    return (<>

        {pageState === pageStates.MAIN_MENU ? <>
        <GameMainMenu
            onSubmitName={(name, section) => {
                setLocalPlayerObj({...localPlayerObj, "name":name, "section": section});
                goToWaitingRoom(name, section);
            }}
            canSubmitName={waitingRoomIsOpen}
            showKickModal={showKickModal}
            handleCloseKick={handleCloseKick}
        />
        </> : <></>}

        {pageState === pageStates.WAITING_ROOM ? <>
        <GameWaitingRoom
            displayName={localPlayerObj.name}
            playersList={players}
        />
        </> : <></>}

        {pageState === pageStates.QUESTION ? <>
        <GameQuestion
            displayName={localPlayerObj.name}
            chartData={chartData}
            questionTime={questionTime}
            timer={timer}
            endQuestion={goToLeaderboard}
            selectAnswer={handleAnswerSubmit}
        />
        </> : <></>}

        {pageState === pageStates.LEADERBOARD ? <>
        <GameLeaderboard
            player={localPlayerObj}
            chartData={chartData}
            topPlayers={topPlayers}
        />
        </> : <></>}

        {pageState === pageStates.REVIEW ? <>
        <GameReview
            player={localPlayerObj}
            chartsData={questions}
            topPlayers={topPlayers}
        />
        </> : <></>}

        <br />
        <DevPanel
            goToMainMenu={goToMainMenu}
            goToLeaderboard={goToLeaderboard}
            goToReview={goToReview}
            goToQuestion={goToQuestion}
            goToWaitingRoom={goToWaitingRoom}
            displayName={localPlayerObj.name==null?"":localPlayerObj.name}
            setDisplayName={(name) => setLocalPlayerObj({...localPlayerObj, "name":name})}
        />
    
    </>);
}

GamePage.propTypes = {
    questions: PropTypes.array.isRequired,
    chartData: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired,
    adminQuestionIndex: PropTypes.number,
    waitingRoomIsOpen: PropTypes.bool.isRequired,
    playerAnswers: PropTypes.object.isRequired,
};

export default GamePage;