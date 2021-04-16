import {useState} from 'react';
import PropTypes from 'prop-types';

import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Table,
} from 'react-bootstrap';

import { MathComponent } from 'mathjax-react';

import GameChart from '../GameChart';


const GameLeaderboard = ({ player, chartData, topPlayers }) => {

    const localPlayer = topPlayers.find(p => p.id===player.id)===undefined ? player : null;
    console.log(topPlayers.find(p => p.id===player.id))

    return (<>

        <h2>Name: {player.name}</h2>
        <h3>Score: {player.score}</h3>
        <br />

        <Container fluid>
            <Row>
                <Col xs={8}>
                <Card style={{height:"80vh"}} className="text-center">
                    <Card.Header as="h5">Time Spent on Question: {player.times[player.times.length-1]}s</Card.Header>
                    <Card.Body>
                        <GameChart data={[chartData]} />
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
}

export default GameLeaderboard;