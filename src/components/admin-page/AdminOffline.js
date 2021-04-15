import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const AdminOffline = ({ initializeGame, clearGame, playersList }) => {

    return (<>
        <Button onClick={initializeGame} id="startgame" variant="danger" size="lg" block>Initialize Game</Button>
        <Button onClick={clearGame} id="cleargame" variant="secondary" size="lg" block>Clear Game</Button>
        <br />

        {playersList.length===0 ?
        <Container>
        <Row className="justify-content-md-center">
            <Col sm="auto"><h1>No Players in Database</h1></Col>
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
    </>);
}

AdminOffline.propTypes = {
    initializeGame: PropTypes.func.isRequired,
    clearGame: PropTypes.func.isRequired,
    playersList: PropTypes.array.isRequired,
}

export default AdminOffline;