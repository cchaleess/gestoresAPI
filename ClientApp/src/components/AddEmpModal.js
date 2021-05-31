import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';

export class AddEmpModal extends Component {

    constructor(props) {
        super(props);
        this.state = { deps: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH + this.photofilename;

    componentDidMount() {

        fetch(process.env.REACT_APP_API + 'department')
            .then(response => response.json())
            .then(data => {
                this.setState({ deps:data })
            });

    }

    handleSubmit(event) {

        event.preventDefault();

        fetch(process.env.REACT_APP_API+'employee', {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeId: null,
                name: event.target.EmployeeName.value,
                department:event.target.Department.value,
                dateofjoining: event.target.DateOfJoining.value,
                photofilename: this.photofilename
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

    // FOto
    handleFileSelected(event) {

        event.preventDefault();
        this.photofilename = event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "MyFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API + 'employee/SaveFile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then((result) => {
                this.imagesrc = process.env.REACT_APP_PHOTOPATH+result;
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

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Agregar Empleado
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="EmployeeName">
                                        <Form.Label>Nombre empleado</Form.Label>
                                        <Form.Control type="text" name="EmployeeName" required
                                            placeholder="Nombre de empleado" />
                                    </Form.Group>

                                    <Form.Group controlId="Department">
                                        <Form.Label>Departamento</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.deps.map(dep =>
                                                <option key={dep.id}>{dep.name}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                        <Form.Group controlId="DateOfJoining">
                                        <Form.Label>Fecha de ingreso</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="DateOfJoining"
                                            required
                                            placeholder="Fecha de ingreso" />
                                    </Form.Group>


                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Agrega empleado
                                            </Button>
                                    </Form.Group>
                                </Form>
                            </Col>

                            <Col sm={6}>
                                <Image width="200px" height="200px" src={this.imagesrc} />
                                <input onChange={this.handleFileSelected} type="File" />
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