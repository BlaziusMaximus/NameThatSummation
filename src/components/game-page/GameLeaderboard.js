import {useState} from 'react';
import PropTypes from 'prop-types';

import { MathComponent } from 'mathjax-react';

import GameChart from '../GameChart';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


const GameLeaderboard = ({ player, chartData, topPlayers, answerTime }) => {

    const localPlayer = topPlayers.find(p => p.id===player.id)===undefined ? null : player;

    return (
        <>
        <h2>Name: {player.name}</h2>
        <h3>Score: {answerTime!=null?answerTime:"nah"}</h3>
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
                        <Button id={index} key={index} disabled style={{margin: "0 2%"}}>
                                <MathComponent tex={`y = ${e}`} />
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
                        {topPlayers.map(player =>
                        <tr key={player.name+""+player.score}>
                            <td>{player.name}</td>
                            <td>{player.score}</td>
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
        </>
    );
}

GameLeaderboard.propTypes = {
    player: PropTypes.object.isRequired,
    chartData: PropTypes.object.isRequired,
    topPlayers: PropTypes.array.isRequired,
    answerTime: PropTypes.number.isRequired,
}

export default GameLeaderboard;