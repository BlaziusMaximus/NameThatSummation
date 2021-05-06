import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Container,
    Row,
    Col,
    Card,
    Tabs,
    Tab,
    Table,
    ListGroup,
    ButtonGroup,
    ProgressBar,
} from 'react-bootstrap';

import GameChart from '../GameChart';

import { MathComponent } from 'mathjax-react';


const AdminPlaying = ({ quitGame, prevQuestion, nextQuestion, endQuestion, questions, localGameState, playersList, playerAnswers }) => {
    
    const [tab, setTab] = useState("players");

    const [answerStats, setAnswerStats] = useState([0,0,0,0]);
    React.useEffect(() => {
        let newStats = [0,0,0,0];
        playersList.forEach(player => {
            if (playerAnswers !== undefined && playerAnswers[player.id] !== undefined) {
                newStats[playerAnswers[player.id]] += 1;
            }
        });
        setAnswerStats(newStats);
    }, [playerAnswers, playersList]);

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
                disabled={localGameState.questionIndex === 0}>
                    Previous Question
            </Button>
            <Button
                className="btn-block mr-1 mt-1 btn-lg"
                onClick={endQuestion}
                id="end"
                variant="warning"
                size="lg"
                block>
                    End Question
            </Button>
            <Button
                className="btn-block mr-1 mt-1 btn-lg"
                onClick={nextQuestion}
                id="next"
                variant="primary"
                size="lg"
                block>
                    {localGameState.questionIndex+1<questions.length?"Next Question":"Review"}
            </Button>
        </ButtonGroup>

        <Container fluid>
        <Row>
            <Col sm={5}>
            <Card style={{height:"80vh"}} className="text-center">
                <Card.Body>
                    <GameChart data={[questions[localGameState.questionIndex]]} />
                </Card.Body>
                <Card.Footer>
                {questions[localGameState.questionIndex].renderChoices.map((e,index) => (
                    <Button
                        id={index}
                        key={index}
                        disabled
                        style={{margin: "0 2%"}}
                        variant={questions[localGameState.questionIndex].answerIndex===index?"success":"primary"}>
                            <MathComponent tex={`y = ${e}`} display={false} />
                    </Button>
                ))}
                </Card.Footer>
                <br />
                <Container>
                {questions[localGameState.questionIndex].renderChoices.map((e,index) => (<>
                <Row>
                    <Col sm={3}>
                        <MathComponent tex={`y = ${e}`} display={false} />
                    </Col>
                    <Col>
                        <ProgressBar
                            label={`${answerStats[index]/playersList.length*100}%`}
                            variant={questions[localGameState.questionIndex].answerIndex===index?"success":"primary"}
                            now={answerStats[index]/playersList.length*100}
                        />
                    </Col>
                </Row>
                </>))}
                </Container>
                <br />
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
                                <th>Time</th>
                                <th>Answer</th>
                            </tr>
                        </thead>
                        <tbody>
                        {playersList.map(player =>
                            <tr key={player.name+""+player.city}>
                                <td>{player.name}</td>
                                <td>{player.section}</td>
                                <td>{player.score}</td>
                                <td>{player.times[`q${localGameState.questionIndex}`]==null?0:player.times[`q${localGameState.questionIndex}`]}</td>
                                <td>
                                {player.answers['q'+localGameState.questionIndex.toString()] != null ?
                                    <MathComponent
                                        tex={`y = ${questions[localGameState.questionIndex].renderChoices[player.answers['q'+localGameState.questionIndex.toString()]]}`}
                                        display={false}
                                    />
                                :   "NONE"}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Container>
                </Tab>
                <Tab eventKey="questions" title="Questions"><Container>
                <Tab.Container defaultActiveKey={`${localGameState.questionIndex}`}>
                <Row>
                    <Col sm={4}>
                    <ListGroup style={{height:"80vh", overflowY: "scroll"}}>
                    {questions.map((q,index) =>
                        <ListGroup.Item
                            href={`${index}`}
                            key={`${index}`}
                            style={{cursor: "pointer"}}
                            variant={index===localGameState.questionIndex?"primary":(index<localGameState.questionIndex?"secondary":"")}>
                                {q.id}
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
    endQuestion: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    localGameState: PropTypes.object.isRequired,
    playersList: PropTypes.array.isRequired,
    playerAnswers: PropTypes.object.isRequired,
}

export default AdminPlaying;
