import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {
    ListGroup,
} from 'react-bootstrap';

import { MathComponent } from 'mathjax-react';


const GameAnswerSelections = ({ player, chartData, showWrongChart }) => {


    return (<>

        <h3>Answer Selections:</h3>
        <ListGroup horizontal>
        {player.wrongAnswers[chartData.id]!==undefined ? player.wrongAnswers[chartData.id].map((ans) => (
            <ListGroup.Item key={ans+"wrong"} variant="danger" action onClickCapture={() => showWrongChart(ans)} style={{width: "auto"}}>
                <MathComponent tex={`y = ${chartData.renderChoices[ans]}`} display={false} />
            </ListGroup.Item>
        )) : <></>}
        {player.answers[chartData.id]===chartData.answerIndex ? (
            <ListGroup.Item key={chartData.answerIndex+"right"} variant="success">
                <MathComponent tex={`y = ${chartData.renderChoices[chartData.answerIndex]}`} display={false} />
            </ListGroup.Item>
        ) : <></>}
        {player.wrongAnswers[chartData.id]===undefined && player.answers[chartData.id]!==chartData.answerIndex ? (
            <ListGroup.Item key={chartData.id+"none"} variant="warning">
                NONE
            </ListGroup.Item>
        ) : <></>}
        </ListGroup>

    </>);
}

GameAnswerSelections.propTypes = {
    player: PropTypes.object.isRequired,
    chartData: PropTypes.object.isRequired,
    showWrongChart: PropTypes.func.isRequired,
};

export default GameAnswerSelections;