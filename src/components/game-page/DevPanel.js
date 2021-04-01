import {useState} from 'react';

import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';


const DevPanel = ({ goToLeaderboard, goToQuestion, goToReview, goToWaitingRoom, displayName, setDisplayName }) => {

    return (
        <>
        <Button onClick={() => {setDisplayName(displayName); goToWaitingRoom(displayName);}}>WAITING ROOM</Button>
        <Button onClick={goToQuestion}>QUESTION</Button>
        <Button onClick={() => goToLeaderboard(1)}>LEADERBOARD</Button>
        <Button onClick={() => goToReview(1)}>REVIEW</Button>
        </>
    );
}

DevPanel.propTypes = {
    goToLeaderboard: PropTypes.func.isRequired,
    goToQuestion: PropTypes.func.isRequired,
    goToReview: PropTypes.func.isRequired,
    goToWaitingRoom: PropTypes.func.isRequired,
    displayName: PropTypes.string.isRequired,
    setDisplayName: PropTypes.func.isRequired,
}

export default DevPanel;