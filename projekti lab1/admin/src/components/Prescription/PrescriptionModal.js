import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Button, Alert, Input } from 'reactstrap';
import Select from 'react-select';
import DatePicker from "react-datepicker";

const PrescriptionModal = ({
    isOpen,
    toggle,
    newPrescription,
    handleSubmit,
    handleHospitalChange,
    handleDepartmentChange,
    handleDoctorChange,
    handlePatientChange,
    handleDateChange,
    handleChange,
    errorMessageModal,
    setErrorMessageModal,
    hospitals,
    departments,
    doctors,
    patients,
    selectedHospital,
    selectedDepartment,
    selectedDoctor,
    selectedPatient,
    selectedDate,
}) => (
    <Modal isOpen={isOpen} toggle={toggle} className="Modal">
        <ModalHeader toggle={toggle} className="ModalHeader">Add Presciption</ModalHeader>
        <ModalBody className="ModalBody">
            <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessageModal('')}>
                {errorMessageModal}
            </Alert>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <DatePicker
                        placeholderText="Select Date"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="diagnoza">Diagnoza</Label>
                    <Input type="text" name="diagnoza" id="diagnoza" placeholder="Diagnosis" value={newPrescription.diagnoza} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="ilace">Ilace</Label>
                    <Input type="text" name="ilace" id="ilace" placeholder="Medication" value={newPrescription.ilace} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="udhezimi">Udhezimi</Label>
                    <Input type="text" name="udhezimi" id="udhezimi" placeholder="Instruction" value={newPrescription.udhezimi} onChange={handleChange} required />
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
                        value={selectedDepartment}
                        onChange={handleDepartmentChange}
                        isDisabled={!selectedHospital}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="doctorName">Doctor</Label>
                    <Select
                        options={doctors.map(doctor => ({ value: doctor.nrPersonal, label: `${doctor.emri} ${doctor.mbiemri}` }))}
                        classNamePrefix="custom-select"
                        placeholder="Select Doctor"
                        value={selectedDoctor ? { value: selectedDoctor.nrPersonal, label: `${selectedDoctor.emri} ${selectedDoctor.mbiemri}` } : null}
                        onChange={handleDoctorChange}
                        isDisabled={!selectedDepartment}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="patientName">Patient</Label>
                    <Select
                        options={patients.map(patient => ({ value: patient.nrPersonal, label: `${patient.emri} ${patient.mbiemri}` }))}
                        classNamePrefix="custom-select"
                        placeholder="Select Patient"
                        value={selectedPatient ? { value: selectedPatient.nrPersonal, label: `${selectedPatient.emri} ${selectedPatient.mbiemri}` } : null}
                        onChange={handlePatientChange}
                        isDisabled={!selectedHospital}
                        required
                    />
                </FormGroup>
                <div className="text-center">
                    <Button color="primary" type="submit">Add Presciption</Button>
                </div>
            </Form>
        </ModalBody>
    </Modal>
);

export default PrescriptionModal;