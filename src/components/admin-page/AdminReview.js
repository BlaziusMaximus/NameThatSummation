import PropTypes from 'prop-types';

import GameChart from '../GameChart';

import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Tab,
    ListGroup,
    Table,
    ProgressBar,
} from 'react-bootstrap';

import { MathComponent } from 'mathjax-react';


const AdminReview = ({ chartsData, playersList, endGame, playerAnswers }) => {

    let rankedPlayers = playersList.sort((a,b) => (a.name > b.name) ? 1 : -1);
    let topPlayers = rankedPlayers.length >= 5 ? rankedPlayers.slice(0,5) : rankedPlayers;

    return (<>

        <Button onClick={endGame} id="cleargame" variant="secondary" size="lg" block>End Game</Button>

        <Container fluid>
        <br />
        <Row>
            <Col xs={8}>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey={chartsData[0].id}>
            <Row>
                <Col sm={4}>
                    <ListGroup>
                        {chartsData.map((chart,index) => (
                        <ListGroup.Item href={chart.id} key={chart.id} style={{cursor: "pointer"}}>
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
                                <MathComponent tex={`y = ${e}`} style={{pointerEvents:"none;"}} display={false} />
                            </Button>
                            ))}
                        </Card.Footer>
                        <br />
                        <Container>
                        {chart.renderChoices.map((e,index) => (<>
                        <Row>
                            <Col sm={3}>
                                <MathComponent tex={`y = ${e}`} display={false} />
                            </Col>
                            <Col>
                                <ProgressBar
                                    label={`${Object.values(playerAnswers[chart.id]).filter(x => x===index).length/playersList.length*100}%`}
                                    variant={chart.answerIndex===index?"success":"primary"}
                                    now={Object.values(playerAnswers[chart.id]).filter(x => x===index).length/playersList.length*100}
                                />
                            </Col>
                        </Row>
                        </>))}
                        </Container>
                        <br />
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
                </tbody>
                </Table>
            </Col>
        </Row>
        </Container>
    
    </>);
}

AdminReview.propTypes = {
    chartsData: PropTypes.array.isRequired,
    playersList: PropTypes.array.isRequired,
    endGame: PropTypes.func.isRequired,
    playerAnswers: PropTypes.object.isRequired,
}

export default AdminReview;