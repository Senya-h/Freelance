import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

export class DeleteModal extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(

            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                <Modal.Title>Patvirtinimas</Modal.Title>
                </Modal.Header>
                <Modal.Body> {this.props.text} </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.onHide}>
                    Uždaryti
                </Button>
                <Button variant="danger" onClick={this.props.delete} >
                    Ištrinti
                </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default DeleteModal;