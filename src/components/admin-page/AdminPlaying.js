import {useState} from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import GameChart from '../GameChart';

import { MathComponent } from 'mathjax-react';


const AdminPlaying = ({ quitGame, prevQuestion, nextQuestion, questions, adminGameState, playersList }) => {

    const [tab, setTab] = useState("players");

    return (<>

        <Button onClick={quitGame} id="startgame" variant="danger" size="lg" block>Quit Game</Button>
        <ButtonGroup className="d-flex">
            <Button
                className="btn-block mr-1 mt-1 btn-lg"
                onClick={prevQuestion}
                id="prev"
                variant="secondary"
                size="lg"
                block
                disabled={adminGameState.questionIndex === 0}>
                    Previous Question
            </Button>
            <Button
                className="btn-block mr-1 mt-1 btn-lg"
                onClick={nextQuestion}
                id="next"
                variant="primary"
                size="lg"
                block>
                    Next Question
            </Button>
        </ButtonGroup>

        <Container fluid>
        <Row>
            <Col sm={5}>
            <Card style={{height:"80vh"}} className="text-center">
                <Card.Body>
                    <GameChart data={[questions[adminGameState.questionIndex]]} />
                </Card.Body>
                <Card.Footer>
                {questions[adminGameState.questionIndex].renderChoices.map((e,index) => (
                    <Button
                        id={index}
                        key={index}
                        disabled
                        style={{margin: "0 2%"}}
                        variant={questions[adminGameState.questionIndex].answerIndex===index?"success":"primary"}>
                            <MathComponent tex={`y = ${e}`} display={false} />
                    </Button>
                ))}
                </Card.Footer>
            </Card>
            </Col>
            <Col style={{padding: "0"}}>
            <Tabs id="tabs" activeKey={tab} onSelect={(t) => setTab(t)}>
                <Tab eventKey="players" title="Players">
                <Container style={{height:"80vh", overflowY: "scroll"}}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Section</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                        {playersList.map(player =>
                            <tr key={player.name+""+player.city}>
                                <td>{player.name}</td>
                                <td>{player.section}</td>
                                <td>{player.score}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Container>
                </Tab>
                <Tab eventKey="questions" title="Questions"><Container>
                <Tab.Container defaultActiveKey={`${adminGameState.questionIndex}`}>
                <Row>
                    <Col sm={4}>
                    <ListGroup style={{height:"80vh", overflowY: "scroll"}}>
                    {questions.map((q,index) =>
                        <ListGroup.Item
                            href={`${index}`}
                            key={`${index}`}
                            style={{cursor: "pointer", paddingLeft: "0", paddingRight: "0"}}
                            variant={index===adminGameState.questionIndex?"primary":(index<adminGameState.questionIndex?"secondary":"")}>
                                <Container>
                                <Row>
                                    {/* <Col xs={3} style={{margin: "auto"}}>
                                        <Button variant="danger" size="sm">✖</Button>
                                    </Col> */}
                                    <Col>
                                        {q.id}
                                    </Col>
                                </Row>
                                </Container>
                        </ListGroup.Item>
                    )}
                    </ListGroup>
                    </Col>
                    <Col sm={8} style={{paddingLeft: "0"}}>
                    <Tab.Content>
                    {questions.map((q,index) =>
                        <Tab.Pane eventKey={`${index}`} key={`${index}`}>
                        <Card style={{height:"60vh"}} className="text-center">
                            <Card.Body>
                                <GameChart data={[q]} />
                            </Card.Body>
                            <Card.Footer>
                            {q.renderChoices.map((e,expindex) => (
                                <Button
                                    id={expindex}
                                    key={expindex}
                                    disabled
                                    style={{margin: "0 2%"}}
                                    variant={q.answerIndex===expindex?"success":"primary"}>
                                        <MathComponent tex={`y = ${e}`} display={false} />
                                </Button>
                            ))}
                            </Card.Footer>
                        </Card>
                        </Tab.Pane>
                    )}
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
                </Container></Tab>
            </Tabs>
            </Col>
        </Row>
        </Container>
    </>);
}

AdminPlaying.propTypes = {
    quitGame: PropTypes.func.isRequired,
    prevQuestion: PropTypes.func.isRequired,
    nextQuestion: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    adminGameState: PropTypes.object.isRequired,
    playersList: PropTypes.array.isRequired,
}

export default AdminPlaying;