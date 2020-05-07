import React, {Component} from 'react';
import {Modal, Button, Card} from 'react-bootstrap';
import axios, {baseURL} from '../../axios';
import ReactPlayer from 'react-player';
import mime from 'mime-types';

const PortfolioModal = (props) => {
    let displayDialogMode = null;
    if(mime.lookup(props.filePath)) {
        console.log(mime.lookup(props.filePath).split('/')[0])
        switch(mime.lookup(props.filePath).split('/')[0]) {
            case 'image':
                console.log("image")
                displayDialogMode = (
                    <>
                        <Card.Img variant="top" className="imgMax" src={`${baseURL}/storage/${props.filePath}`} />
                        <p>Aprašymas: {props.description}</p>
                    </>
                )
                break;
            case 'video':
                console.log("video")
                displayDialogMode = (
                    <>
                        <ReactPlayer className="imgMax" url={`${baseURL}/storage/${props.filePath}`} controls />
                        <p>Aprašymas: {props.description}</p>
                    </>
                )
                break;
            case 'application':
                console.log("application")
                displayDialogMode = (
                    <>
                        <a target="_blank" rel="noopener noreferrer" href={`${baseURL}/storage/${props.filePath}`}>Darbas.{mime.lookup(props.filePath).split('/')[1]}</a>
                        <p>Aprašymas: {props.description}</p>
                    </>
                )
                break;
            default:
                console.log("neveikia")
                break;
        }
    }
        return(

            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    {displayDialogMode}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Uždaryti
                </Button>
                </Modal.Footer>
            </Modal>
        );
}
export default PortfolioModal;