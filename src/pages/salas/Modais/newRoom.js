import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Formik } from 'formik';
import './style.css'
export default class NewRoom extends Component {

    constructor(props){
        super(props);
        this.state={
            modalShow: true
        }
    }

    handleClose = () => {
        this.props.limpaModal();
        this.setState({modalShow: false})
    }

    render() {
        return (
            <Modal
                show={this.state.modalShow}
                onHide={() => this.handleClose()}
                backdrop="static"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Sala Nova
                </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{padding:"0px", margin: 10}}>
                <Formik
                    initialValues={{ nickName: ""}}
                    onSubmit={async values => {
                        this.props.onSubmit(values)
                    }}
                    >
                    {props => {
                        const {
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset
                        } = props;
                        return (
                        <form onSubmit={handleSubmit}>
                            <div className="boxModal">
                                <div className="boxloginModal">
                                <input
                                    id="sala"
                                    name="sala"
                                    placeholder="Nome Sala"
                                    type="text"
                                    value={values.sala}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />                
                                <Button type="submit" >Criar Sala</Button>
                                </div>
                            </div>
                        </form>
                        )
                    }}
                    </Formik>
                </Modal.Body>
            </Modal>
        )
    }
}
