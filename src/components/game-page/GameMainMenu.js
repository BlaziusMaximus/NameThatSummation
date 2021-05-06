import PropTypes from 'prop-types';

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


const GameMainMenu = ({ onSubmitName, canSubmitName, showKickModal, handleCloseKick, settings, showBadSectionModal, handleShowBadSection, handleCloseBadSection }) => {

    const handleNameSubmit = (e) => {
        e.preventDefault();

        let name = e.target[0].value;
        let section = parseInt(e.target[1].value);

        if (!isNaN(section)) {
            onSubmitName(name, section);
        } else {
            handleShowBadSection();
        }
    }

    return (<>

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
                {settings}
            </Navbar.Brand>
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

        <Modal show={showKickModal} onHide={handleCloseKick} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Kicked From Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You've been kicked from the game and removed from the database.
                Contact the administrator for more information.
            </Modal.Body>
        </Modal>

        <Modal show={showBadSectionModal} onHide={handleCloseBadSection} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Invalid Section</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                The section number you entered is invalid.
            </Modal.Body>
        </Modal>

        <Container style={{"height":"60vh", "paddingTop":"20vh"}}>
            <Row className="justify-content-md-center">
                <Col sm="auto"><h1>Name That Summation</h1></Col>
            </Row>
            <br />
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
    showKickModal: PropTypes.bool.isRequired,
    handleCloseKick: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
    showBadSectionModal: PropTypes.bool.isRequired,
    handleCloseBadSection: PropTypes.func.isRequired,
    handleShowBadSection: PropTypes.func.isRequired,
};

export default GameMainMenu;