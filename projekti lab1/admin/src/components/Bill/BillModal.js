import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Alert, Table } from 'reactstrap';
import Select from 'react-select';
import "assets/css/ModalStyles.css";

const BillModal = ({
    isOpen,
    toggle,
    newBill,
    newService,
    servicePrices,
    addService,
    setNewService,
    handleHospitalChange,
    handlePatientChange,
    handleChange,
    handleSubmit,
    selectedHospital,
    selectedPatient,
    hospitals,
    patients,
    errorMessageModal,
    setErrorMessageModal,
}) => (
    <Modal isOpen={isOpen} toggle={toggle} className="Modal">
        <ModalHeader toggle={toggle} className="ModalHeader">Add Bill</ModalHeader>
        <ModalBody className="ModalBody">
            <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessageModal('')}>
                {errorMessageModal}
            </Alert>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="sherbimi">Services</Label>
                    <Select
                        options={Object.keys(servicePrices).map(service => ({ value: service, label: service }))}
                        value={newService}
                        onChange={(selectedOption) => setNewService(selectedOption.value)}
                        placeholder="Select Service"
                    />
                    <Button onClick={addService}>Add Service</Button>
                    <Table>
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newBill.sherbimi.map((service, index) => (
                                <tr key={index}>
                                    <td>{service.emri}</td>
                                    <td>{service.cmimi}€</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </FormGroup>
                <FormGroup>
                    <Label for="data">Date</Label>
                    <Input type="text" name="data" id="data" placeholder="Date" value={newBill.data} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="totali">Total</Label>
                    <Input type="text" name="totali" id="totali" placeholder="Total" value={newBill.totali} onChange={handleChange} required />
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
                    <Button color="primary" type="submit">Add Bill</Button>
                </div>
            </Form>
        </ModalBody>
    </Modal>
);

export default BillModal;