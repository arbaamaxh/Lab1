import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import Select from 'react-select';

const RoomModal = ({
    isOpen,
    toggle,
    newRoom,
    handleChange,
    handleSubmit,
    handleHospitalChange,
    handleDepartmentChange,
    errorMessageModal,
    setErrorMessageModal,
    hospitals,
    departments,
    selectedHospital,
    selectedDepartment
}) => (
    <Modal isOpen={isOpen} toggle={toggle} className="Modal">
        <ModalHeader toggle={toggle} className="ModalHeader">Add Room</ModalHeader>
        <ModalBody className="ModalBody">
            <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessageModal('')}>
                {errorMessageModal}
            </Alert>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="numri">Numri</Label>
                    <Input type="text" name="numri" id="numri" placeholder="Number" value={newRoom.numri} onChange={handleChange} required />
                </FormGroup>
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
                <div className="text-center">
                    <Button color="primary" type="submit">Add Room</Button>
                </div>
            </Form>
        </ModalBody>
    </Modal>
);

export default RoomModal;