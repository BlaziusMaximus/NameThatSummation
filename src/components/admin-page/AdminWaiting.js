import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


const AdminWaiting = ({ playersList, startGame }) => {

    return (<>
        <Button onClick={startGame} id="startgame" variant="danger" size="lg" block>Start Game</Button>
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
    </>);
}

AdminWaiting.propTypes = {
    playersList: PropTypes.array.isRequired,
    startGame: PropTypes.func.isRequired,
}

export default AdminWaiting;