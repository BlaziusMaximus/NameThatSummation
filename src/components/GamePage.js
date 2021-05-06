import PropTypes from 'prop-types';
import React, {useState} from 'react';

import GameMainMenu from './game-page/GameMainMenu';
import GameQuestion from './game-page/GameQuestion';
import GameWaitingRoom from './game-page/GameWaitingRoom';
import GameLeaderboard from './game-page/GameLeaderboard';
import GameReview from './game-page/GameReview';
import GameSettings from './game-page/game-components/GameSettings';

import DevPanel from './DevPanel';

import {
    setPlayer,
    setAnswers,
} from './GameFirebase';
import GamePageHeader from './game-page/game-components/GamePageHeader';


const GamePage = ({ questions, chartData, players, adminQuestionIndex, questionActive, waitingRoomIsOpen, playerAnswers, kickPlayer, pointEval }) => {

    // enum object of game webpage states relevant to the player
    const pageStates = {
        MAIN_MENU: "MAIN_MENU",
        WAITING_ROOM: "WAITING_ROOM",
        QUESTION: "QUESTION",
        LEADERBOARD: "LEADERBOARD",
        REVIEW: "REVIEW",
    };
    const [pageState, setPageState] = useState(pageStates.MAIN_MENU);
    
    const [timer, setTimer] = useState(chartData.questionTime); // question timer
    
    const [questionIndex, setQuestionIndex] = useState(null);

    // local copy of firebase's version of the local player
    const [localPlayerObj, setLocalPlayerObj] = useState({
        id: null,
        name: null,
        score: null,
        section: null,
        answers: {},
        wrongAnswers: {},
        times: {},
    });

    // kicked from game modal logic
    const [showKickModal, setShowKickModal] = useState(false);
    const handleShowKick = () => setShowKickModal(true);
    const handleCloseKick = () => setShowKickModal(false);
    // non-integer section input modal logic
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
        setLocalPlayerObj({...newPlayerObj}); // update local player
        setPlayer({...newPlayerObj}); // update firebase player
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
        // when progressing from the leaderboard page, logic for going to next question or review
        if (adminQuestionIndex != null && (pageState === pageStates.WAITING_ROOM || (adminQuestionIndex !== questionIndex && questionIndex !== null))) {
            goToQuestion();
        }
        if (adminQuestionIndex === null && (pageState === pageStates.QUESTION || pageState === pageStates.LEADERBOARD)) {
            goToReview();
        }
    }, [adminQuestionIndex, questionIndex, pageState, pageStates.WAITING_ROOM, pageStates.QUESTION, pageStates.LEADERBOARD, goToQuestion, goToReview]);

    const handleAnswerSubmit = async (a,t) => {
        // console.log(localPlayerObj.name, "answer:", a, "time:", t, "score:",chartData.maxScore*t);
        const points = parseFloat(chartData.maxScore)*parseFloat(chartData.questionTime-t)/parseFloat(chartData.questionTime);
        // update answer at question id to latest submission
        let localAnswers = {...localPlayerObj.answers};
        localAnswers[chartData.id] = a;
        // initialize wrong answer array at question id if first submission
        let firstAnswer = false;
        let localWrongs = localPlayerObj.wrongAnswers;
        if (localWrongs[chartData.id] === undefined) { localWrongs[chartData.id] = []; firstAnswer = true; }
        // update wrong answer array if necessary
        let rightAnswer = (a === chartData.answerIndex);
        if (!rightAnswer) { localWrongs[chartData.id].push(a); }
        // update submission time at question id
        let localTimes = {...localPlayerObj.times};
        localTimes[chartData.id] = t;
        // update player object for local and firebase storage
        const newPlayerObj = {
            ...localPlayerObj,
            answers: localAnswers,
            wrongAnswers: localWrongs,
            times: localTimes,
            score: localPlayerObj.score + (firstAnswer&&rightAnswer?Math.floor(points):0),
        };
        console.log(localPlayerObj.score, firstAnswer&&rightAnswer?Math.floor(points):0)
        setLocalPlayerObj({...newPlayerObj}); // local
        setPlayer({...newPlayerObj});         // firebase
        // update PlayerAnswers AdminVar for progress bars
        let newAnswers = playerAnswers;
        newAnswers[chartData.id][localPlayerObj.id] = a;
        setAnswers({...newAnswers});
        // console.log(playerAnswers, newAnswers);
    }

    const wipePlayer = () => {
        kickPlayer(localPlayerObj);
        setLocalPlayerObj({
            id: null,
            name: null,
            score: null,
            section: null,
            answers: {},
            wrongAnswers: {},
            times: {},
        });
    }

    // top 5 players for leaderboard
    const [topPlayers, setTopPlayers] = useState([]);
    React.useEffect(() => {
        setTopPlayers(
            players.filter(a => Number.isInteger(a.score))
                   .sort((a,b) => a.score<b.score ? 1 : -1)
                   .slice(0,5)
        );
        // if local player not found in firebase, kick from game
        if (pageState !== pageStates.MAIN_MENU && players.find(player => player.id === localPlayerObj.id) === undefined) {
            // console.log("local player not in playersDB", players, localPlayerObj);
            setPageState(pageStates.MAIN_MENU);
            handleShowKick();
            if (localPlayerObj.name != null) { wipePlayer(); }
        }
    }, [players, pageStates.MAIN_MENU]);

    // timing logic
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (pageState === pageStates.QUESTION && localPlayerObj.answers[chartData.id] !== chartData.answerIndex) {
                if (timer > 0) {
                    let tim = {...localPlayerObj.times};
                    tim[chartData.id] = chartData.questionTime-(timer-1);
                    const newPlayerObj = {
                        ...localPlayerObj,
                        times: tim,
                    };
                    // console.log(newPlayerObj)
                    setLocalPlayerObj({...newPlayerObj});
                    setPlayer({...newPlayerObj});
                    setTimer(timer-1);
                } else {
                    let ans = {...localPlayerObj.answers};
                    ans[chartData.id] = null;
                    let tim = {...localPlayerObj.times};
                    tim[chartData.id] = chartData.questionTime;
                    const newPlayerObj = {
                        ...localPlayerObj,
                        answers: ans,
                        times: tim,
                    };
                    // console.log({...newPlayerObj})
                    setLocalPlayerObj({...newPlayerObj});
                    setPlayer({...newPlayerObj});
                    goToLeaderboard();
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timer, goToLeaderboard, pageState, pageStates.QUESTION, localPlayerObj]);

    React.useEffect(() => {
        if (pageState === pageStates.QUESTION && questionActive === false) {
            goToLeaderboard();
        }
    }, [questionActive]);

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
            settings={SettingsComponent}
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
                    pointEval={pointEval}
                />
            );
            break;
        case pageStates.LEADERBOARD:
            PageComponent = (
                <GameLeaderboard
                    player={localPlayerObj}
                    chartData={chartData}
                    topPlayers={topPlayers}
                    pointEval={pointEval}
                />
            );
            break;
        case pageStates.REVIEW:
            PageComponent = (
                <GameReview
                    player={localPlayerObj}
                    chartsData={questions}
                    topPlayers={topPlayers}
                    pointEval={pointEval}
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
    questionActive: PropTypes.bool,
    waitingRoomIsOpen: PropTypes.bool.isRequired,
    playerAnswers: PropTypes.object.isRequired,
    kickPlayer: PropTypes.func.isRequired,
    pointEval: PropTypes.func.isRequired,
};

export default GamePage;