import PropTypes from 'prop-types';
import React, {useState} from 'react';

import GameMainMenu from './game-page/GameMainMenu';
import GameQuestion from './game-page/GameQuestion';
import GameWaitingRoom from './game-page/GameWaitingRoom';
import GameLeaderboard from './game-page/GameLeaderboard';
import GameReview from './game-page/GameReview';
import GameSettings from './game-page/GameSettings';

import DevPanel from './DevPanel';

import {
    setPlayer,
    setAnswers,
} from './GameFirebase';
import GamePageHeader from './game-page/GamePageHeader';


const GamePage = ({ questions, chartData, players, adminQuestionIndex, waitingRoomIsOpen, playerAnswers, kickPlayer }) => {

    const pageStates = {
        MAIN_MENU: "MAIN_MENU",
        WAITING_ROOM: "WAITING_ROOM",
        QUESTION: "QUESTION",
        LEADERBOARD: "LEADERBOARD",
        REVIEW: "REVIEW",
    };
    const [pageState, setPageState] = useState(pageStates.MAIN_MENU);
    
    const [timer, setTimer] = useState(chartData.questionTime);
    
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

    const [showBadSectionModal, setShowBadSectionModal] = useState(false);
    const handleShowBadSection = () => setShowBadSectionModal(true);
    const handleCloseBadSection = () => setShowBadSectionModal(false);
    
    const goToMainMenu = () => {
        setPageState(pageStates.MAIN_MENU);
    }
    const goToWaitingRoom = (name, section) => {
        setPageState(pageStates.WAITING_ROOM);
        const newPlayerObj = {
            ...localPlayerObj,
            id: Math.floor(Math.random()*Date.now()),
            "name": name,
            "section": section,
            "score": 0,
        }
        setLocalPlayerObj({...newPlayerObj});
        setPlayer({...newPlayerObj});
    }
    const goToQuestion = React.useCallback(() => {
        setPageState(pageStates.QUESTION);
        setQuestionIndex(adminQuestionIndex);
        setTimer(questions[adminQuestionIndex].questionTime);
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
        const score = parseFloat(chartData.maxScore)*parseFloat(t)/parseFloat(chartData.questionTime);
        let was = localPlayerObj.wrongAnswers;
        let newAnswer = false;
        if (was[chartData.id] === undefined) { was[chartData.id] = []; newAnswer = true; }
        if (a !== chartData.answerIndex) { was[chartData.id].push(a); }
        const newPlayerObj = {
            ...localPlayerObj,
            answers: newAnswer?[...(localPlayerObj.answers),a]:[...(localPlayerObj.answers)],
            wrongAnswers: was,
            times: newAnswer?[...(localPlayerObj.times),chartData.questionTime-t]:[...(localPlayerObj.times)],
            score: localPlayerObj.score + newAnswer?Math.floor(score):0,
        };
        setLocalPlayerObj({...newPlayerObj});
        setPlayer({...newPlayerObj});

        let newAnswers = playerAnswers;
        newAnswers[localPlayerObj.id] = a;
        setAnswers({...newAnswers});
        console.log(playerAnswers, newAnswers);
    }

    const wipePlayer = () => {
        kickPlayer(localPlayerObj);
        setLocalPlayerObj({
            id: null,
            name: null,
            score: null,
            section: null,
            answers: [],
            wrongAnswers: {},
            times: [],
        });
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

    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const handleShowSettings = () => setShowSettingsModal(true);
    const handleCloseSettings = () => setShowSettingsModal(false);
    const SettingsComponent = (
        <GameSettings
            showSettingsModal={showSettingsModal}
            handleShowSettings={handleShowSettings}
            handleCloseSettings={handleCloseSettings}
        />
    );

    const DevComponent = (
        <DevPanel
            goToMainMenu={goToMainMenu}
            goToLeaderboard={goToLeaderboard}
            goToReview={goToReview}
            goToQuestion={goToQuestion}
            goToWaitingRoom={goToWaitingRoom}
            displayName={localPlayerObj.name==null?"":localPlayerObj.name}
            setDisplayName={(name) => setLocalPlayerObj({...localPlayerObj, "name":name})}
        />
    );
    
    const HeaderComponent = (
        <GamePageHeader
            player={localPlayerObj}
            goToMainMenu={() => {wipePlayer(); goToMainMenu();}}
        />
    );

    let PageComponent;
    let renderHeader = true;
    switch (pageState) {
        case pageStates.MAIN_MENU:
            PageComponent = (
                <GameMainMenu
                    onSubmitName={(name, section) => {
                        setLocalPlayerObj({...localPlayerObj, "name":name, "section": section});
                        goToWaitingRoom(name, section);
                    }}
                    canSubmitName={waitingRoomIsOpen}
                    showKickModal={showKickModal}
                    handleCloseKick={handleCloseKick}
                    settings={SettingsComponent}
                    showBadSectionModal={showBadSectionModal}
                    handleCloseBadSection={handleCloseBadSection}
                    handleShowBadSection={handleShowBadSection}
                />
            );
            renderHeader = false;
            break;
        case pageStates.WAITING_ROOM:
            PageComponent = (
                <GameWaitingRoom
                    displayName={localPlayerObj.name}
                    playersList={players}
                    settings={SettingsComponent}
                />
            );
            break;
        case pageStates.QUESTION:
            PageComponent = (
                <GameQuestion
                    displayName={localPlayerObj.name}
                    chartData={chartData}
                    questionTime={chartData.questionTime}
                    timer={timer}
                    endQuestion={goToLeaderboard}
                    selectAnswer={handleAnswerSubmit}
                    settings={SettingsComponent}
                />
            );
            break;
        case pageStates.LEADERBOARD:
            PageComponent = (
                <GameLeaderboard
                    player={localPlayerObj}
                    chartData={chartData}
                    topPlayers={topPlayers}
                    settings={SettingsComponent}
                />
            );
            break;
        case pageStates.REVIEW:
            PageComponent = (
                <GameReview
                    player={localPlayerObj}
                    chartsData={questions}
                    topPlayers={topPlayers}
                    settings={SettingsComponent}
                />
            );
            break;
        default:
            PageComponent = <></>;
    }

    return (<>

        {renderHeader ? HeaderComponent : <></>}

        {PageComponent}
    
    </>);
}

GamePage.propTypes = {
    questions: PropTypes.array.isRequired,
    chartData: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired,
    adminQuestionIndex: PropTypes.number,
    waitingRoomIsOpen: PropTypes.bool.isRequired,
    playerAnswers: PropTypes.object.isRequired,
    kickPlayer: PropTypes.func.isRequired,
};

export default GamePage;