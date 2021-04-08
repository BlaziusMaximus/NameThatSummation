import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';


const TeamPageHeader = () => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>Name That Summation</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" />
            <Nav>
                <Nav.Item className="mr-2">
                <LinkContainer to="/game-page">
                    <Button>Go to <strong>Game</strong></Button>
                </LinkContainer>
                </Nav.Item>
                <Nav.Link href="https://github.com/BlaziusMaximus/NameThatSummation">
                Go to <strong>GitHub</strong>
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default TeamPageHeader;