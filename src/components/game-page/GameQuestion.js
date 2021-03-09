import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

import GameChart from './GameChart';

import {useEffect, useState} from 'react';

import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const GameQuestion = ({ displayName, chartData, questionTime, endQuestion }) => {

    const [answerChoice, setAnswerChoice] = useState("");
    const handleAnswerSelect = (e) => {
        setAnswerChoice(e.target.id);
    }

    const maxTimer = questionTime;
    const [timer, setTimer] = useState(questionTime);
    const [chartDataSlice, setChartDataSlice] = useState(chartData);
    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) { setTimer(timer => timer-1); }
            if (timer <= 0) { setTimer(0); endQuestion(); }

            let cd = {...chartData};
            cd.data = cd.data.slice(0,parseFloat(maxTimer-timer)/parseFloat(maxTimer) * chartData.data.length);
            setChartDataSlice(cd);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer, maxTimer, chartData, endQuestion]);

    return (
        <>
        <h2>Name: {displayName}</h2>
        <Card style={{height:"80vh"}} className="text-center">
            <Card.Header as="h5">Time Remaining: {timer}</Card.Header>
            <Card.Body>
                <GameChart data={chartDataSlice} />
            </Card.Body>
            <Card.Footer>
                <Button onClick={handleAnswerSelect} id="choice1" variant={answerChoice==="choice1"?"success":"primary"} style={{margin: "0 2%"}}>y = x</Button>
                <Button onClick={handleAnswerSelect} id="choice2" variant={answerChoice==="choice2"?"success":"primary"} style={{margin: "0 2%"}}>y = x^2</Button>
                <Button onClick={handleAnswerSelect} id="choice3" variant={answerChoice==="choice3"?"success":"primary"} style={{margin: "0 2%"}}>y = log_2(x)</Button>
                <Button onClick={handleAnswerSelect} id="choice4" variant={answerChoice==="choice4"?"success":"primary"} style={{margin: "0 2%"}}>y = sqrt(x)</Button>
            </Card.Footer>
        </Card>
        <h1>{answerChoice}</h1>
        </>
    );
}

GameQuestion.propTypes = {
    displayName: PropTypes.string.isRequired,
    chartData: PropTypes.object.isRequired,
    questionTime: PropTypes.number.isRequired,
    endQuestion: PropTypes.func.isRequired,
}

export default GameQuestion;