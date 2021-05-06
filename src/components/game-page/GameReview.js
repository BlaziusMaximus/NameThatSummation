import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Tab,
    ListGroup,
    Table,
} from 'react-bootstrap';

import { MathComponent } from 'mathjax-react';

import GameAnswerSelections from './game-components/GameAnswerSelections';
import GameChart from '../GameChart';
import {
    pointEval,
} from '../GameUtils';


const GameReview = ({ player, chartsData, topPlayers }) => {

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
            <Col xs={8}>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey={chartsData[0].id}>
            <Row>
                <Col sm={3}>
                    <ListGroup>
                        {chartsData.map((chart,index) => (
                        <ListGroup.Item href={chart.id} key={chart.id} style={{cursor: "pointer"}}>
                            Q{index+1}: {chart.id}
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    {chartsData.map((chart,index) => (
                    <Tab.Pane eventKey={chart.id} key={chart.id}>
                    <Card style={{height:"65vh"}} className="text-center">
                        <Card.Header as="h5">Time Spent on Question: {player.times[`q${index}`]}s</Card.Header>
                        <Card.Body>
                        {wrongChartIndex===null ?
                            <GameChart data={[chart]} />
                        :
                            <GameChart
                                data={[chart, 
                                    { "id": "wrongData", "data": [...Array(Math.floor((chart.xEnd-chart.xStart)/parseFloat(chart.xInc))+1).keys()].map(e => (
                                        { "x":String(e), "y":pointEval(chart.evalChoices[wrongChartIndex], e) }
                                    ))}
                                ]}
                            />
                        }
                        </Card.Body>
                        <Card.Footer>
                            {chart.renderChoices.map((e, expindex) => (
                            <Button disabled id={e} key={e} variant={chart.answerIndex===expindex?"success":"primary"} style={{margin: "0 2%"}}>
                                <MathComponent tex={`y = ${e}`} display={false} />
                            </Button>
                            ))}
                        </Card.Footer>
                    </Card>
                    <br />
                    <GameAnswerSelections
                        player={player}
                        chartData={chart}
                        showWrongChart={toggleWrongChart}
                    />
                    </Tab.Pane>
                    ))}
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
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

GameReview.propTypes = {
    player: PropTypes.object.isRequired,
    chartsData: PropTypes.array.isRequired,
    topPlayers: PropTypes.array.isRequired,
}

export default GameReview;