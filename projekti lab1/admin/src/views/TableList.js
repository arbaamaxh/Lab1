/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";

import { useTableList } from "./TableListHelp";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import "assets/css/ModalStyles.css"

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalHeader,
  ModalBody,
  // ModalFooter,
  Form,
  Input,
  FormGroup,
  Label,
  Alert,
  CustomInput,
} from "reactstrap";

import classnames from 'classnames';


function Tables(){
    const {
    hospitalOptions,
    selectedHospital,
    selectedDepartment,
    selectedRoom,
    selectedPatient,
    successMessage,
    errorMessage,
    errorMessageModal,
    setSuccessMessage,
    setErrorMessage,

    hospitals,
    newHospital,
    hospitalModal,
    editedHospital,
    editingHospitalId,
    toggleHospitalModal,
    handleChangeForHospitals,
    handleSubmitForHospitals,
    handleEditForHospitals,
    handleSaveForHospitals,
    handleEditInputChangeForHospitals,
    handleDeleteHospital,

    departmentsForDepartments,
    newDepartment,
    departmentModal,
    editedDepartment,
    editingDepartmentId,
    selectedHospitalForDepartments,
    activeHospitalTabForDepartments,
    toggleDepartmentModal,
    handleHospitalSelectForDepartments,
    handleChangeForDepartments,
    handleSubmitForDepartments,
    handleEditForDepartments,
    handleEditInputChangeForDepartments,
    handleSaveForDepartments,
    handleDeleteDepartment,

    doctorsForDoctors,
    newDoctor,
    doctorModal,
    specializations,
    editedDoctor,
    editingDoctorId,
    departmentsForDoctors,
    selectedHospitalForDoctors,
    selectedDepartmentForDoctors,
    activeHospitalTabForDoctors,
    activeDepartmentTabForDoctors,
    toggleDoctorModal,
    setNewDoctor,
    handleHospitalSelectForDoctors,
    handleDepartmentSelectForDoctors,
    handleChangeForDoctors,
    handleHospitalChangeForDoctors,
    handleDepartmentChangeForDoctors,
    handleSubmitForDoctors,
    handleEditForDoctors,
    handleEditInputChangeForDoctors,
    handleSaveForDoctors,
    handleDeleteDoctor,

    patientsForPatients,
    newPatient,
    patientModal,
    editedPatient,
    editingPatientId,
    selectedHospitalForPatients,
    activeHospitalTabForPatients,
    handleHospitalSelectForPatients,
    handleChangeForPatients,
    handleSubmitForPatients,
    handleEditForPatients,
    handleEditInputChangeForPatients,
    handleSaveForPatients,
    togglePatientModal,
    handleDeletePatient,

    staffForStaff,
    newStaff,
    staffModal,
    editedStaff,
    editingStaffId,
    departmentsForStaff,
    roomsForStaff,
    selectedHospitalForStaff,
    selectedDepartmentForStaff,
    activeHospitalTabForStaff,
    activeDepartmentTabForStaff,
    toggleStaffModal,
    handleHospitalSelectForStaff,
    handleDepartmentSelectForStaff,
    handleChangeForStaff,
    handleHospitalChangeForStaff,
    handleDepartmentChangeForStaff,
    handleRoomChangeForStaff,
    handleSubmitForStaff,
    handleEditForStaff,
    handleEditInputChangeForStaff,
    handleSaveForStaff,
    handleDeleteStaff,

    bills,
    patientsForBills,
    newBill,
    servicePrices,
    newService,
    billModal,
    editedBill,
    editingBillId,
    toggleBillModal,
    addService,
    setNewService,
    handleHospitalChangeForBills,
    handlePatientChangeForBills,
    handleChangeForBills,
    handleSubmitForBills,
    handleEditForBills,
    handleEditInputChangeForBills,
    handleSaveForBills,
    handleDeleteBill,

    appointments,
    appointmentModal,
    selectedDoctor,
    editedAppointment,
    editingAppointmentId,
    departmentsForAppointments,
    patientsForAppointments,
    doctorsForAppointments,
    selectedDate,
    selectedDateForInsert,
    selectedTime,
    availableTimeSlots,
    selectedDepartmentForAppointments,
    selectedHospitalForAppointments,
    activeHospitalTabForAppointments,
    activeDepartmentTabForAppointments,
    toggleAppointmentModal,
    handleTimeChange,
    handleDateChange,
    handleHospitalSelectForAppointments,
    handleDepartmentSelectForAppointments,
    handleHospitalChangeForAppointments,
    handleDepartmentChangeForAppointments,
    handlePatientChangeForAppointments,
    handleDoctorChangeForAppointments,
    handleDateToInsert,
    handleSubmitForAppointments,
    handleEditForAppointments,
    handleEditInputChangeForAppointments,
    handleSaveForAppointments,
    handleDeleteAppointment,

    rooms,
    handleDeleteRoom,

    prescriptions,
    doctorsForPrescriptions,
    selectedDoctorForPrescriptions,
    activeDoctorTabForPrescriptions,
    handleDoctorSelectForPrescriptions ,
    handleDeletePrescription,
  } = useTableList();

  
  return(
    <>
      <div className="content">
        <Alert color="success" isOpen={!!successMessage} toggle={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
        <Alert color="danger" isOpen={!!errorMessage} toggle={() => setErrorMessage('')}>
          {errorMessage}
        </Alert>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Hospitals</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter">
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Registration Number</th>
                      <th>Address</th>
                      <th>Phone Number</th>
                      <th></th>
                      <th>
                        <Button onClick={toggleHospitalModal}>Add Hospital</Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {hospitals.map(hospital => (
                      <tr key={hospital.nrRegjistrimit}>
                      <td>
                        {editingHospitalId === hospital.nrRegjistrimit ? (
                          <Input
                            type="text"
                            name="emri"
                            value={editedHospital.emri}
                            onChange={handleEditInputChangeForHospitals}
                          />
                        ) : (
                          hospital.emri
                        )}
                      </td>
                      <td>{hospital.nrRegjistrimit}</td>
                      <td>
                        {editingHospitalId === hospital.nrRegjistrimit ? (
                          <Input
                            type="text"
                            name="adresa"
                            value={editedHospital.adresa}
                            onChange={handleEditInputChangeForHospitals}
                          />
                        ) : (
                          hospital.adresa
                        )}
                      </td>
                      <td>
                        {editingHospitalId === hospital.nrRegjistrimit ? (
                          <Input
                            type="text"
                            name="nrTel"
                            value={editedHospital.nrTel}
                            onChange={handleEditInputChangeForHospitals}
                          />
                        ) : (
                          hospital.nrTel
                        )}
                      </td>
                      <td>
                        {editingHospitalId === hospital.nrRegjistrimit ? (
                          <Button color="success" onClick={handleSaveForHospitals}>Save</Button>
                        ) : (
                          <Button color="info" onClick={() => handleEditForHospitals(hospital.nrRegjistrimit)}>Edit</Button>
                        )}
                      </td>
                        <td>
                          <Button color="danger" onClick={() => handleDeleteHospital(hospital.nrRegjistrimit)}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Modal isOpen={hospitalModal} toggle={toggleHospitalModal} className="Modal">
                  <ModalHeader toggle={toggleHospitalModal} className="ModalHeader">Add Hospital</ModalHeader>
                  <ModalBody className="ModalBody">
                    <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessage('')}>
                      {errorMessageModal}
                    </Alert>
                    <Form onSubmit={handleSubmitForHospitals}>
                      <FormGroup>
                        <Label for="emri">Name</Label>
                        <Input type="text" name="emri" id="emri" placeholder="Name" value={newHospital.emri} onChange={handleChangeForHospitals} required />
                      </FormGroup>
                      <FormGroup>
                        <Label for="adresa">Address</Label>
                        <Input type="text" name="adresa" id="adresa" placeholder="Address" value={newHospital.adresa} onChange={handleChangeForHospitals} required />
                      </FormGroup>
                      <FormGroup>
                        <Label for="nrTel">Phone Number</Label>
                        <Input type="text" name="nrTel" id="nrTel" placeholder="Phone Number" value={newHospital.nrTel} onChange={handleChangeForHospitals} required pattern="^\d{5,15}$" title="Phone Number should have between 5-15 numbers."/>
                      </FormGroup>
                      <div className="text-center">
                        <Button color="primary" type="submit">Add Hospital</Button>
                      </div>
                    </Form>
                  </ModalBody>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Nav tabs>
          {hospitals.map((hospital, index) => (
            <NavItem key={hospital.nrRegjistrimit}>
              <NavLink
                style={{ color: 'white' }}
                className={classnames({ active: activeHospitalTabForDepartments === `${index}` })}
                onClick={() => handleHospitalSelectForDepartments(hospital, `${index}`)}
              >
                {hospital.emri}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeHospitalTabForDepartments}>
          <TabPane tabId={activeHospitalTabForDepartments}>
            <Row>
              <Col xs="12">
                {selectedHospitalForDepartments && (
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h4">Departments in {selectedHospitalForDepartments.emri}</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Table>
                        <thead className="text-primary">
                          <tr>
                            <th>Department ID</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Phone Number</th>
                            <th></th>
                            <th>
                              <Button onClick={toggleDepartmentModal}>Add Department</Button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {departmentsForDepartments.map((department) => (
                            <tr key={department.departmentID}>
                              <td>{department.departmentID}</td>
                              <td>
                                {editingDepartmentId === department.departmentID ? (
                                  <Input
                                    type="text"
                                    name="emri"
                                    value={editedDepartment.emri}
                                    onChange={handleEditInputChangeForDepartments}
                                  />
                                ) : (
                                  department.emri
                                )}
                              </td>
                              <td>
                                {editingDepartmentId === department.departmentID ? (
                                  <Input
                                    type="text"
                                    name="lokacioni"
                                    value={editedDepartment.lokacioni}
                                    onChange={handleEditInputChangeForDepartments}
                                  />
                                ) : (
                                  department.lokacioni
                                )}
                              </td>
                              <td>
                                {editingDepartmentId === department.departmentID ? (
                                  <Input
                                    type="text"
                                    name="nrTel"
                                    value={editedDepartment.nrTel}
                                    onChange={handleEditInputChangeForDepartments}
                                  />
                                ) : (
                                  department.nrTel
                                )}
                              </td>
                              <td>
                                {editingDepartmentId === department.departmentID ? (
                                  <Button color="success" onClick={handleSaveForDepartments}>Save</Button>
                                ) : (
                                  <Button color="info" onClick={() => handleEditForDepartments(department.departmentID)}>Edit</Button>
                                )}
                              </td>
                              <td>
                                <Button color="danger" onClick={() => handleDeleteDepartment(department.departmentID)}>Delete</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <Modal isOpen={departmentModal} toggle={toggleDepartmentModal} className="Modal">
                        <ModalHeader toggle={toggleDepartmentModal} className="ModalHeader">Add Department</ModalHeader>
                        <ModalBody className="ModalBody">
                          <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessage('')}>
                            {errorMessageModal}
                          </Alert>
                         <Form onSubmit={handleSubmitForDepartments}>
                            <FormGroup>
                              <Label for="emri">Name</Label>
                              <Input type="text" name="emri" id="emri" placeholder="Name" value={newDepartment.emri} onChange={handleChangeForDepartments} required />
                            </FormGroup>
                            <FormGroup>
                              <Label for="lokacioni">Location</Label>
                              <Input type="text" name="lokacioni" id="lokacioni" placeholder="Location" value={newDepartment.lokacioni} onChange={handleChangeForDepartments} required />
                            </FormGroup>
                            <FormGroup>
                              <Label for="nrTel">Phone Number</Label>
                              <Input type="text" name="nrTel" id="nrTel" placeholder="Phone Number" value={newDepartment.nrTel} onChange={handleChangeForDepartments} required pattern="^\d{5,15}$" title="Phone Number should have between 5-15 numbers." />
                            </FormGroup>
                            <FormGroup>
                              <Label for="hospitalName">Hospital</Label>
                              <Select
                                options={hospitalOptions}
                                classNamePrefix="custom-select"
                                placeholder="Select Hospital"
                                value={hospitalOptions.find(option => option.value === newDepartment.hospitalName)}
                                onChange={(selectedOption) => handleChangeForDepartments({ target: { name: 'hospitalName', value: selectedOption.value } })}
                                required
                              />
                            </FormGroup>
                            <div className="text-center">
                              <Button color="primary" type="submit">Add Department</Button>
                            </div>
                          </Form>
                        </ModalBody>
                      </Modal>
                    </CardBody>
                  </Card>
                )}
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        <Nav tabs>
          {hospitals.map((hospital, index) => (
            <NavItem key={hospital.nrRegjistrimit}>
              <NavLink
                style={{ color: 'white' }}
                className={classnames({ active: activeHospitalTabForDoctors === `${index}` })}
                onClick={() => handleHospitalSelectForDoctors(hospital, `${index}`)}
              >
                {hospital.emri}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeHospitalTabForDoctors}>
          <TabPane tabId={activeHospitalTabForDoctors}>
            <Nav tabs>
              {departmentsForDoctors.map((department, index) => (
                <NavItem key={department.departmentID}>
                  <NavLink
                    style={{ color: 'white' }}
                    className={classnames({ active: activeDepartmentTabForDoctors === `${index}` })}
                    onClick={() => handleDepartmentSelectForDoctors(department, `${index}`)}
                  >
                    {department.emri}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <TabContent activeTab={activeDepartmentTabForDoctors}>
              <TabPane tabId={activeDepartmentTabForDoctors}>
                <Row>
                  <Col xs="12">
                    {selectedHospitalForDoctors && selectedDepartmentForDoctors && (
                      <Card>
                        <CardHeader>
                          <CardTitle tag="h4">Doctors in {selectedDepartmentForDoctors.emri}</CardTitle>
                        </CardHeader>
                        <CardBody>
                          <Table>
                            <thead className="text-primary">
                              <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Personal ID</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Specialization</th>
                                <th>
                                  <Button onClick={toggleDoctorModal}>Add Doctor</Button>
                               </th>
                              </tr>
                            </thead>
                            <tbody>
                              {doctorsForDoctors.map(doctor => (
                                <tr key={doctor.nrRegjistrimit}>
                                  <td>
                                    {editingDoctorId === doctor.nrPersonal ? (
                                      <Input
                                        type="text"
                                        name="emri"
                                        value={editedDoctor.emri}
                                        onChange={handleEditInputChangeForDoctors}
                                      />
                                    ) : (
                                      doctor.emri
                                    )}
                                  </td>
                                  <td>
                                    {editingDoctorId === doctor.nrPersonal ? (
                                      <Input
                                        type="text"
                                        name="mbiemri"
                                        value={editedDoctor.mbiemri}
                                        onChange={handleEditInputChangeForDoctors}
                                      />
                                    ) : (
                                      doctor.mbiemri
                                    )}
                                  </td>
                                  <td>{doctor.nrPersonal}</td>
                                  <td>
                                    {editingDoctorId === doctor.nrPersonal ? (
                                      <Input
                                        type="text"
                                        name="adresa"
                                        value={editedDoctor.adresa}
                                        onChange={handleEditInputChangeForDoctors}
                                      />
                                    ) : (
                                      doctor.adresa
                                    )}
                                  </td>
                                  <td>
                                    {editingDoctorId === doctor.nrPersonal ? (
                                      <Input
                                        type="text"
                                        name="nrTel"
                                        value={editedDoctor.nrTel}
                                        onChange={handleEditInputChangeForDoctors}
                                      />
                                    ) : (
                                      doctor.nrTel
                                    )}
                                  </td>
                                  <td>
                                    {editingDoctorId === doctor.nrPersonal ? (
                                      <Input
                                        type="text"
                                        name="specializimi"
                                        value={editedDoctor.specializimi}
                                        onChange={handleEditInputChangeForDoctors}
                                      />
                                    ) : (
                                      doctor.specializimi
                                    )}
                                  </td>
                                  <td>
                                    {editingDoctorId === doctor.nrPersonal ? (
                                      <Button color="success" onClick={handleSaveForDoctors} style={{marginBottom:"10px", width:"130px", marginLeft:"10px"}}>Save</Button>
                                    ) : (
                                      <Button color="info" onClick={() => handleEditForDoctors(doctor.nrPersonal)} style={{marginBottom:"10px", width:"130px", marginLeft:"10px"}}>Edit</Button>
                                    )}
                                    <Button color="danger" onClick={() => handleDeleteDoctor(doctor.nrPersonal)} style={{marginBottom:"10px", width:"130px", marginLeft:"10px"}}>Delete</Button>
                                  </td>
                                </tr>
                                ))}
                            </tbody>
                          </Table>
                          <Modal isOpen={doctorModal} toggle={toggleDoctorModal} className="Modal">
                            <ModalHeader toggle={toggleDoctorModal} className="ModalHeader">Add Doctor</ModalHeader>
                            <ModalBody className="ModalBody">
                              <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessage('')}>
                                {errorMessageModal}
                              </Alert>
                              <Form onSubmit={handleSubmitForDoctors}>
                                <Row>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="emri">Name</Label>
                                      <Input type="text" name="emri" id="emri" placeholder="Name" value={newDoctor.emri} onChange={handleChangeForDoctors} required pattern="^[A-Z][a-zA-Z\s]*$" title="Name must start with capital letter"/>
                                    </FormGroup>
                                  </Col>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="mbiemri">Surname</Label>
                                      <Input type="text" name="mbiemri" id="mbiemri" placeholder="Surname" value={newDoctor.mbiemri} onChange={handleChangeForDoctors} required pattern="^[A-Z][a-zA-Z\s]*$" title="Surname must start with capital letter"/>
                                    </FormGroup>
                                  </Col>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="nrPersonal">Personal ID</Label>
                                      <Input type="text" name="nrPersonal" id="nrPersonal" placeholder="Personal ID" value={newDoctor.nrPersonal} onChange={handleChangeForDoctors} required pattern="^\d{10}$" title="Personal ID should have exactly 10 numbers" />
                                    </FormGroup>
                                  </Col>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="adresa">Address</Label>
                                      <Input type="text" name="adresa" id="adresa" placeholder="Address" value={newDoctor.adresa} onChange={handleChangeForDoctors} required />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="nrTel">Phone Number</Label>
                                      <Input type="text" name="nrTel" id="nrTel" placeholder="Phone Number" value={newDoctor.nrTel} onChange={handleChangeForDoctors} required pattern="^\d{5,15}$" title="Phone Number should have between 5-15 numbers." />
                                    </FormGroup>
                                  </Col>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="hospital">Hospital</Label>
                                      <Select
                                        options={hospitals.map(h => ({ value: h.nrRegjistrimit, label: h.emri }))}
                                        classNamePrefix="custom-select"
                                        placeholder="Select Hospital"
                                        value={selectedHospital}
                                        onChange={handleHospitalChangeForDoctors}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="department">Department</Label>
                                      <Select
                                        options={departmentsForDoctors.map(d => ({ value: d.departmentID, label: d.emri }))}
                                        classNamePrefix="custom-select"
                                        placeholder="Select Department"
                                        value={selectedDepartment ? { value: selectedDepartment.departmentID, label: selectedDepartment.emri } : null}
                                        onChange={handleDepartmentChangeForDoctors}
                                        isDisabled={!selectedHospital}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="specializimi">Specialization</Label>
                                      <Select
                                        options={specializations.map(spec => ({ value: spec, label: spec }))}
                                        classNamePrefix="custom-select"
                                        placeholder="Select Specialization"
                                        value={newDoctor.specializimi ? { value: newDoctor.specializimi, label: newDoctor.specializimi } : null}
                                        onChange={(selectedOption) => setNewDoctor({ ...newDoctor, specializimi: selectedOption.value })}
                                        isDisabled={!selectedDepartment}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <div className="text-center">
                                  <Button color="primary" type="submit">Add Doctor</Button>
                                </div>
                              </Form>
                            </ModalBody>
                          </Modal>
                        </CardBody>
                      </Card>
                    )}
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </TabPane>
        </TabContent>
        <Nav tabs>
          {hospitals.map((hospital, index) => (
            <NavItem key={hospital.nrRegjistrimit}>
              <NavLink
                style={{ color: 'white' }}
                className={classnames({ active: activeHospitalTabForPatients === `${index}` })}
                onClick={() => handleHospitalSelectForPatients(hospital, `${index}`)}
              >
                {hospital.emri}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeHospitalTabForPatients}>
          <TabPane tabId={activeHospitalTabForPatients}>
            <Row>
              <Col xs="12">
                {selectedHospitalForPatients && (
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h4">Patients in {selectedHospitalForPatients.emri}</CardTitle>
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
                            <th>
                              <Button onClick={togglePatientModal}>Add Patient</Button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {patientsForPatients.map((patient) => (
                            <tr key={patient.nrPersonal}>
                              <td>{patient.nrPersonal}</td>
                              <td>
                                {editingPatientId === patient.nrPersonal ? (
                                  <Input
                                    type="text"
                                    name="emri"
                                    value={editedPatient.emri}
                                    onChange={handleEditInputChangeForPatients}
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
                                    onChange={handleEditInputChangeForPatients}
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
                                    onChange={handleEditInputChangeForPatients}
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
                                    onChange={handleEditInputChangeForPatients}
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
                                    onChange={handleEditInputChangeForPatients}
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
                                    onChange={handleEditInputChangeForPatients}
                                  />
                                ) : (
                                  patient.nrTel
                                )}
                              </td>
                              <td>
                                {editingPatientId === patient.nrPersonal ? (
                                  <Button color="success" onClick={handleSaveForPatients} style={{marginBottom:"10px", width:"100px", marginLeft:"10px"}}>Save</Button>
                                ) : (
                                  <Button color="info" onClick={() => handleEditForPatients(patient.nrPersonal)} style={{marginBottom:"10px", width:"130px", marginLeft:"10px"}}>Edit</Button>
                                )}
                                <Button color="danger" onClick={() => handleDeletePatient(patient.nrPersonal)} style={{marginBottom:"10px", width:"130px", marginLeft:"10px", fontSize:"smaller"}}>Delete</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <Modal isOpen={patientModal} toggle={togglePatientModal} className="Modal">
                        <ModalHeader toggle={togglePatientModal} className="ModalHeader">Add Patient</ModalHeader>
                        <ModalBody className="ModalBody">
                          <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessage('')}>
                            {errorMessageModal}
                          </Alert>
                          <Form onSubmit={handleSubmitForPatients}>
                            <Row>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="emri">Name</Label>
                                  <Input type="text" name="emri" id="emri" placeholder="Name" value={newPatient.emri} onChange={handleChangeForPatients} required />
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="mbiemri">Surname</Label>
                                  <Input type="text" name="mbiemri" id="mbiemri" placeholder="Surname" value={newPatient.mbiemri} onChange={handleChangeForPatients} required />
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="nrPersonal">Personal ID</Label>
                                  <Input type="text" name="nrPersonal" id="nrPersonal" placeholder="Personal ID" value={newPatient.nrPersonal} onChange={handleChangeForPatients} required />
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="datelindja">Birthday</Label>
                                  <Input type="text" name="datelindja" id="datelindja" placeholder="Birthday" value={newPatient.datelindja} onChange={handleChangeForPatients} required />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="gjinia">Gender</Label>
                                  <div>
                                    <CustomInput
                                      type="radio"
                                      id="genderMale"
                                      name="gjinia"
                                      label="Male"
                                      value="Male"
                                      checked={newPatient.gjinia === 'Male'}
                                      onChange={handleChangeForPatients}
                                      required
                                    />
                                    <CustomInput
                                      type="radio"
                                      id="genderFemale"
                                      name="gjinia"
                                      label="Female"
                                      value="Female"
                                      checked={newPatient.gjinia === 'Female'}
                                      onChange={handleChangeForPatients}
                                      required
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="adresa">Address</Label>
                                  <Input type="text" name="adresa" id="adresa" placeholder="Address" value={newPatient.adresa} onChange={handleChangeForPatients} required />
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="nrTel">Phone Number</Label>
                                  <Input type="text" name="nrTel" id="nrTel" placeholder="Phone Number" value={newPatient.nrTel} onChange={handleChangeForPatients} required />
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="hospitalName">Hospital</Label>
                                  <Select
                                    options={hospitalOptions}
                                    classNamePrefix="custom-select"
                                    placeholder="Select Hospital"
                                    value={hospitalOptions.find(option => option.value === newPatient.hospitalName)}
                                    onChange={(selectedOption) => handleChangeForPatients({ target: { name: 'hospitalName', value: selectedOption.value } })}
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <div className="text-center">
                              <Button color="primary" type="submit">Add Patient</Button>
                            </div>
                          </Form>
                        </ModalBody>
                      </Modal>
                    </CardBody>
                  </Card>
                )}
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        <Nav tabs>
          {hospitals.map((hospital, index) => (
            <NavItem key={hospital.nrRegjistrimit}>
              <NavLink
                style={{ color: 'white' }}
                className={classnames({ active: activeHospitalTabForStaff === `${index}` })}
                onClick={() => handleHospitalSelectForStaff(hospital, `${index}`)}
              >
                {hospital.emri}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeHospitalTabForStaff}>
          <TabPane tabId={activeHospitalTabForStaff}>
            <Nav tabs>
              {departmentsForStaff.map((department, index) => (
                <NavItem key={department.departmentID}>
                  <NavLink
                    style={{ color: 'white' }}
                    className={classnames({ active: activeDepartmentTabForStaff === `${index}` })}
                    onClick={() => handleDepartmentSelectForStaff(department, `${index}`)}
                  >
                    {department.emri}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <TabContent activeTab={activeDepartmentTabForStaff}>
              <TabPane tabId={activeDepartmentTabForStaff}>
                <Row>
                  <Col xs="12">
                    {selectedHospitalForStaff && selectedDepartmentForStaff && (
                      <Card>
                        <CardHeader>
                          <CardTitle tag="h4">Staff in {selectedDepartmentForStaff.emri}</CardTitle>
                        </CardHeader>
                        <CardBody>
                          <Table>
                          <thead className="text-primary">
                            <tr>
                              <th>Personal ID</th>
                              <th>Name</th>
                              <th>Surname</th>
                              <th>Job Position</th>
                              <th>Address</th>
                              <th>Phone Number</th>
                              <th>
                                <Button onClick={toggleStaffModal}>Add Staff</Button>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {staffForStaff.map((staff) => (
                              <tr key={staff.nrPersonal}>
                                <td>{staff.nrPersonal}</td>
                                  <td>
                                    {editingStaffId === staff.nrPersonal ? (
                                      <Input
                                        type="text"
                                        name="emri"
                                        value={editedStaff.emri}
                                        onChange={handleEditInputChangeForStaff}
                                      />
                                    ) : (
                                      staff.emri
                                    )}
                                  </td>
                                  <td>
                                    {editingStaffId === staff.nrPersonal ? (
                                      <Input
                                        type="text"
                                        name="mbiemri"
                                        value={editedStaff.mbiemri}
                                        onChange={handleEditInputChangeForStaff}
                                      />
                                    ) : (
                                      staff.mbiemri
                                    )}
                                  </td>
                                  <td>
                                    {editingStaffId === staff.nrPersonal ? (
                                      <Input
                                        type="text"
                                        name="pozita"
                                        value={editedStaff.pozita}
                                        onChange={handleEditInputChangeForStaff}
                                      />
                                    ) : (
                                      staff.pozita
                                    )}
                                  </td>
                                  <td>
                                    {editingStaffId === staff.nrPersonal ? (
                                      <Input
                                        type="text"
                                        name="adresa"
                                        value={editedStaff.adresa}
                                        onChange={handleEditInputChangeForStaff}
                                      />
                                    ) : (
                                      staff.adresa
                                    )}
                                  </td>
                                  <td>
                                    {editingStaffId === staff.nrPersonal ? (
                                      <Input
                                        type="text"
                                        name="nrTel"
                                        value={editedStaff.nrTel}
                                        onChange={handleEditInputChangeForStaff}
                                      />
                                    ) : (
                                      staff.nrTel
                                    )}
                                  </td>
                                  <td>
                                    {editingStaffId === staff.nrPersonal ? (
                                      <Button color="success" onClick={handleSaveForStaff} style={{marginBottom:"10px", width:"130px", marginLeft:"10px"}}>Save</Button>
                                    ) : (
                                      <Button color="info" onClick={() => handleEditForStaff(staff.nrPersonal)} style={{marginBottom:"10px", width:"130px", marginLeft:"10px"}}>Edit</Button>
                                    )}
                                    <Button color="danger" onClick={() => handleDeleteStaff(staff.nrPersonal)} style={{marginBottom:"10px", width:"130px", marginLeft:"10px"}}>Delete</Button>
                                  </td>
                                </tr>
                                ))}
                            </tbody>
                          </Table>
                          <Modal isOpen={staffModal} toggle={toggleStaffModal} className="Modal">
                            <ModalHeader toggle={toggleStaffModal} className="ModalHeader">Add Staff</ModalHeader>
                            <ModalBody className="ModalBody">
                              <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessage('')}>
                                {errorMessageModal}
                              </Alert>
                              <Form onSubmit={handleSubmitForStaff}>
                                <FormGroup>
                                  <Label for="nrPersonal">Personal ID</Label>
                                  <Input type="text" name="nrPersonal" id="nrPersonal" placeholder="Personal ID" value={newStaff.nrPersonal} onChange={handleChangeForStaff} required pattern="^\d{10}$" title="Personal ID should have exactly 10 numbers" />
                                </FormGroup>
                                <Row>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="emri">Name</Label>
                                      <Input type="text" name="emri" id="emri" placeholder="Name" value={newStaff.emri} onChange={handleChangeForStaff} required pattern="^[A-Z][a-zA-Z\s]*$" title="Name must start with capital letter"/>
                                    </FormGroup>
                                  </Col>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="mbiemri">Surname</Label>
                                      <Input type="text" name="mbiemri" id="mbiemri" placeholder="Surname" value={newStaff.mbiemri} onChange={handleChangeForStaff} required pattern="^[A-Z][a-zA-Z\s]*$" title="Surname must start with capital letter"/>
                                    </FormGroup>
                                  </Col>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="pozita">Job Position</Label>
                                      <Input type="text" name="pozita" id="pozita" placeholder="Job Position" value={newStaff.pozita} onChange={handleChangeForStaff} required />
                                    </FormGroup>
                                  </Col>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="adresa">Address</Label>
                                      <Input type="text" name="adresa" id="adresa" placeholder="Address" value={newStaff.adresa} onChange={handleChangeForStaff} required />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="nrTel">Phone Number</Label>
                                      <Input type="text" name="nrTel" id="nrTel" placeholder="Phone Number" value={newStaff.nrTel} onChange={handleChangeForStaff} required pattern="^\d{5,15}$" title="Phone Number should have between 5-15 numbers." />
                                    </FormGroup>
                                  </Col>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="hospital">Hospital</Label>
                                      <Select
                                        options={hospitals.map(h => ({ value: h.nrRegjistrimit, label: h.emri }))}
                                        classNamePrefix="custom-select"
                                        placeholder="Select Hospital"
                                        value={selectedHospital}
                                        onChange={handleHospitalChangeForStaff}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="department">Department</Label>
                                      <Select
                                        options={departmentsForStaff.map(d => ({ value: d.departmentID, label: d.emri }))}
                                        classNamePrefix="custom-select"
                                        placeholder="Select Department"
                                        value={selectedDepartment}
                                        onChange={handleDepartmentChangeForStaff}
                                        isDisabled={!selectedHospital}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="dhoma">Room</Label>
                                      <Select
                                        options={roomsForStaff.map(r => ({ value: r.roomID, label: r.numri }))}
                                        classNamePrefix="custom-select"
                                        placeholder="Select Room"
                                        value={selectedRoom}
                                        onChange={handleRoomChangeForStaff}
                                        isDisabled={!selectedDepartment}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <div className="text-center">
                                  <Button color="primary" type="submit">Add Staff</Button>
                                </div>
                              </Form>
                            </ModalBody>
                          </Modal>
                        </CardBody>
                      </Card>
                    )}
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </TabPane>
        </TabContent>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">All Bills</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter">
                  <thead className="text-primary">
                    <tr>
                      <th>Bill ID</th>
                      <th>Services</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Patient Name</th>
                      <th>Hospital Name</th>
                      <th>
                        <Button onClick={toggleBillModal}>Add Bill</Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills.map(bill => (
                      <React.Fragment key={bill.billID}>
                        <tr key={bill.billID}>
                          <td>{bill.billID}</td>
                          <td>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                              {bill.sherbimi && bill.sherbimi.map((service, index) => (
                                <li key={index} style={{fontSize:"small"}}>{service.emri}:{service.cmimi}€</li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            {editingBillId === bill.billID ? (
                              <Input
                                type="text"
                                name="data"
                                value={editedBill.data}
                                onChange={handleEditInputChangeForBills}
                              />
                            ) : (
                              bill.data
                            )}
                          </td>
                          <td>{bill.totali}€</td>
                          <td>{bill.Patient.emri} {bill.Patient.mbiemri}</td>
                          <td>{bill.Hospital.emri}</td>
                          <td>
                            {editingBillId === bill.billID ? (
                              <Button color="success" onClick={handleSaveForBills}>Save</Button>
                            ) : (
                              <Button color="info" onClick={() => handleEditForBills(bill.billID)}>Edit</Button>
                            )}
                          </td>
                          <td>
                            <Button color="danger" onClick={() => handleDeleteBill(bill.billID)}>Delete</Button>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
                <Modal isOpen={billModal} toggle={toggleBillModal} className="Modal">
                  <ModalHeader toggle={toggleBillModal} className="ModalHeader">Add Bill</ModalHeader>
                  <ModalBody className="ModalBody">
                    <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessage('')}>
                      {errorMessageModal}
                    </Alert>
                    <Form onSubmit={handleSubmitForBills}>
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
                        <Input type="text" name="data" id="data" placeholder="Date" value={newBill.data} onChange={handleChangeForBills} required />
                      </FormGroup>
                      <FormGroup>
                        <Label for="totali">Total</Label>
                        <Input type="text" name="totali" id="totali" placeholder="Total" value={newBill.totali} onChange={handleChangeForBills} required />
                      </FormGroup>
                      <FormGroup>
                        <Label for="hospital">Hospital</Label>
                        <Select
                          options={hospitals.map(h => ({ value: h.nrRegjistrimit, label: h.emri }))}
                          classNamePrefix="custom-select"
                          placeholder="Select Hospital"
                          value={selectedHospital}
                          onChange={handleHospitalChangeForBills}
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="patientName">Patient</Label>
                        <Select
                          options={patientsForBills.map(patient => ({ value: patient.nrPersonal, label: `${patient.emri} ${patient.mbiemri}` }))}
                          classNamePrefix="custom-select"
                          placeholder="Select Patient"
                          value={selectedPatient ? { value: selectedPatient.nrPersonal, label: `${selectedPatient.emri} ${selectedPatient.mbiemri}` } : null}
                          onChange={handlePatientChangeForBills}
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
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Nav tabs>
          {hospitals.map((hospital, index) => (
            <NavItem key={hospital.nrRegjistrimit}>
              <NavLink
                style={{ color: 'white' }}
                className={classnames({ active: activeHospitalTabForAppointments === `${index}` })}
                onClick={() => handleHospitalSelectForAppointments(hospital, `${index}`)}
              >
                {hospital.emri}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeHospitalTabForAppointments}>
          <TabPane tabId={activeHospitalTabForAppointments}>
            <Nav tabs>
              {departmentsForAppointments.map((department, index) => (
                <NavItem key={department.departmentID}>
                  <NavLink
                    style={{ color: 'white' }}
                    className={classnames({ active: activeDepartmentTabForAppointments === `${index}` })}
                    onClick={() => handleDepartmentSelectForAppointments(department, `${index}`)}
                  >
                    {department.emri}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <TabContent activeTab={activeDepartmentTabForAppointments}>
              <TabPane tabId={activeDepartmentTabForAppointments}>
                <Row>
                  <Col xs="12">
                    {selectedHospitalForAppointments && selectedDepartmentForAppointments && (
                      <Card>
                        <CardHeader>
                          <CardTitle tag="h5">Select Date for Appointments</CardTitle>
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            className="form-control"
                          />
                        </CardHeader>
                        <CardBody>
                        <CardTitle tag="h4">Appointments On Selected Date</CardTitle>
                          <Table className="tablesorter">
                            <thead className="text-primary">
                              <tr>
                                <th>Appointment ID</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Patient Name</th>
                                <th>Doctor Name</th>
                                <th>
                                 <Button onClick={toggleAppointmentModal}>Add Appointment</Button>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {appointments.map((appointment) => (
                                <tr key={appointment.appointmentID}>
                                  <td>{appointment.appointmentID}</td>
                                  <td>
                                    {editingAppointmentId === appointment.appointmentID ? (
                                      <Input
                                        type="text"
                                        name="data"
                                        value={editedAppointment.data}
                                        onChange={handleEditInputChangeForAppointments}
                                      />
                                    ) : (
                                      appointment.data
                                    )}
                                  </td>
                                  <td>
                                    {editingAppointmentId === appointment.appointmentID ? (
                                      <Input
                                        type="text"
                                        name="ora"
                                        value={editedAppointment.ora}
                                        onChange={handleEditInputChangeForAppointments}
                                      />
                                    ) : (
                                      appointment.ora
                                    )}
                                  </td>
                                  <td>{appointment.Patient.emri} {appointment.Patient.mbiemri}</td>
                                  <td>{appointment.Doctor.emri} {appointment.Doctor.mbiemri}</td>
                                  <td>
                                    {editingAppointmentId === appointment.appointmentID ? (
                                      <Button color="success" onClick={handleSaveForAppointments}>Save</Button>
                                    ) : (
                                      <Button color="info" onClick={() => handleEditForAppointments(appointment.appointmentID)}>Edit</Button>
                                    )}
                                  </td>
                                  <td>
                                    <Button color="danger" onClick={() => handleDeleteAppointment(appointment.appointmentID)} style={{marginLeft:"-60px"}}>Delete</Button>
                                  </td>
                                </tr>
                                ))}
                            </tbody>
                          </Table>
                          <Modal isOpen={appointmentModal} toggle={toggleAppointmentModal} className="Modal">
                            <ModalHeader toggle={toggleAppointmentModal} className="ModalHeader">Add Appointment</ModalHeader>
                            <ModalBody className="ModalBody">
                              <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessage('')}>
                                {errorMessageModal}
                              </Alert>
                              <Form onSubmit={handleSubmitForAppointments}>
                                <FormGroup>
                                  <Label for="hospital">Hospital</Label>
                                  <Select
                                    options={hospitals.map(h => ({ value: h.nrRegjistrimit, label: h.emri }))}
                                    classNamePrefix="custom-select"
                                    placeholder="Select Hospital"
                                    value={selectedHospital}
                                    onChange={handleHospitalChangeForAppointments}
                                    required
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="department">Department</Label>
                                  <Select
                                    options={departmentsForAppointments.map(d => ({ value: d.departmentID, label: d.emri }))}
                                    classNamePrefix="custom-select"
                                    placeholder="Select Department"
                                    value={selectedDepartment}
                                    onChange={handleDepartmentChangeForAppointments}
                                    isDisabled={!selectedHospital}
                                    required
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="doctorName">Doctor</Label>
                                  <Select
                                    options={doctorsForAppointments.map(doctor => ({ value: doctor.nrPersonal, label: `${doctor.emri} ${doctor.mbiemri}` }))}
                                    classNamePrefix="custom-select"
                                    placeholder="Select Doctor"
                                    value={selectedDoctor ? { value: selectedDoctor.nrPersonal, label: `${selectedDoctor.emri} ${selectedDoctor.mbiemri}` } : null}
                                    onChange={handleDoctorChangeForAppointments}
                                    isDisabled={!selectedDepartment}
                                    required
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="patientName">Patient</Label>
                                  <Select
                                    options={patientsForAppointments.map(patient => ({ value: patient.nrPersonal, label: `${patient.emri} ${patient.mbiemri}` }))}
                                    classNamePrefix="custom-select"
                                    placeholder="Select Patient"
                                    value={selectedPatient ? { value: selectedPatient.nrPersonal, label: `${selectedPatient.emri} ${selectedPatient.mbiemri}` } : null}
                                    onChange={handlePatientChangeForAppointments}
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
                        </CardBody>
                      </Card>
                    )}
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </TabPane>
        </TabContent>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Rooms</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter">
                  <thead className="text-primary">
                    <tr>
                      <th>Room ID</th>
                      <th>Room Number</th>
                      <th>Department</th>
                      <th>Hospital</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map(room => (
                      <tr key={room.roomID}>
                        <td>{room.roomID}</td>
                        <td>{room.numri}</td>
                        <td>{room.Department.emri}</td>
                        <td>{room.Department.Hospital.emri}</td>
                        <td>
                          <Button color="danger" onClick={() => handleDeleteRoom(room.roomID)}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Nav tabs>
          {doctorsForPrescriptions.map((doctor, index) => (
            <NavItem key={doctor.nrPersonal}>
              <NavLink
                style={{ color: 'white' }}
                className={classnames({ active: activeDoctorTabForPrescriptions === `${index}` })}
                onClick={() => handleDoctorSelectForPrescriptions(doctor, `${index}`)}
              >
                {doctor.emri} {doctor.mbiemri}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeDoctorTabForPrescriptions}>
          <TabPane tabId={activeDoctorTabForPrescriptions}>
            <Row>
              <Col xs="12">
                {selectedDoctorForPrescriptions && (
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h4">Prescriptions by {selectedDoctorForPrescriptions.emri} {selectedDoctorForPrescriptions.mbiemri}</CardTitle>
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
                          </tr>
                        </thead>
                        <tbody>
                          {prescriptions.map((prescription) => (
                            <tr key={prescription.prescriptionID}>
                              <td>{prescription.prescriptionID}</td>
                              <td>{prescription.diagnoza}</td>
                              <td>{prescription.ilace}</td>
                              <td>{prescription.udhezimi}</td>
                              <td>{prescription.data}</td>
                              <td>{prescription.Patient.emri} {prescription.Patient.mbiemri}</td>
                              <td>
                                <Button color="danger" onClick={() => handleDeletePrescription(prescription.prescriptionID)}>Delete</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                )}
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
}

export default Tables;