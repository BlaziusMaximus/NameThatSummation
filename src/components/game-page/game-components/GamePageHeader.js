import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {
    Navbar,
    Nav,
    Button,
    Modal,
} from 'react-bootstrap';


const GamePageHeader = ({ player, goToMainMenu, settings }) => {

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const handleShowConfirm = () => setShowConfirmModal(true);
    const handleCloseConfirm = () => setShowConfirmModal(false);

    return (<>

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand style={{paddingRight: "2vw"}}>
                {settings}
            </Navbar.Brand>
            <Navbar.Brand style={{paddingRight: "2vw"}}>
                <strong>Name</strong>: {player.name}
            </Navbar.Brand>
            <Navbar.Brand>
                <strong>Score</strong>: {player.score}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" />
            <Nav>
            <Nav.Item className="mr-2">
                <Button onClick={handleShowConfirm}>Go to <strong>Main Menu</strong></Button>
            </Nav.Item>
            </Nav>
            </Navbar.Collapse>
        </Navbar>

        <Modal show={showConfirmModal} onHide={handleCloseConfirm} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
            <Modal.Title>Main Menu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                By going to the Main Menu screen, you'll be leaving the game.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {handleCloseConfirm(); goToMainMenu();}}>Confirm</Button>
                <Button variant="secondary" onClick={handleCloseConfirm}>Cancel</Button>
            </Modal.Footer>
        </Modal>

    </>);
}

GamePageHeader.propTypes = {
    player: PropTypes.object.isRequired,
    goToMainMenu: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
};

export default GamePageHeader;