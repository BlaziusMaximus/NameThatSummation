import PropTypes from 'prop-types';

import {
    Button,
    Table,
} from 'react-bootstrap';


const AdminWaiting = ({ playersList, startGame, quitGame, kickPlayer, noPlayers }) => {

    return (<>

        <Button
            onClick={quitGame}
            id="startgame"
            variant="danger"
            size="lg"
            block>
                Quit Game
        </Button>
        <Button
            onClick={startGame}
            id="startgame"
            variant="success"
            size="lg"
            block
            disabled={noPlayers}>
                Start Game
        </Button>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th style={{width: "10%"}}></th>
                    <th>Player</th>
                    <th>Section</th>
                </tr>
            </thead>
            <tbody>
            {playersList.map(player =>
                <tr key={player.name+""+player.section}>
                    <td><Button onClick={() => kickPlayer(player)}>Kick</Button></td>
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
    quitGame: PropTypes.func.isRequired,
    kickPlayer: PropTypes.func.isRequired,
    noPlayers: PropTypes.bool.isRequired,
}

export default AdminWaiting;