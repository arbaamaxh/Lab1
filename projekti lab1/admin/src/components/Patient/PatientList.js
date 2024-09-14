import React from 'react';
import {
    Table, Button, Input, Alert, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Card, CardBody, CardHeader, CardTitle
} from 'reactstrap';
import classnames from 'classnames';
import { usePatients } from '../../hooks/usePatients';
import PatientModal from './PatientModal';

const PatientList = () => {
    const {
        hospitals,
        patients,
        newPatient,
        patientModal,
        editedPatient,
        editingPatientId,
        selectedHospital,
        selectedDate,
        activeHospitalTab,
        hospitalOptions,
        successMessage,
        errorMessage,
        errorMessageModal,
        handleHospitalSelect,
        handleDateChange,
        handleChange,
        handleHospitalChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        togglePatientModal,
        handleDeletePatient,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    } = usePatients();

    return (
        <>
            <Alert color="success" isOpen={!!successMessage} toggle={() => setSuccessMessage('')}>
                {successMessage}
            </Alert>
            <Alert color="danger" isOpen={!!errorMessage} toggle={() => setErrorMessage('')}>
                {errorMessage}
            </Alert>
            <Nav tabs>
                {hospitals.map((hospital, index) => (
                    <NavItem key={hospital.nrRegjistrimit}>
                        <NavLink
                            style={{ color: 'white' }}
                            className={classnames({ active: activeHospitalTab === `${index}` })}
                            onClick={() => handleHospitalSelect(hospital, `${index}`)}
                        >
                            {hospital.emri}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>
            <TabContent activeTab={activeHospitalTab}>
                <TabPane tabId={activeHospitalTab}>
                    <Row>
                        <Col xs="12">
                            {selectedHospital && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h4">Patients in {selectedHospital.emri}</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Table>
                                            <thead className="text-primary">
                                                <tr>
                                                    <th>Personal ID</th>
                                                    <th>Name</th>
                                                    <th>Surname</th>
                                                    <th>Birthday</th>
                                                    <th>Gender</th>
                                                    <th>Address</th>
                                                    <th>Phone Number</th>
                                                    <th>Email</th>
                                                    <th>Password</th>
                                                    <th>
                                                        <Button onClick={togglePatientModal}>Add Patient</Button>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {patients.map((patient) => (
                                                    <tr key={patient.nrPersonal}>
                                                        <td>{patient.nrPersonal}</td>
                                                        <td>
                                                            {editingPatientId === patient.nrPersonal ? (
                                                                <Input
                                                                    type="text"
                                                                    name="emri"
                                                                    value={editedPatient.emri}
                                                                    onChange={handleEditInputChange}
                                                                />
                                                            ) : (
                                                                patient.emri
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editingPatientId === patient.nrPersonal ? (
                                                                <Input
                                                                    type="text"
                                                                    name="mbiemri"
                                                                    value={editedPatient.mbiemri}
                                                                    onChange={handleEditInputChange}
                                                                />
                                                            ) : (
                                                                patient.mbiemri
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editingPatientId === patient.nrPersonal ? (
                                                                <Input
                                                                    type="text"
                                                                    name="datelindja"
                                                                    value={editedPatient.datelindja}
                                                                    onChange={handleEditInputChange}
                                                                />
                                                            ) : (
                                                                patient.datelindja
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editingPatientId === patient.nrPersonal ? (
                                                                <Input
                                                                    type="text"
                                                                    name="gjinia"
                                                                    value={editedPatient.gjinia}
                                                                    onChange={handleEditInputChange}
                                                                />
                                                            ) : (
                                                                patient.gjinia
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editingPatientId === patient.nrPersonal ? (
                                                                <Input
                                                                    type="text"
                                                                    name="adresa"
                                                                    value={editedPatient.adresa}
                                                                    onChange={handleEditInputChange}
                                                                />
                                                            ) : (
                                                                patient.adresa
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editingPatientId === patient.nrPersonal ? (
                                                                <Input
                                                                    type="text"
                                                                    name="nrTel"
                                                                    value={editedPatient.nrTel}
                                                                    onChange={handleEditInputChange}
                                                                />
                                                            ) : (
                                                                patient.nrTel
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editingPatientId === patient.nrPersonal ? (
                                                                <Input
                                                                    type="text"
                                                                    name="email"
                                                                    value={editedPatient.email}
                                                                    onChange={handleEditInputChange}
                                                                />
                                                            ) : (
                                                                patient.email
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editingPatientId === patient.nrPersonal ? (
                                                                <Input
                                                                    type="text"
                                                                    name="password"
                                                                    value={editedPatient.password}
                                                                    onChange={handleEditInputChange}
                                                                />
                                                            ) : (
                                                                <Input
                                                                    type="text"
                                                                    value="••••••••"
                                                                    readOnly
                                                                />
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editingPatientId === patient.nrPersonal ? (
                                                                <>
                                                                    <Button color="success" onClick={handleSave} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Save</Button>
                                                                    <Button color="secondary" onClick={handleCancelEdit} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px", fontSize: "small" }}>Cancel</Button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Button color="info" onClick={() => handleEdit(patient.nrPersonal)} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Edit</Button>
                                                                    <Button color="danger" onClick={() => handleDeletePatient(patient.nrPersonal)} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Delete</Button>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        <PatientModal
                                            isOpen={patientModal}
                                            toggle={togglePatientModal}
                                            newPatient={newPatient}
                                            handleDateChange={handleDateChange}
                                            handleChange={handleChange}
                                            handleSubmit={handleSubmit}
                                            handleHospitalChange={handleHospitalChange}
                                            errorMessageModal={errorMessageModal}
                                            setErrorMessageModal={setErrorMessageModal}
                                            hospitalOptions={hospitalOptions}
                                            selectedDate={selectedDate}
                                        />
                                    </CardBody>
                                </Card>
                            )}
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </>
    );
};

export default PatientList;