import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';


const DevPanel = ({ goToMainMenu, goToLeaderboard, goToQuestion, goToReview, goToWaitingRoom, displayName, setDisplayName }) => {

    return (
        <>
        <Button onClick={() => goToMainMenu()}>MAIN MENU</Button>
        <Button onClick={() => {setDisplayName(displayName); goToWaitingRoom(displayName);}}>WAITING ROOM</Button>
        <Button onClick={goToQuestion}>QUESTION</Button>
        <Button onClick={() => goToLeaderboard(1)}>LEADERBOARD</Button>
        <Button onClick={() => goToReview(1)}>REVIEW</Button>
        <LinkContainer to="/admin-page">
            <Button>ADMIN</Button>
        </LinkContainer>
        </>
    );
}

DevPanel.propTypes = {
    goToMainMenu: PropTypes.func.isRequired,
    goToLeaderboard: PropTypes.func.isRequired,
    goToQuestion: PropTypes.func.isRequired,
    goToReview: PropTypes.func.isRequired,
    goToWaitingRoom: PropTypes.func.isRequired,
    displayName: PropTypes.string.isRequired,
    setDisplayName: PropTypes.func.isRequired,
}

export default DevPanel;