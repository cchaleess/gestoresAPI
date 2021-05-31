import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { AddEmpModal } from './AddEmpModal';
import { EditEmpModal } from './EditEmpModal';

export class Employee extends Component {

    constructor(props) {

        super(props);
        this.state = { emps: [], addModalShow: false, editModalShow: false }

    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'employee')
            .then(response => response.json())
            .then(data => {
                this.setState({ emps: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteEmp(empid) {
        if (window.confirm("Esta seguro?")) {
            fetch(process.env.REACT_APP_API + 'employee/' + empid,{
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }


    render() {

        const { emps, empid, empname,depmt,photofilename,doj } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (

            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Empleado</th>
                            <th>Departamento</th>
                            <th>Ingreso</th>
                            <th>opciones</th>

                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp =>
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.department}</td>
                                <td>{emp.dateofjoining}</td>

                                <td>
                                    <ButtonToolbar>

                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({editModalShow: true,
                                                empid: emp.id, empname: emp.name, dpmt: emp.department,
                                                photofilename:emp.photofilename,doj:emp.dateofjoining
                                            })}>
                                            EDITAR
                                            </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteEmp(emp.id)}>
                                            BORRAR
                                            </Button>

                                        <EditEmpModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            empid={empid}
                                            empname={empname}
                                            depmt={depmt}
                                            photofilename={photofilename}
                                            doj={doj}
                                        />

                                    </ButtonToolbar>

                                </td>
                            </tr>)}

                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant="primary"
                        onClick={() => this.setState({ addModalShow: true })}>
                        Agregar Empleado </Button>
                    <AddEmpModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
            </div>

        )
    }
}