import {useState} from 'react';

import PropTypes from 'prop-types';

const GameLeaderboard = ({ displayName, playersList, answerTime }) => {

    return (
        <>
        <h2>Name: {displayName}</h2>
        <h3>Score: {answerTime!=null?answerTime:"nah"}</h3>
        <br />
        <h1>LEADERBOARD</h1>
        <ul>
            {playersList.map(player =>  <li key={player.name+""+player.city}>{player.name}</li> )}
        </ul>
        </>
    );
}

GameLeaderboard.propTypes = {
    displayName: PropTypes.string.isRequired,
    playersList: PropTypes.array.isRequired,
    answerTime: PropTypes.number.isRequired,
}

export default GameLeaderboard;