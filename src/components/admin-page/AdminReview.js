import PropTypes from 'prop-types';

import GameChart from '../GameChart';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';

import { MathComponent } from 'mathjax-react';


const AdminReview = ({ chartsData, playersList }) => {

    let rankedPlayers = playersList.sort((a,b) => (a.name > b.name) ? 1 : -1);
    console.log(rankedPlayers)
    let topPlayers = rankedPlayers.length >= 5 ? rankedPlayers.slice(0,5) : rankedPlayers;
    // let localPlayer = null; // rankedPlayers.find(p => p.id == thisPlayer.id) == undefined ? null : thisPlayer;

    return (
        <>
        <Container fluid>
        <Row>
            <Col xs={8}>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey={chartsData[0].id}>
            <Row>
                <Col sm={4}>
                    <ListGroup>
                        {chartsData.map((chart,index) => (
                        <ListGroup.Item href={chart.id} key={chart.id}>
                            Question {index}: {chart.id}
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col sm={8}>
                <Tab.Content>
                    {chartsData.map((chart,index) => (
                    <Tab.Pane eventKey={chart.id} key={chart.id}>
                    <Card style={{height:"80vh"}} className="text-center">
                        <Card.Body>
                            <GameChart data={[chart]} />
                        </Card.Body>
                        <Card.Footer>
                            {chart.renderChoices.map((e, expindex) => (
                            <Button disabled id={e} key={e} variant={chart.answerIndex===expindex?"success":"primary"} style={{margin: "0 2%"}}>
                                <MathComponent tex={`y = ${e}`} style={{pointerEvents:"none;"}} />
                            </Button>
                            ))}
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
            </Col>
        </Row>
        </Container>
        </>
    );
}

AdminReview.propTypes = {
    localPlayer: PropTypes.object.isRequired,
    chartsData: PropTypes.array.isRequired,
    playersList: PropTypes.array.isRequired,
    answerTime: PropTypes.number.isRequired,
}

export default AdminReview;