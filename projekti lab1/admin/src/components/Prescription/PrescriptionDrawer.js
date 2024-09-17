import React from 'react';
import { Drawer, Button, Alert } from '@mui/material';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PrescriptionDrawer = ({
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
    <Drawer anchor="right" open={isOpen} onClose={toggle}>
        <div style={{ width: '400px', padding: '20px' }}>
            <h5>Add Prescription</h5>
            <Alert
                severity="info"
                open={!!errorMessageModal}
                onClose={() => setErrorMessageModal('')}
            >
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
                    <Input 
                        type="text" 
                        name="diagnoza" 
                        id="diagnoza" 
                        placeholder="Diagnosis" 
                        value={newPrescription.diagnoza} 
                        onChange={handleChange} 
                        required 
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="ilace">Ilace</Label>
                    <Input 
                        type="text" 
                        name="ilace" 
                        id="ilace" 
                        placeholder="Medication" 
                        value={newPrescription.ilace} 
                        onChange={handleChange} 
                        required 
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="udhezimi">Udhezimi</Label>
                    <Input 
                        type="text" 
                        name="udhezimi" 
                        id="udhezimi" 
                        placeholder="Instruction" 
                        value={newPrescription.udhezimi} 
                        onChange={handleChange} 
                        required 
                    />
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
                    <Button color="primary" type="submit" variant="contained">
                        Add Prescription
                    </Button>
                </div>
            </Form>
        </div>
    </Drawer>
);

export default PrescriptionDrawer;
