import {useState} from 'react';

import PropTypes from 'prop-types';

import GameChart from './GameChart';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';


const GameReview = ({ displayName, chartsData, playersList, answerTime }) => {

    let rankedPlayers = playersList.sort((a,b) => (a.name > b.name) ? 1 : -1);
    console.log(rankedPlayers)
    let topPlayers = rankedPlayers.length >= 5 ? rankedPlayers.slice(0,5) : rankedPlayers;
    let localPlayer = null; // rankedPlayers.find(p => p.id == thisPlayer.id) == undefined ? null : thisPlayer;
    
    let answerChoice = "choice2";

    return (
        <>
        <h2>Name: {displayName}</h2>
        <h3>Score: {answerTime!=null?answerTime:"nah"}</h3>
        <br />
        <Container fluid>
            <Row>
                <Col xs={8}>
                <Tab.Container id="list-group-tabs-example" defaultActiveKey={chartsData[0].id}>
                    <Row>
                        <Col sm={4}>
                        <ListGroup>
                        {chartsData.map(chart => (
                        <ListGroup.Item href={chart.id} key={chart.id}>
                            Question 1: {chart.id}
                        </ListGroup.Item>
                        ))}
                        </ListGroup>
                        </Col>
                        <Col sm={8}>
                        <Tab.Content>
                        {chartsData.map(chart => (
                        <Tab.Pane eventKey={chart.id} key={chart.id}>
                        <Card style={{height:"80vh"}} className="text-center">
                            <Card.Header as="h5">Time Spent on Question: {1}s</Card.Header>
                            <Card.Body>
                                <GameChart data={chart} />
                            </Card.Body>
                            <Card.Footer>
                                <Button disabled id="choice1" variant={answerChoice==="choice1"?"success":"primary"} style={{margin: "0 2%"}}>y = x</Button>
                                <Button disabled id="choice2" variant={answerChoice==="choice2"?"success":"primary"} style={{margin: "0 2%"}}>y = x^2</Button>
                                <Button disabled id="choice3" variant={answerChoice==="choice3"?"success":"primary"} style={{margin: "0 2%"}}>y = log_2(x)</Button>
                                <Button disabled id="choice4" variant={answerChoice==="choice4"?"success":"primary"} style={{margin: "0 2%"}}>y = sqrt(x)</Button>
                            </Card.Footer>
                        </Card>
                        </Tab.Pane>
                        ))}
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                </Col>
                <Col>
                    <h1>LEADERBOARD</h1>
                    <ul>
                        {topPlayers.map(player =>  <li key={player.name+""+player.city}>{player.name}</li> )}
                    </ul>
                    <p key="ellipsis1">...</p>
                        {localPlayer == null ? <></> : (<>
                            <ul><li key="localPlayer">{localPlayer.name}</li></ul>
                            <p key="ellipsis2">...</p>
                        </>)}
                </Col>
            </Row>
        </Container>
        </>
    );
}

GameReview.propTypes = {
    displayName: PropTypes.string.isRequired,
    chartsData: PropTypes.array.isRequired,
    playersList: PropTypes.array.isRequired,
    answerTime: PropTypes.number.isRequired,
}

export default GameReview;