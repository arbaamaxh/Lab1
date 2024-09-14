import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Alert, Row, Col } from 'reactstrap';
import Select from 'react-select';
import DatePicker from "react-datepicker";

const AdminModal = ({
    isOpen,
    toggle,
    newAdmin,
    handleDateChange,
    handleChange,
    handleSubmit,
    handleHospitalChange,
    errorMessageModal,
    setErrorMessageModal,
    hospitalOptions,
    selectedDate,
}) => (
    <Modal isOpen={isOpen} toggle={toggle} className="Modal">
        <ModalHeader toggle={toggle} className="ModalHeader">Add Admininistrator</ModalHeader>
        <ModalBody className="ModalBody">
            <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessageModal('')}>
                {errorMessageModal}
            </Alert>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="emri">Name</Label>
                            <Input type="text" name="emri" id="emri" placeholder="Name" value={newAdmin.emri} onChange={handleChange} required pattern="^[A-Z][a-zA-Z\s]*$" title="Name must start with capital letter" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="mbiemri">Surname</Label>
                            <Input type="text" name="mbiemri" id="mbiemri" placeholder="Surname" value={newAdmin.mbiemri} onChange={handleChange} required pattern="^[A-Z][a-zA-Z\s]*$" title="Surname must start with capital letter" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="nrPersonal">Personal ID</Label>
                            <Input type="text" name="nrPersonal" id="nrPersonal" placeholder="Personal ID" value={newAdmin.nrPersonal} onChange={handleChange} required pattern="^\d{10}$" title="Personal ID should have exactly 10 numbers" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <DatePicker
                                placeholderText="Select Date"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="adresa">Address</Label>
                            <Input type="text" name="adresa" id="adresa" placeholder="Address" value={newAdmin.adresa} onChange={handleChange} required />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="nrTel">Phone Number</Label>
                            <Input type="text" name="nrTel" id="nrTel" placeholder="Phone Number" value={newAdmin.nrTel} onChange={handleChange} required pattern="^\d{5,15}$" title="Phone Number should have between 5-15 numbers." />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={newAdmin.email}
                                onChange={handleChange}
                                required
                                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                title="Please enter a valid email address"
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={newAdmin.password}
                                onChange={handleChange}
                                required
                                pattern="^(?=.*\d)[A-Za-z\d]{8,16}$"
                                title="Password must be 8-16 characters long and include at least one number" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="hospitalName">Hospital</Label>
                            <Select
                                options={hospitalOptions}
                                classNamePrefix="custom-select"
                                placeholder="Select Hospital"
                                value={hospitalOptions.find(option => option.value === newAdmin.hospitalId)}
                                onChange={(selectedOption) => handleHospitalChange(selectedOption)}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <div className="text-center">
                    <Button color="primary" type="submit">Add Admin</Button>
                </div>
            </Form>
        </ModalBody>
    </Modal>
);

export default AdminModal;