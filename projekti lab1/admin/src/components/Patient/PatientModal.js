import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Alert, Row, Col, CustomInput } from 'reactstrap';
import Select from 'react-select';

const PatientModal = ({
    isOpen,
    toggle,
    newPatient,
    handleChange,
    handleSubmit,
    handleHospitalChange,
    errorMessageModal,
    setErrorMessageModal,
    hospitalOptions,
}) => (
    <Modal isOpen={isOpen} toggle={toggle} className="Modal">
        <ModalHeader toggle={toggle} className="ModalHeader">Add Patient</ModalHeader>
        <ModalBody className="ModalBody">
            <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessageModal('')}>
                {errorMessageModal}
            </Alert>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="emri">Name</Label>
                            <Input type="text" name="emri" id="emri" placeholder="Name" value={newPatient.emri} onChange={handleChange} required pattern="^[A-Z][a-zA-Z\s]*$" title="Name must start with capital letter" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="mbiemri">Surname</Label>
                            <Input type="text" name="mbiemri" id="mbiemri" placeholder="Surname" value={newPatient.mbiemri} onChange={handleChange} required pattern="^[A-Z][a-zA-Z\s]*$" title="Surname must start with capital letter" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="nrPersonal">Personal ID</Label>
                            <Input type="text" name="nrPersonal" id="nrPersonal" placeholder="Personal ID" value={newPatient.nrPersonal} onChange={handleChange} required pattern="^\d{10}$" title="Personal ID should have exactly 10 numbers" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="datelindja">Birthday</Label>
                            <Input type="text" name="datelindja" id="datelindja" placeholder="Birthday" value={newPatient.datelindja} onChange={handleChange} required />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="gjinia">Gender</Label>
                            <div>
                                <CustomInput
                                    type="radio"
                                    id="genderMale"
                                    name="gjinia"
                                    label="Male"
                                    value="Male"
                                    checked={newPatient.gjinia === 'Male'}
                                    onChange={handleChange}
                                    required
                                />
                                <CustomInput
                                    type="radio"
                                    id="genderFemale"
                                    name="gjinia"
                                    label="Female"
                                    value="Female"
                                    checked={newPatient.gjinia === 'Female'}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="adresa">Address</Label>
                            <Input type="text" name="adresa" id="adresa" placeholder="Address" value={newPatient.adresa} onChange={handleChange} required />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="nrTel">Phone Number</Label>
                            <Input type="text" name="nrTel" id="nrTel" placeholder="Phone Number" value={newPatient.nrTel} onChange={handleChange} required pattern="^\d{5,15}$" title="Phone Number should have between 5-15 numbers." />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="hospitalName">Hospital</Label>
                            <Select
                                options={hospitalOptions}
                                classNamePrefix="custom-select"
                                placeholder="Select Hospital"
                                value={hospitalOptions.find(option => option.value === newPatient.hospitalId)}
                                onChange={(selectedOption) => handleHospitalChange(selectedOption)}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <div className="text-center">
                    <Button color="primary" type="submit">Add Patient</Button>
                </div>
            </Form>
        </ModalBody>
    </Modal>
);

export default PatientModal;