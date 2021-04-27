import PropTypes from 'prop-types';
import { useState } from 'react';

import {
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    Button,
    Form,
    InputGroup,
    FormControl,
    Modal,
} from 'react-bootstrap';

import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';


const GameMainMenu = ({ onSubmitName, canSubmitName, showKickModal, handleCloseKick }) => {

    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const handleShowSettings = () => setShowSettingsModal(true);
    const handleCloseSettings = () => setShowSettingsModal(false);

    const handleNameSubmit = (e) => {
        e.preventDefault();
        onSubmitName(e.target[0].value, e.target[1].value);
    }

    return (<>

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" />
            <Nav>
                <Nav.Item className="mr-2">
                <LinkContainer to="/team-page">
                    <Button>Go to <strong>Team Page</strong></Button>
                </LinkContainer>
                </Nav.Item>
                <Nav.Link href="https://github.com/BlaziusMaximus/NameThatSummation">
                Go to <strong>GitHub</strong>
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>

        <Button variant="secondary" onClick={handleShowSettings}>Settings</Button>
        <Modal show={showSettingsModal} onHide={handleCloseSettings} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <fieldset>
                <Form>
                    <Form.Check type="checkbox" label="Settings Option 1" />
                    <Form.Check type="checkbox" label="Settings Option 2" />
                </Form>
                <Form>
                    <Form.Check type="radio" label="Settings Option 3" />
                    <Form.Check type="radio" label="Settings Option 4" />
                </Form>
            </fieldset>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseSettings}>Close</Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showKickModal} onHide={handleCloseKick} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Kicked From Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You've been kicked from the game and removed from the database.
                Contact the administrator for more information.
            </Modal.Body>
        </Modal>

        <Container>
            <Row className="justify-content-md-center">
                <Col sm="auto"><h1>Name That Summation</h1></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={8}>
                <Form onSubmit={handleNameSubmit}>
                <Form.Row>
                <InputGroup>
                    <Col style={{padding: "0"}}>
                    <FormControl
                        placeholder="Display Name"
                        aria-label="Display Name"
                        aria-describedby="display-name-form"
                    />
                    </Col>
                    <Col style={{padding: "0"}}>
                    <FormControl
                        placeholder="Section"
                        aria-label="Section"
                        aria-describedby="section-form"
                    />
                    </Col>
                    <InputGroup.Append>
                        <Button variant="outline-primary" type="submit" disabled={!canSubmitName}>Submit</Button>
                    </InputGroup.Append>
                </InputGroup>
                </Form.Row>
                </Form>
                </Col>
            </Row>
        </Container>
        
    </>);
}

GameMainMenu.propTypes = {
    onSubmitName: PropTypes.func.isRequired,
    canSubmitName: PropTypes.bool.isRequired,
};

export default GameMainMenu;