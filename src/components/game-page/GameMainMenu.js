import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import PropTypes from 'prop-types';


const GameMainMenu = ({ onGoToTeamClick, onSubmitName }) => {

    const handleNameSubmit = (e) => {
        e.preventDefault();
        onSubmitName(e.target[0].value);
    }

    return (
        <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" />
            <Nav>
                <Nav.Item className="mr-2">
                <Button onClick={onGoToTeamClick}>Go to <strong>Team Page</strong></Button>
                </Nav.Item>
                <Nav.Link href="https://github.com/BlaziusMaximus/NameThatSummation">
                Go to <strong>GitHub</strong>
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>

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
                                <Button variant="outline-primary" type="submit">Submit</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
        
        </>
    );
}

GameMainMenu.propTypes = {
    onGoToTeamClick: PropTypes.func.isRequired,
    onSubmitName: PropTypes.func.isRequired,
};

export default GameMainMenu;