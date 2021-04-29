import PropTypes from 'prop-types';

import {
    Spinner,
    Container,
    Row,
    Col,
} from 'react-bootstrap';

const GameWaitingRoom = ({}) => {

    return (<>

        <Container style={{"height":"80vh", "paddingTop":"40vh"}}>
            <Row style={{"justifyContent":"center"}}>
                <Col xs="auto" style={{marginTop: "auto", marginBottom: "auto"}}>
                    <h1>WAITING</h1>
                </Col>
                <Col xs="auto" style={{marginTop: "auto", marginBottom: "auto"}}>
                    <Spinner animation="border" />
                </Col>
            </Row>
        </Container>
        
    </>);
}

GameWaitingRoom.propTypes = {
}

export default GameWaitingRoom;