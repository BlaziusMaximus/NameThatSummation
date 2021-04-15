import PropTypes from 'prop-types';
import React, {useState} from 'react';

import { db } from "../firebase";

import GameMainMenu from './game-page/GameMainMenu';
import GameQuestion from './game-page/GameQuestion';
import GameWaitingRoom from './game-page/GameWaitingRoom';
import GameLeaderboard from './game-page/GameLeaderboard';
import GameReview from './game-page/GameReview';
import DevPanel from './DevPanel';


const GamePage = ({ questions, chartData, players, adminQuestionIndex, waitingRoomIsOpen }) => {

    const pageStates = {
        MAIN_MENU: "MAIN_MENU",
        WAITING_ROOM: "WAITING_ROOM",
        QUESTION: "QUESTION",
        LEADERBOARD: "LEADERBOARD",
        REVIEW: "REVIEW",
    };
    const [pageState, setPageState] = useState(pageStates.MAIN_MENU);
    
    const [answerTime, setAnswerTime] = useState(0);
    
    const [questionIndex, setQuestionIndex] = useState(null);

    const [localPlayerObj, setLocalPlayerObj] = useState({
        "id": null,
        "name": null,
        "score": null,
        "section": null,
        "answers": [],
        "wrongAnswers": [],
        "times": [],
    });
    
    const goToMainMenu = () => {
        setPageState(pageStates.MAIN_MENU);
    }
    const goToWaitingRoom = (name, section) => {
        setPageState(pageStates.WAITING_ROOM);
        db.collection("playersDB").doc(name).set({
            ...localPlayerObj,
            id: Math.floor(Math.random()*Date.now()),
            "name": name,
            "section": section,
        });
    }
    const goToQuestion = React.useCallback(() => {
        setPageState(pageStates.QUESTION);
        setQuestionIndex(adminQuestionIndex);
    }, [adminQuestionIndex, pageStates.QUESTION]);
    const goToLeaderboard = (t) => {
        setPageState(pageStates.LEADERBOARD);
        setAnswerTime(t);
    }
    const goToReview = React.useCallback(() => {
        setPageState(pageStates.REVIEW);
    }, [pageStates.REVIEW]);

    React.useEffect(() => {
        if (adminQuestionIndex != null && (pageState === pageStates.WAITING_ROOM || adminQuestionIndex > questionIndex)) {
            goToQuestion();
        }
        if (adminQuestionIndex === null && (pageState === pageStates.QUESTION || pageState === pageStates.LEADERBOARD)) {
            console.log("REVIEW")
            goToReview();
        }
    }, [adminQuestionIndex, questionIndex, pageState, pageStates.WAITING_ROOM, pageStates.QUESTION, pageStates.LEADERBOARD, goToQuestion, goToReview]);

    const handleAnswerSubmit = async (a,t) => {
        console.log(localPlayerObj.name, "answer:", a, "time:", t, "score:",chartData/t);
        setLocalPlayerObj({
            ...localPlayerObj,
            answers: [...(localPlayerObj.answers),a],
            wrongAnswers: a===chartData.answerIndex ? [...(localPlayerObj.wrongAnswers)] : [...(localPlayerObj.wrongAnswers),a],
            times: [...(localPlayerObj.times),t],
            score: localPlayerObj.score + Math.floor(chartData.maxScore/t),
        });

        const docRef = db.collection('playersDB').doc(localPlayerObj.name);
        docRef.get().then(async (doc) => {
            if (doc.exists) {
                // name, section, times, answers, score
                const playerObject = doc.data();
                let playerAnswers = playerObject.answers===undefined ? [] : playerObject.answers;
                let playerTimes = playerObject.times===undefined ? [] : playerObject.times;
                await docRef.set({
                    ...playerObject,
                    answers: [...playerAnswers,a],
                    times: [...playerTimes,t],
                    score: playerObject.score + Math.floor(chartData.maxScore/t),
                });
            }
        });
    }

    const [topPlayers, setTopPlayers] = useState([]);
    React.useEffect(() => {
        setTopPlayers(
            players.filter(a => Number.isInteger(a.score))
                   .sort((a,b) => a.score<b.score ? 1 : -1)
                   .slice(0,5));
    }, [players]);

    return (
        <>
        {pageState === pageStates.MAIN_MENU ? <>
        <GameMainMenu
            onSubmitName={(name, section) => {
                setLocalPlayerObj({...localPlayerObj, "name":name, "section": section});
                goToWaitingRoom(name, section);
            }}
            canSubmitName={waitingRoomIsOpen}
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
            questionTime={15}
            endQuestion={goToLeaderboard}
            selectAnswer={handleAnswerSubmit}
        />
        </> : <></>}

        {pageState === pageStates.LEADERBOARD ? <>
        <GameLeaderboard
            player={localPlayerObj}
            chartData={chartData}
            topPlayers={topPlayers}
            answerTime={answerTime}
        />
        </> : <></>}

        {pageState === pageStates.REVIEW ? <>
        <GameReview
            localPlayer={localPlayerObj}
            chartsData={questions}
            playersList={players}
            answerTime={answerTime}
        />
        </> : <></>}

        <br />
        <DevPanel
            goToMainMenu={goToMainMenu}
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

GamePage.propTypes = {
    questions: PropTypes.array.isRequired,
    chartData: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired,
    adminQuestionIndex: PropTypes.number,
    waitingRoomIsOpen: PropTypes.bool.isRequired,
};

export default GamePage;