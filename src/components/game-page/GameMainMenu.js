import PropTypes from 'prop-types';
import { useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';

import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';


const GameMainMenu = ({ onSubmitName, canSubmitName }) => {

    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const handleShowSettings = () => setShowSettingsModal(true);
    const handleCloseSettings = () => setShowSettingsModal(false);

    const handleNameSubmit = (e) => {
        e.preventDefault();
        onSubmitName(e.target[0].value);
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

        <Container>
            <Row className="justify-content-md-center">
                <Col sm="auto"><h1>Name That Summation</h1></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={8}>
                    <Form onSubmit={handleNameSubmit}>
                        <InputGroup>
                            <FormControl
                                placeholder="Display Name"
                                aria-label="Display Name"
                                aria-describedby="display-name-form"
                                />
                            <InputGroup.Append>
                                <Button variant="outline-primary" type="submit" disabled={!canSubmitName}>Submit</Button>
                            </InputGroup.Append>
                        </InputGroup>
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