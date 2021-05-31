import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepModal } from './AddDepModal';
import { EditDepModal } from './EditDepModal';

export class Department extends Component {

    constructor(props) {

        super(props);
        this.state = { deps: [], addModalShow: false, editModalShow:false }

    }

    refreshList() {
    fetch(process.env.REACT_APP_API+'department')
            .then(response=>response.json())
            .then(data=>{
                this.setState({ deps: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteDep(depid) {
        if (window.confirm("Esta seguro?")) {
            fetch(process.env.REACT_APP_API + 'department/' + depid, {
                method: 'DELETE',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }


    render() {

        const { deps, depid, depname } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (

            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Departamento</th>
                        <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep =>
                            <tr key={dep.id}>
                                <td>{dep.id}</td>
                                <td>{dep.name}</td>
                                <td>
                                    <ButtonToolbar>

                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({editModalShow: true,
                                                depid:dep.id, depname:dep.name})}>
                                            EDITAR
                                            </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteDep(dep.id)}>
                                            BORRAR
                                            </Button>

                                        <EditDepModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            depid={depid}
                                            depname={depname}/>

                                    </ButtonToolbar>

                                </td>
                            </tr>)}

                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant="primary"
                        onClick={() => this.setState ({ addModalShow: true })}>
                        Agregar Departamento </Button>
                    <AddDepModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
            </div>

        )
    }
}
