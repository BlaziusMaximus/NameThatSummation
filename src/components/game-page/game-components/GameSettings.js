import PropTypes from 'prop-types';

import {
    Button,
    Modal,
    Form,
} from 'react-bootstrap';


const GameSettings = ({ showSettingsModal, handleShowSettings, handleCloseSettings }) => {

    return (<>

        <Button variant="secondary" onClick={handleShowSettings}><i className="bi bi-gear"></i></Button>

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

    </>);
}

GameSettings.propTypes = {
    showSettingsModal: PropTypes.bool.isRequired,
    handleShowSettings: PropTypes.func.isRequired,
    handleCloseSettings: PropTypes.func.isRequired,
}

export default GameSettings;