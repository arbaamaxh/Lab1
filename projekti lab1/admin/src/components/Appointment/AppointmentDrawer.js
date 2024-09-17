import React from 'react';
import { Drawer, Button, Alert } from '@mui/material';
import { Form, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';
import DatePicker from "react-datepicker";

const AppointmentDrawer = ({
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
    <Drawer anchor="right" open={isOpen} onClose={toggle}>
        <div style={{ width: '400px', padding: '20px' }}>
            <h5>Add Appointment</h5>
            <Alert
                severity="info"
                open={!!errorMessageModal}
                onClose={() => setErrorMessageModal('')}
            >
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
                    <DatePicker
                        placeholderText="Select Date"
                        selected={selectedDateForInsert}
                        onChange={handleDateToInsert}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                    />
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
                    <Button color="primary" type="submit" variant="contained">
                        Add Appointment
                    </Button>
                </div>
            </Form>
        </div>
    </Drawer>
);

export default AppointmentDrawer;
