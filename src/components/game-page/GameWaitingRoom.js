import PropTypes from 'prop-types';

const GameWaitingRoom = ({ displayName, playersList }) => {

    return (
        <>
        <h2>Name: {displayName}</h2>
        <br />
        <h1>WAITING</h1>
        <ul>
            {playersList.map(player =>  <li key={player.name+""+player.city}>{player.name}</li> )}
        </ul>
        </>
    );
}

GameWaitingRoom.propTypes = {
    displayName: PropTypes.string.isRequired,
    playersList: PropTypes.array.isRequired,
}

export default GameWaitingRoom;