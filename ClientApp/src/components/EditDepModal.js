import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditDepModal extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        event.preventDefault();

        fetch(process.env.REACT_APP_API + 'department', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: event.target.DepartmentId.value,
                name: event.target.DepartmentName.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert("Failed");
                })
    }

    render() {

        return (

            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>

                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Editar Departamento
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="DepartmentId">
                                        <Form.Label>Id departamento</Form.Label>
                                        <Form.Control type="text" name="DepartmentId" required
                                            disabled
                                            defaultValue={this.props.depid}
                                            placeholder="Nombre de departamento" />
                                    </Form.Group>


                                    <Form.Group controlId="DepartmentName">
                                        <Form.Label>Nombre departamento</Form.Label>
                                        <Form.Control type="text" name="DepartmentName" required
                                            defaultValue={this.props.depname}
                                            placeholder="Nombre de departamento" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Actualizar departamento
                                            </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )

    }


}