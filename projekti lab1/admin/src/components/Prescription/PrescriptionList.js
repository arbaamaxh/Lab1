import React from 'react';
import {
  Table, Button, Alert, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Card, CardBody, CardHeader, CardTitle, Input
} from 'reactstrap';
import classnames from 'classnames';
import { usePrescriptions } from '../../hooks/usePrescriptions';
import PrescriptionModal from './PrescriptionModal';

const PrescriptionList = () => {
  const {
    successMessage,
    errorMessage,
    errorMessageModal,
    newPrescription,
    prescriptions,
    doctors,
    editingPrescriptionId,
    editedPrescription,
    selectedDoctor,
    activeDoctorTab,
    prescriptionModal,
    hospitals,
    departments,
    patients,
    doctorsModal,
    selectedDepartmentModal,
    selectedHospitalModal,
    selectedDoctorModal,
    selectedPatientModal,
    togglePrescriptionModal,
    handleDoctorSelect,
    handleDeletePrescription,
    handleHospitalChange,
    handleDepartmentChange,
    handlePatientChange,
    handleDoctorChange,
    handleChange,
    handleSubmit,
    handleEdit,
    handleEditInputChange,
    handleCancelEdit,
    handleSave,
    setSuccessMessage,
    setErrorMessage,
    setErrorMessageModal,
  } = usePrescriptions();

  return (
    <>
      <Alert color="success" isOpen={!!successMessage} toggle={() => setSuccessMessage('')}>
        {successMessage}
      </Alert>
      <Alert color="danger" isOpen={!!errorMessage} toggle={() => setErrorMessage('')}>
        {errorMessage}
      </Alert>
      <Nav tabs>
        {doctors.map((doctor, index) => (
          <NavItem key={doctor.nrPersonal}>
            <NavLink
              style={{ color: 'white' }}
              className={classnames({ active: activeDoctorTab === `${index}` })}
              onClick={() => handleDoctorSelect(doctor, `${index}`)}
            >
              {doctor.emri} {doctor.mbiemri}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeDoctorTab}>
        <TabPane tabId={activeDoctorTab}>
          <Row>
            <Col xs="12">
              {selectedDoctor && (
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Prescriptions by {selectedDoctor.emri} {selectedDoctor.mbiemri}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table>
                      <thead className="text-primary">
                        <tr>
                          <th>Prescription ID</th>
                          <th>Diagnosis</th>
                          <th>Medicine</th>
                          <th>Instruction</th>
                          <th>Data</th>
                          <th>Patient Name</th>
                          <th></th>
                          <th>
                            <Button onClick={togglePrescriptionModal}>Add Presciption</Button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {prescriptions.map((prescription) => (
                          <tr key={prescription.prescriptionID}>
                            <td>{prescription.prescriptionID}</td>
                            <td>
                              {editingPrescriptionId === prescription.prescriptionID ? (
                                <Input
                                  type="text"
                                  name="diagnoza"
                                  value={editedPrescription.diagnoza}
                                  onChange={handleEditInputChange}
                                />
                              ) : (
                                prescription.diagnoza
                              )}
                            </td>
                            <td>
                              {editingPrescriptionId === prescription.prescriptionID ? (
                                <Input
                                  type="text"
                                  name="ilace"
                                  value={editedPrescription.ilace}
                                  onChange={handleEditInputChange}
                                />
                              ) : (
                                prescription.ilace
                              )}
                            </td>
                            <td>
                              {editingPrescriptionId === prescription.prescriptionID ? (
                                <Input
                                  type="text"
                                  name="udhezimi"
                                  value={editedPrescription.udhezimi}
                                  onChange={handleEditInputChange}
                                />
                              ) : (
                                prescription.udhezimi
                              )}
                            </td>
                            <td>{prescription.data}</td>
                            <td>
                              {prescription.patient ? `${prescription.patient.emri} ${prescription.patient.mbiemri}` : 'Patient not found'}
                            </td>
                            <td>
                              {editingPrescriptionId === prescription.prescriptionID ? (
                                <Button color="success" onClick={handleSave}>Save</Button>
                              ) : (
                                <Button color="info" onClick={() => handleEdit(prescription.prescriptionID)}>Edit</Button>
                              )}
                            </td>
                            <td>
                              {editingPrescriptionId === prescription.prescriptionID ? (
                                <>
                                  <Button color="secondary" onClick={handleCancelEdit} style={{ marginRight: "10px", fontSize: "small" }}>Cancel</Button>
                                </>
                              ) : (
                                <Button color="danger" onClick={() => handleDeletePrescription(prescription.prescriptionID)}>Delete</Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <PrescriptionModal
                      isOpen={prescriptionModal}
                      toggle={togglePrescriptionModal}
                      newPrescription={newPrescription}
                      handleSubmit={handleSubmit}
                      handleHospitalChange={handleHospitalChange}
                      handleDepartmentChange={handleDepartmentChange}
                      handleDoctorChange={handleDoctorChange}
                      handlePatientChange={handlePatientChange}
                      handleChange={handleChange}
                      errorMessageModal={errorMessageModal}
                      setErrorMessageModal={setErrorMessageModal}
                      hospitals={hospitals}
                      departments={departments}
                      doctors={doctorsModal}
                      patients={patients}
                      selectedHospital={selectedHospitalModal}
                      selectedDepartment={selectedDepartmentModal}
                      selectedDoctor={selectedDoctorModal}
                      selectedPatient={selectedPatientModal}
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

export default PrescriptionList;