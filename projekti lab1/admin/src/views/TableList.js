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
  Form,
  Input,
  FormGroup,
  Label,
} from "reactstrap";

import classnames from 'classnames';


function Tables(){
    const {
    successMessage,
    errorMessage,

    hospitals,
    newHospital,
    editedHospital,
    editingHospitalId,
    handleDeleteHospital,
    handleChangeForHospitals,
    handleSubmitForHospitals,
    handleEditForHospitals,
    handleSaveForHospitals,
    handleEditInputChangeForHospitals,

    departmentsForDepartments,
    newDepartment,
    editedDepartment,
    editingDepartmentId,
    selectedHospitalForDepartments,
    activeHospitalTabForDepartments,
    optionsForDepartments,
    handleHospitalSelectForDepartments,
    handleChangeForDepartments,
    handleSubmitForDepartments,
    handleEditForDepartments,
    handleEditInputChangeForDepartments,
    handleSaveForDepartments,
    handleDeleteDepartment,

    doctorsForDoctors,
    newDoctor,
    editedDoctor,
    editingDoctorId,
    departmentsForDoctors,
    selectedHospitalForDoctors,
    selectedDepartmentForDoctors,
    activeHospitalTabForDoctors,
    activeDepartmentTabForDoctors,
    // optionsForDoctors,
    // selectedDepartment,
    // selectedHospital,
    handleHospitalSelectForDoctors,
    handleDepartmentSelectForDoctors,
    handleChangeForDoctors,
    handleSubmitForDoctors,
    handleEditForDoctors,
    handleEditInputChangeForDoctors,
    handleSaveForDoctors,
    // handleHospitalChangeForDoctors,
    // handleDepartmentChangeForDoctors,
    handleDeleteDoctor,

    patientsForPatients,
    selectedHospitalForPatients,
    activeHospitalTabForPatients,
    handleHospitalSelectForPatients,
    handleDeletePatient,

    staffForStaff,
    departmentsForStaff,
    selectedHospitalForStaff,
    selectedDepartmentForStaff,
    activeHospitalTabForStaff,
    activeDepartmentTabForStaff,
    handleHospitalSelectForStaff,
    handleDepartmentSelectForStaff,
    handleDeleteStaff,

    bills,
    handleDeleteBill,

    appointments,
    departmentsForAppointments,
    selectedDate,
    selectedDepartmentForAppointments,
    selectedHospitalForAppointments,
    activeHospitalTabForAppointments,
    activeDepartmentTabForAppointments,
    handleDateChange,
    handleHospitalSelectForAppointments,
    handleDepartmentSelectForAppointments,
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
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
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
                      <th>Action</th>
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
                <Form onSubmit={handleSubmitForHospitals}>
                  <FormGroup>
                    <Label for="emri">Name</Label>
                    <Input type="text" name="emri" id="emri" value={newHospital.emri} onChange={handleChangeForHospitals} required />
                  </FormGroup>
                  <FormGroup>
                    <Label for="adresa">Address</Label>
                    <Input type="text" name="adresa" id="adresa" value={newHospital.adresa} onChange={handleChangeForHospitals} required />
                  </FormGroup>
                  <FormGroup>
                    <Label for="nrTel">Phone Number</Label>
                    <Input type="text" name="nrTel" id="nrTel" value={newHospital.nrTel} onChange={handleChangeForHospitals} required />
                  </FormGroup>
                  <div className="text-center">
                    <Button color="primary" type="submit">Add Hospital</Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Nav tabs>
          {hospitals.map((hospital, index) => (
            <NavItem key={hospital.nrRegjistrimit}>
              <NavLink
                style={{ color: 'white' }} // Change 'red' to the desired color
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
                      <Form onSubmit={handleSubmitForDepartments}>
                        <FormGroup>
                          <Label for="emri">Name</Label>
                          <Input type="text" name="emri" id="emri" value={newDepartment.emri} onChange={handleChangeForDepartments} required />
                        </FormGroup>
                        <FormGroup>
                          <Label for="lokacioni">Location</Label>
                          <Input type="text" name="lokacioni" id="lokacioni" value={newDepartment.lokacioni} onChange={handleChangeForDepartments} required />
                        </FormGroup>
                        <FormGroup>
                          <Label for="nrTel">Phone Number</Label>
                          <Input type="text" name="nrTel" id="nrTel" value={newDepartment.nrTel} onChange={handleChangeForDepartments} required />
                        </FormGroup>
                        <FormGroup>
                          <Label for="hospitalName">Hospital</Label>
                          <Select
                            options={optionsForDepartments}
                            classNamePrefix="custom-select"
                            placeholder="Select Hospital"
                            value={optionsForDepartments.find(option => option.value === newDepartment.hospitalName)}
                            onChange={(selectedOption) => handleChangeForDepartments({ target: { name: 'hospitalName', value: selectedOption.value } })}
                            required
                          />
                        </FormGroup>
                        <div className="text-center">
                          <Button color="primary" type="submit">Add Department</Button>
                        </div>
                      </Form>
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
                style={{ color: 'white' }} // Change 'red' to the desired color
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
                    style={{ color: 'white' }} // Change 'red' to the desired color
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
                                    <Button color="success" onClick={handleSaveForDoctors}>Save</Button>
                                  ) : (
                                    <Button color="info" onClick={() => handleEditForDoctors(doctor.nrPersonal)}>Edit</Button>
                                  )}
                                </td>
                                  <td>
                                    <Button color="danger" onClick={() => handleDeleteDoctor(doctor.nrPersonal)}>Delete</Button>
                                  </td>
                                </tr>
                                ))}
                            </tbody>
                          </Table>
                            <Form onSubmit={handleSubmitForDoctors}>
                              <FormGroup>
                                <Label for="emri">Name</Label>
                                <Input type="text" name="emri" id="emri" value={newDoctor.emri} onChange={handleChangeForDoctors} required />
                              </FormGroup>
                              <FormGroup>
                                <Label for="mbiemri">Surname</Label>
                                <Input type="text" name="mbiemri" id="mbiemri" value={newDoctor.mbiemri} onChange={handleChangeForDoctors} required />
                              </FormGroup>
                              <FormGroup>
                                <Label for="adresa">Address</Label>
                                <Input type="text" name="adresa" id="adresa" value={newDoctor.adresa} onChange={handleChangeForDoctors} required />
                              </FormGroup>
                              <FormGroup>
                                <Label for="nrTel">Phone Number</Label>
                                <Input type="text" name="nrTel" id="nrTel" value={newDoctor.nrTel} onChange={handleChangeForDoctors} required />
                              </FormGroup>
                              <FormGroup>
                                <Label for="specializimi">Specialization</Label>
                                <Input type="text" name="specializimi" id="specializimi" value={newDoctor.specializimi} onChange={handleChangeForDoctors} required />
                              </FormGroup>
                              {/* <FormGroup>
                                <Label for="hospital">Select Hospital</Label>
                                <Input 
                                  type="select" 
                                  name="hospital" 
                                  id="hospital" 
                                  value={selectedHospital || ''} 
                                  onChange={handleHospitalChangeForDoctors} 
                                  required 
                                >
                                  <option value="">Select Hospital</option>
                                  {hospitals.map(hospital => (
                                    <option key={hospital.nrRegjistrimit} value={hospital.nrRegjistrimit}>{hospital.emri}</option>
                                  ))}
                                </Input>
                              </FormGroup>
                              <FormGroup>
                                <Label for="department">Select Department</Label>
                                <Input 
                                  type="select" 
                                  name="department" 
                                  id="department" 
                                  value={selectedDepartment || ''} 
                                  onChange={handleDepartmentChangeForDoctors} 
                                  required 
                                  disabled={!selectedHospital}
                                >
                                  <option value="">Select Department</option>
                                  {departmentsForDoctors
                                    .filter(dep => dep.hospitalNrRegjistrimit === selectedHospital)
                                    .map(department => (
                                      <option key={department.departmentID} value={department.departmentID}>{department.emri}</option>
                                    ))}
                                </Input>
                              </FormGroup> */}
                              <div className="text-center">
                                <Button color="primary" type="submit">Add Doctor</Button>
                              </div>
                            </Form>
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
                style={{ color: 'white' }} // Change 'red' to the desired color
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
                          </tr>
                        </thead>
                        <tbody>
                          {patientsForPatients.map((patient) => (
                            <tr key={patient.nrPersonal}>
                              <td>{patient.nrPersonal}</td>
                              <td>{patient.emri}</td>
                              <td>{patient.mbiemri}</td>
                              <td>{patient.datelindja}</td>
                              <td>{patient.gjinia}</td>
                              <td>{patient.adresa}</td>
                              <td>{patient.nrTel}</td>
                              <td>
                                <Button color="danger" onClick={() => handleDeletePatient(patient.nrPersonal)}>Delete</Button>
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
        <Nav tabs>
          {hospitals.map((hospital, index) => (
            <NavItem key={hospital.nrRegjistrimit}>
              <NavLink
                style={{ color: 'white' }} // Change 'red' to the desired color
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
                    style={{ color: 'white' }} // Change 'red' to the desired color
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
                            </tr>
                          </thead>
                          <tbody>
                            {staffForStaff.map((staff) => (
                              <tr key={staff.nrPersonal}>
                                <td>{staff.nrPersonal}</td>
                                <td>{staff.emri}</td>
                                <td>{staff.mbiemri}</td>
                                <td>{staff.pozita}</td>
                                <td>{staff.adresa}</td>
                                <td>{staff.nrTel}</td>
                                <td>
                                  <Button color="danger" onClick={() => handleDeleteStaff(staff.nrPersonal)}>Delete</Button>
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
                      <th>Date</th>
                      <th>Total</th>
                      <th>Patient Name</th>
                      <th>Hospital Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills.map(bill => (
                      <tr key={bill.billID}>
                        <td>{bill.billID}</td>
                        <td>{bill.data}</td>
                        <td>{bill.totali}</td>
                        <td>{bill.Patient.emri} {bill.Patient.mbiemri}</td>
                        <td>{bill.Hospital.emri}</td>
                        <td>
                          <Button color="danger" onClick={() => handleDeleteBill(bill.billID)}>Delete</Button>
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
          {hospitals.map((hospital, index) => (
            <NavItem key={hospital.nrRegjistrimit}>
              <NavLink
                style={{ color: 'white' }} // Change 'red' to the desired color
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
                    style={{ color: 'white' }} // Change 'red' to the desired color
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
                                <th>Room</th>
                              </tr>
                            </thead>
                            <tbody>
                              {appointments.map((appointment) => (
                                <tr key={appointment.appointmentID}>
                                  <td>{appointment.appointmentID}</td>
                                  <td>{appointment.data}</td>
                                  <td>{appointment.ora.split(':').slice(0, 2).join(':')}</td>
                                  <td>{appointment.Patient.emri} {appointment.Patient.mbiemri}</td>
                                  <td>{appointment.Doctor.emri} {appointment.Doctor.mbiemri}</td>
                                  <td>{appointment.Room.numri}</td>
                                  <td>
                                    <Button color="danger" onClick={() => handleDeleteAppointment(appointment.appointmentID)}>Delete</Button>
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
                style={{ color: 'white' }} // Change 'red' to the desired color
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