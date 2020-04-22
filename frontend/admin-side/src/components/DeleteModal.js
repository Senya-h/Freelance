import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from '../axios';

export class DeleteModal extends Component{
    constructor(props) {
        super(props)
    }

    delete = (id) => {
        axios.delete(`/skill/delete/${id}`)
        .then(data => {
            document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Įgūdis ištrintas</div>"
        })
    }

    render() {
        console.log(this.props.show)
        return(

            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                <Modal.Title>Patvirtinimas</Modal.Title>
                </Modal.Header>
                <Modal.Body>Ar tikrai norite ištrinti {this.props.skillName}? </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.onHide}>
                    Uždaryti
                </Button>
                <Button variant="danger" onClick={() => this.delete(this.props.skillID)}>
                    Ištrinti
                </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default DeleteModal;