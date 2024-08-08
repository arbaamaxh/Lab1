import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Button, Alert } from 'reactstrap';
import Select from 'react-select';
import DatePicker from "react-datepicker";

const AppointmentModal = ({
    isOpen,
    toggle,
    handleSubmit,
    handleHospitalChange,
    handleDepartmentChange,
    handleDoctorChange,
    handlePatientChange,
    handleDateToInsert,
    handleTimeChange,
    errorMessageModal,
    setErrorMessageModal,
    hospitals,
    departments,
    doctors,
    patients,
    availableTimeSlots,
    selectedHospital,
    selectedDepartment,
    selectedDoctor,
    selectedPatient,
    selectedTime,
    selectedDateForInsert,
}) => (
    <Modal isOpen={isOpen} toggle={toggle} className="Modal">
        <ModalHeader toggle={toggle} className="ModalHeader">Add Appointment</ModalHeader>
        <ModalBody className="ModalBody">
            <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessageModal('')}>
                {errorMessageModal}
            </Alert>
            <Form onSubmit={handleSubmit}>
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
                <FormGroup>
                    <Label for="data">Date</Label>
                    <FormGroup>
                        <DatePicker
                            placeholderText="Select Date"
                            selected={selectedDateForInsert}
                            onChange={handleDateToInsert}
                            dateFormat="yyyy-MM-dd"
                            className="form-control"
                        />
                    </FormGroup>
                </FormGroup>
                <FormGroup>
                    <Label for="ora">Time</Label>
                    <Select
                        options={availableTimeSlots.map(time => ({ value: time, label: time }))}
                        classNamePrefix="custom-select"
                        placeholder="Select Time"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        required
                        isDisabled={!selectedDateForInsert || !selectedDoctor}
                    />
                </FormGroup>
                <div className="text-center">
                    <Button color="primary" type="submit">Add Appointment</Button>
                </div>
            </Form>
        </ModalBody>
    </Modal>
);

export default AppointmentModal;