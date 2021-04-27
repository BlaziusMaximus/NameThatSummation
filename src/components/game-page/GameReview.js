import PropTypes from 'prop-types';

import GameChart from '../GameChart';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';

import { MathComponent } from 'mathjax-react';


const GameReview = ({ player, chartsData, topPlayers }) => {

    const localPlayer = topPlayers.find(p => p.id===player.id)===undefined ? null : player;

    return (<>

        <h2>Name: {player.name}</h2>
        <h3>Score: {player.score}</h3>
        <br />

        <Container fluid>
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
                    <Card style={{height:"60vh"}} className="text-center">
                        <Card.Header as="h5">Time Spent on Question: {player.times[index]}s</Card.Header>
                        <Card.Body>
                            <GameChart data={[chart]} />
                        </Card.Body>
                        <Card.Footer>
                            {chart.renderChoices.map((e, expindex) => (
                            <Button disabled id={e} key={e} variant={chart.answerIndex===expindex?"success":"primary"} style={{margin: "0 2%"}}>
                                <MathComponent tex={`y = ${e}`} display={false} />
                            </Button>
                            ))}
                        </Card.Footer>
                    </Card>
                    <h3>Wrong Answers:</h3>
                    <ListGroup horizontal>
                    {player.wrongAnswers[chart.id]!==undefined ? player.wrongAnswers[chart.id].map((ans) => (
                        <ListGroup.Item key={ans+"wrong"}>
                            <MathComponent tex={`y = ${chart.renderChoices[ans]}`} display={false} />
                        </ListGroup.Item>
                    )) : <></>}
                    </ListGroup>
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
                    {topPlayers.map(topplayer =>
                    <tr key={topplayer.name+""+topplayer.score}>
                        <td>{topplayer.name}</td>
                        <td>{topplayer.score}</td>
                    </tr>
                    )}
                    <tr key="ellipsis">
                        <td colSpan={2} style={{textAlign: "center"}}>...</td>
                    </tr>
                    {localPlayer == null ? <></> : (
                    <tr key="localPlayer">
                        <td>{localPlayer.name}</td>
                        <td>{localPlayer.score}</td>
                    </tr>
                    )}
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