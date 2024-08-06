import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import Select from 'react-select';

const DepartmentModal = ({
    isOpen,
    toggle,
    newDepartment,
    handleChange,
    handleSubmit,
    handleHospitalChange,
    errorMessageModal,
    setErrorMessageModal,
    hospitalOptions,
}) => (
    <Modal isOpen={isOpen} toggle={toggle} className="Modal">
        <ModalHeader toggle={toggle} className="ModalHeader">Add Department</ModalHeader>
        <ModalBody className="ModalBody">
            <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessageModal('')}>
                {errorMessageModal}
            </Alert>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="emri">Name</Label>
                    <Input type="text" name="emri" id="emri" value={newDepartment.emri} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="lokacioni">Location</Label>
                    <Input type="text" name="lokacioni" id="lokacioni" value={newDepartment.lokacioni} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="nrTel">Phone Number</Label>
                    <Input type="text" name="nrTel" id="nrTel" value={newDepartment.nrTel} onChange={handleChange} required pattern="^\d{5,15}$" title="Phone Number should have between 5-15 numbers." />
                </FormGroup>
                <FormGroup>
                    <Label for="hospitalName">Hospital</Label>
                    <Select
                        options={hospitalOptions}
                        classNamePrefix="custom-select"
                        placeholder="Select Hospital"
                        value={hospitalOptions.find(option => option.value === newDepartment.hospitalId)}
                        onChange={(selectedOption) => handleHospitalChange(selectedOption)}
                        required
                    />
                </FormGroup>
                <div className="text-center">
                    <Button color="primary" type="submit">Add Department</Button>
                </div>
            </Form>
        </ModalBody>
    </Modal>
);

export default DepartmentModal;