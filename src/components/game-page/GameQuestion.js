import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import evaluatex from "evaluatex";

import { MathComponent } from 'mathjax-react';

import GameChart from '../GameChart';


const GameQuestion = ({ displayName, chartData, questionTime, endQuestion, selectAnswer }) => {

    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const hideFeedbackModal = () => {
        setShowFeedbackModal(false);

        if (answerChoiceIndex === chartData.answerIndex) {
            endQuestion();
        }
    }

    const [answerChoiceIndex, setAnswerChoiceIndex] = useState(null);
    const [answersClicked, setAnswersClicked] = useState(new Array(chartData.renderChoices.length).fill(0));
    const [answerTime, setAnswerTime] = useState(null);
    const handleAnswerSelect = (e) => {
        e.preventDefault();
        let id = parseInt(e.currentTarget.id);
        let newAnsClicked = answersClicked; newAnsClicked[parseInt(id)] = 1; setAnswersClicked(newAnsClicked);
        
        if (answerChoiceIndex===null) {
            selectAnswer(id, questionTime-timer);
        }
        setAnswerChoiceIndex(id);
        setAnswerTime(questionTime-timer);

        setShowFeedbackModal(true);
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
            cd.data = cd.data.slice(0, Math.min(l, sliceI));
            setChartDataSlice(cd);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer, maxTimer, chartData, endQuestion]);

    const pointEval = (e) => {
        let y = evaluatex(chartData.evalChoices[answerChoiceIndex])({x:e});
        if (y === Infinity || y === -Infinity) {
            return null;
        }
        return y;
    }

    return (
        <>
        <h2>Name: {displayName}</h2>
        <Card style={{height:"80vh"}} className="text-center">
            <Card.Header as="h5">Time Remaining: {timer}</Card.Header>
            <Card.Body>
                <GameChart data={[chartDataSlice]} />
            </Card.Body>
            <Card.Footer>
                {chartData.renderChoices.map((e,index) => (
                <Button
                    id={index} key={index}
                    onClickCapture={handleAnswerSelect}
                    variant={answersClicked[index]===1?(index===chartData.answerIndex?"success":"danger"):"primary"}
                    disabled={answersClicked[index]===1}
                    style={{margin: "0 2%"}}>
                        <MathComponent tex={`y = ${e}`} style={{pointerEvents:"none;"}} />
                </Button>
                ))}
            </Card.Footer>
        </Card>
        <h1>{answerChoiceIndex}</h1>

        <Modal show={showFeedbackModal} onHide={hideFeedbackModal} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>{answerChoiceIndex===chartData.answerIndex?"Correct!":"Not Quite..."}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {answerChoiceIndex===chartData.answerIndex ?<>
                <p>Good work! <MathComponent tex={`y = ${chartData.renderChoices[answerChoiceIndex]}`} display={false} /> was the correct equation.</p>
                <Card style={{height:"40vh"}} className="text-center">
                    <GameChart data={[chartData]} />
                </Card>
            </>:<>
                <p>Not quite... <MathComponent tex={`y = ${chartData.renderChoices[answerChoiceIndex]}`} display={false} /> isn't correct.</p>
                <Card style={{height:"40vh"}} className="text-center">
                    <GameChart
                        data={answerChoiceIndex==null?[chartDataSlice]:[
                            chartDataSlice, 
                            { "id": "wrongData", "data": [...Array(Math.floor((chartData.xEnd-chartData.xStart)/parseFloat(chartData.xInc))+1).keys()].map(e => (
                                { "x":String(e), "y":pointEval(e) }
                            )).slice(0,chartDataSlice.data.length)}
                        ]}
                    />
                </Card>
            </>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hideFeedbackModal}>Close</Button>
            </Modal.Footer>
        </Modal>
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