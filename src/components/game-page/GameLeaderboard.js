import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Table,
} from 'react-bootstrap';

import { MathComponent } from 'mathjax-react';

import GameAnswerSelections from './game-components/GameAnswerSelections';
import GameChart from '../GameChart';
import {
    pointEval,
} from '../GameUtils';


const GameLeaderboard = ({ player, chartData, topPlayers }) => {

    const localPlayer = topPlayers.find(p => p.id===player.id)===undefined ? player : null;

    const [wrongChartIndex, setWrongChartIndex] = useState(null);
    const toggleWrongChart = (a) => {
        if (wrongChartIndex === a) { setWrongChartIndex(null); }
        else { setWrongChartIndex(a); }
    }

    return (<>

        <Container fluid>
            <br />
            <Row>
                <Col xs={7}>
                <Card style={{height:"70vh"}} className="text-center">
                    <Card.Header as="h5">Time Spent on Question: {player.times[chartData.id]}s</Card.Header>
                    <Card.Body>
                    {wrongChartIndex===null ?
                        <GameChart data={[chartData]} />
                    :
                        <GameChart
                            data={[chartData, 
                                { "id": "wrongData", "data": [...Array(Math.floor((chartData.xEnd-chartData.xStart)/parseFloat(chartData.xInc))+1).keys()].map(e => (
                                    { "x":String(e), "y":pointEval(chartData.evalChoices[wrongChartIndex], e) }
                                ))}
                            ]}
                        />
                    }
                    </Card.Body>
                    <Card.Footer>
                        {chartData.renderChoices.map((e,index) => (
                        <Button
                            id={index}
                            key={index}
                            disabled
                            variant={index===chartData.answerIndex?"success":"primary"}
                            style={{margin: "0 2%"}}>
                                <MathComponent tex={`y = ${e}`} display={false} />
                        </Button>
                        ))}
                    </Card.Footer>
                </Card>
                <GameAnswerSelections
                    player={player}
                    chartData={chartData}
                    showWrongChart={toggleWrongChart}
                />
                </Col>
                <Col>
                    <h1>LEADERBOARD</h1>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Top Players</th>
                                <th>Scores</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topPlayers.map(topPlayer =>
                            <tr
                                key={topPlayer.name+""+topPlayer.score}
                                style={topPlayer.id===player.id?{backgroundColor: "lightgreen"}:{}}>
                                    {topPlayer.id===player.id
                                    ? <td><b>{topPlayer.name}</b></td>
                                    : <td>{topPlayer.name}</td>
                                    }
                                    <td>{topPlayer.score}</td>
                            </tr>
                            )}
                            {localPlayer == null ? <></> : (<>
                            <tr key="ellipsis">
                                <td colSpan={2} style={{textAlign: "center"}}>...</td>
                            </tr>
                            <tr key="localPlayer" style={{backgroundColor: "lightgreen"}}>
                                <td><b>{localPlayer.name}</b></td>
                                <td>{localPlayer.score}</td>
                            </tr>
                            </>)}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    
    </>);
}

GameLeaderboard.propTypes = {
    player: PropTypes.object.isRequired,
    chartData: PropTypes.object.isRequired,
    topPlayers: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired,
}

export default GameLeaderboard;