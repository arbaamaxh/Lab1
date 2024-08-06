import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Alert, Row, Col } from 'reactstrap';
import Select from 'react-select';

const DoctorModal = ({
    isOpen,
    toggle,
    newDoctor,
    handleChange,
    handleSubmit,
    handleHospitalChange,
    handleDepartmentChange,
    errorMessageModal,
    setErrorMessageModal,
    hospitals,
    departments,
    specializations,
    setNewDoctor,
    selectedHospital,
    selectedDepartment
}) => (
    <Modal isOpen={isOpen} toggle={toggle} className="Modal">
        <ModalHeader toggle={toggle} className="ModalHeader">Add Doctor</ModalHeader>
        <ModalBody className="ModalBody">
            <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessageModal('')}>
                {errorMessageModal}
            </Alert>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="emri">Name</Label>
                            <Input type="text" name="emri" id="emri" placeholder="Name" value={newDoctor.emri} onChange={handleChange} required pattern="^[A-Z][a-zA-Z\s]*$" title="Name must start with capital letter" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="mbiemri">Surname</Label>
                            <Input type="text" name="mbiemri" id="mbiemri" placeholder="Surname" value={newDoctor.mbiemri} onChange={handleChange} required pattern="^[A-Z][a-zA-Z\s]*$" title="Surname must start with capital letter" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="nrPersonal">Personal ID</Label>
                            <Input type="text" name="nrPersonal" id="nrPersonal" placeholder="Personal ID" value={newDoctor.nrPersonal} onChange={handleChange} required pattern="^\d{10}$" title="Personal ID should have exactly 10 numbers" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="adresa">Address</Label>
                            <Input type="text" name="adresa" id="adresa" placeholder="Address" value={newDoctor.adresa} onChange={handleChange} required />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="nrTel">Phone Number</Label>
                            <Input type="text" name="nrTel" id="nrTel" placeholder="Phone Number" value={newDoctor.nrTel} onChange={handleChange} required pattern="^\d{5,15}$" title="Phone Number should have between 5-15 numbers." />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="hospital">Hospital</Label>
                            <Select
                                options={hospitals.map(h => ({ value: h.nrRegjistrimit, label: h.emri }))}
                                classNamePrefix="custom-select"
                                placeholder="Select Hospital"
                                value={selectedHospital}
                                onChange={handleHospitalChange}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="department">Department</Label>
                            <Select
                                options={departments.map(d => ({ value: d.departmentID, label: d.emri }))}
                                classNamePrefix="custom-select"
                                placeholder="Select Department"
                                value={selectedDepartment ? { value: selectedDepartment.departmentID, label: selectedDepartment.emri } : null}
                                onChange={handleDepartmentChange}
                                isDisabled={!selectedHospital}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="specializimi">Specialization</Label>
                            <Select
                                options={specializations.map(spec => ({ value: spec, label: spec }))}
                                classNamePrefix="custom-select"
                                placeholder="Select Specialization"
                                value={newDoctor.specializimi ? { value: newDoctor.specializimi, label: newDoctor.specializimi } : null}
                                onChange={(selectedOption) => setNewDoctor({ ...newDoctor, specializimi: selectedOption.value })}
                                isDisabled={!selectedDepartment}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <div className="text-center">
                    <Button color="primary" type="submit">Add Doctor</Button>
                </div>
            </Form>
        </ModalBody>
    </Modal>
);

export default DoctorModal;