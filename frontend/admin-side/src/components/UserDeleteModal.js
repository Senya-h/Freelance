import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from '../axios';

export class DeleteModal extends Component{
    constructor(props) {
        super(props)
    }

     delete = () => {
        console.log(this.props.fetchLink)
        const data = {
            deleted:1,
            baned:0
        }
        axios.post(this.props.fetchLink, {
            headers: {
                    'Authorization': this.props.token,
                    'Content-Type': 'multipart/form-data'
                }, data
                    
                
        })
        .then(data => {
            document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">"+this.props.message+"</div>"
        })
        this.props.onHide()
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
                <Button variant="danger" onClick={() => this.delete()} >
                    Ištrinti
                </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default DeleteModal;