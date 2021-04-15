import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


const AdminOffline = ({ initializeGame }) => {

    return (<>
        <Button onClick={initializeGame} id="startgame" variant="danger" size="lg" block>Initialize Game</Button>
    </>);
}

AdminOffline.propTypes = {
    initializeGame: PropTypes.func.isRequired,
}

export default AdminOffline;