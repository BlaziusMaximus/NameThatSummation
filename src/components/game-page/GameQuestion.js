import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

import {useState} from 'react';

import PropTypes from 'prop-types';

const GameQuestion = ({ displayName }) => {

    const [answerChoice, setAnswerChoice] = useState("");

    const handleAnswerSelect = (e) => {
        setAnswerChoice(e.target.id);
    }

    return (
        <>
        <h2>Name: {displayName}</h2>
        <Jumbotron>
            <h1>CHART GOES HERE</h1>
            <p>
                Once we find a chart api, this is where, we'll draw the summation chart in real time.
            </p>
        </Jumbotron>
        <Button onClick={handleAnswerSelect} id="choice1" variant={answerChoice==="choice1"?"success":"primary"}>y = x</Button>
        <Button onClick={handleAnswerSelect} id="choice2" variant={answerChoice==="choice2"?"success":"primary"}>y = x^2</Button>
        <Button onClick={handleAnswerSelect} id="choice3" variant={answerChoice==="choice3"?"success":"primary"}>y = log_2(x)</Button>
        <Button onClick={handleAnswerSelect} id="choice4" variant={answerChoice==="choice4"?"success":"primary"}>y = sqrt(x)</Button>
        <h1>{answerChoice}</h1>
        </>
    );
}

GameQuestion.propTypes = {
    displayName: PropTypes.string,
}

export default GameQuestion;