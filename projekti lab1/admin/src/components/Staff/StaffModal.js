import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Alert, Row, Col } from 'reactstrap';
import Select from 'react-select';

const StaffModal = ({
    isOpen,
    toggle,
    newStaff,
    handleChange,
    handleSubmit,
    handleHospitalChange,
    handleDepartmentChange,
    handleRoomChange,
    errorMessageModal,
    setErrorMessageModal,
    hospitals,
    departments,
    rooms,
    selectedHospital,
    selectedDepartment,
    selectedRoom
}) => (
    <Modal isOpen={isOpen} toggle={toggle} className="Modal">
        <ModalHeader toggle={toggle} className="ModalHeader">Add Staff</ModalHeader>
        <ModalBody className="ModalBody">
            <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessageModal('')}>
                {errorMessageModal}
            </Alert>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="nrPersonal">Personal ID</Label>
                    <Input type="text" name="nrPersonal" id="nrPersonal" placeholder="Personal ID" value={newStaff.nrPersonal} onChange={handleChange} required pattern="^\d{10}$" title="Personal ID should have exactly 10 numbers" />
                </FormGroup>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="emri">Name</Label>
                            <Input type="text" name="emri" id="emri" placeholder="Name" value={newStaff.emri} onChange={handleChange} required pattern="^[A-Z][a-zA-Z\s]*$" title="Name must start with capital letter" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="mbiemri">Surname</Label>
                            <Input type="text" name="mbiemri" id="mbiemri" placeholder="Surname" value={newStaff.mbiemri} onChange={handleChange} required pattern="^[A-Z][a-zA-Z\s]*$" title="Surname must start with capital letter" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="pozita">Job Position</Label>
                            <Input type="text" name="pozita" id="pozita" placeholder="Job Position" value={newStaff.pozita} onChange={handleChange} required />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="adresa">Address</Label>
                            <Input type="text" name="adresa" id="adresa" placeholder="Address" value={newStaff.adresa} onChange={handleChange} required />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="nrTel">Phone Number</Label>
                            <Input type="text" name="nrTel" id="nrTel" placeholder="Phone Number" value={newStaff.nrTel} onChange={handleChange} required pattern="^\d{5,15}$" title="Phone Number should have between 5-15 numbers." />
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
                                value={selectedDepartment}
                                onChange={handleDepartmentChange}
                                isDisabled={!selectedHospital}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="dhoma">Room</Label>
                            <Select
                                options={rooms.map(r => ({ value: r.roomID, label: r.numri }))}
                                classNamePrefix="custom-select"
                                placeholder="Select Room"
                                value={selectedRoom}
                                onChange={handleRoomChange}
                                isDisabled={!selectedDepartment}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <div className="text-center">
                    <Button color="primary" type="submit">Add Staff</Button>
                </div>
            </Form>
        </ModalBody>
    </Modal>
);

export default StaffModal;