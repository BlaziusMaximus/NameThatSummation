import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';

import GameChart from './GameChart';

import {useEffect, useState} from 'react';

import { MathComponent } from 'mathjax-react'

import PropTypes from 'prop-types';

const GameQuestion = ({ displayName, chartData, questionTime, endQuestion, selectAnswer }) => {

    const [answerChoice, setAnswerChoice] = useState("");
    const handleAnswerSelect = (e) => {
        setAnswerChoice(e.target.id);
        selectAnswer(e.target.id);
    }

    const maxTimer = questionTime;
    const [timer, setTimer] = useState(questionTime);
    let cd = {...chartData};
    cd.data = cd.data.slice(0,2);
    const [chartDataSlice, setChartDataSlice] = useState(cd);
    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) { setTimer(timer => timer-1); }
            // if (timer <= 0) { endQuestion(Math.max(0, timer)); }

            let cd = {...chartData};
            let x = parseFloat(maxTimer-timer)/parseFloat(maxTimer);
            let l = chartData.data.length;
            let sliceI = Math.floor(x**2 * (l-2))+2;
            console.log("before"+sliceI)
            console.log(cd)
            cd.data = cd.data.slice(0, Math.min(chartData.data.length, sliceI));
            console.log("after")
            console.log(cd)
            setChartDataSlice(cd);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer, maxTimer, chartData, endQuestion]);

    // console.log(chartData.answerChoices[0], "=1: ", evaluatex(chartData.answerChoices[0])({x:10}));
    // console.log(chartData.answerChoices[1], "=1: ", evaluatex(chartData.answerChoices[1])({x:10}));
    // console.log(chartData.answerChoices[2], "=1: ", evaluatex(chartData.answerChoices[2])({x:10}));
    // console.log(chartData.answerChoices[3], "=1: ", evaluatex(chartData.answerChoices[3])({x:10}));

    return (
        <>
        <h2>Name: {displayName}</h2>
        <Card style={{height:"80vh"}} className="text-center">
            <Card.Header as="h5">Time Remaining: {timer}</Card.Header>
            <Card.Body>
                <GameChart data={chartDataSlice} />
            </Card.Body>
            <Card.Footer>
                {chartData.latexExp.map(e => (
                <Button onClick={handleAnswerSelect} id={e} key={e} variant={answerChoice===e?"success":"primary"} style={{margin: "0 2%"}}>
                    <MathComponent tex={`y = ${e}`} />
                </Button>
                ))}
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
    selectAnswer: PropTypes.func.isRequired,
}

export default GameQuestion;