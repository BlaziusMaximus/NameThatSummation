import {useState} from 'react';

import PropTypes from 'prop-types';

const GameLeaderboard = ({ displayName, playersList }) => {

    return (
        <>
        <h2>Name: {displayName}</h2>
        <br />
        <h1>LEADERBOARD</h1>
        <uL>
        {playersList.map(pl =>  <li key={pl}>{pl}</li> )}
        </uL>
        </>
    );
}

GameLeaderboard.propTypes = {
    displayName: PropTypes.string.isRequired,
    playersList: PropTypes.object.isRequired,
}

export default GameLeaderboard;