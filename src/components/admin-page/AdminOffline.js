import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Table,
    Container,
    Row,
    Col,
    Form,
} from 'react-bootstrap';


const AdminOffline = ({ initializeGame, clearGame, playersList, uploadQuestions, noQuestions }) => {

    const [questionsFile, setQuestionsFile] = useState(null);
    React.useEffect(() => {
        if (questionsFile != null) {
            const fileReader = new FileReader();
            fileReader.readAsText(questionsFile);
            fileReader.onload = () => {
                const questionJSON = JSON.parse(fileReader.result);
                console.log(questionJSON);
                uploadQuestions(questionJSON);
            }
        }
    }, [questionsFile, uploadQuestions]);

    return (<>

        <Button
            onClick={initializeGame}
            id="startgame"
            variant="danger"
            size="lg"
            block
            disabled={noQuestions}>
                Initialize Game
        </Button>
        <Button
            onClick={clearGame}
            id="cleargame"
            variant="secondary"
            size="lg"
            block>
                Clear Game
        </Button>
        <br />

        {playersList.length===0 ?
        <Container>
        <Row className="justify-content-md-center">
        <Col sm="auto">
            <h1>No Players in Database</h1>
        </Col>
        </Row>
        </Container>
        :
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Section</th>
                </tr>
            </thead>
            <tbody>
            {playersList.map(player =>
                <tr key={player.name+""+player.section}>
                    <td>{player.name}</td>
                    <td>{player.section}</td>
                </tr>
            )}
            </tbody>
        </Table>
        }

        <Form>
        <Form.Group>
        <Form.File
            type="file"
            id="fileUpload"
            label="Upload Questions JSON Here"
            onChange={(e) => setQuestionsFile(e.target.files[0])}
        />
        </Form.Group>
        </Form>

    </>);
}

AdminOffline.propTypes = {
    initializeGame: PropTypes.func.isRequired,
    clearGame: PropTypes.func.isRequired,
    playersList: PropTypes.array.isRequired,
    uploadQuestions: PropTypes.func.isRequired,
    noQuestions: PropTypes.bool.isRequired,
}

export default AdminOffline;