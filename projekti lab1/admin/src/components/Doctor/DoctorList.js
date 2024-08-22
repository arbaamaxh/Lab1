import React from 'react';
import {
    Table, Button, Input, Alert, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Card, CardBody, CardHeader, CardTitle
} from 'reactstrap';
import classnames from 'classnames';
import { useDoctors } from '../../hooks/useDoctors';
import DoctorModal from './DoctorModal';

const DoctorList = () => {
    const {
        hospitals,
        doctors,
        newDoctor,
        doctorModal,
        specializations,
        editedDoctor,
        editingDoctorId,
        departments,
        selectedHospital,
        selectedDepartment,
        selectedImageName,
        activeHospitalTab,
        activeDepartmentTab,
        successMessage,
        errorMessage,
        errorMessageModal,
        selectedHospitalModal,
        selectedDepartmentModal,
        modalDepartments,
        toggleDoctorModal,
        setNewDoctor,
        handleHospitalSelect,
        handleDepartmentSelect,
        handleChange,
        handleHospitalChange,
        handleDepartmentChange,
        handleFileChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleEditFileChange,
        handleCancelEdit,
        handleSave,
        handleDeleteDoctor,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    } = useDoctors();

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
                    <Nav tabs>
                        {departments.map((department, index) => (
                            <NavItem key={department.departmentID}>
                                <NavLink
                                    style={{ color: 'white' }}
                                    className={classnames({ active: activeDepartmentTab === `${index}` })}
                                    onClick={() => handleDepartmentSelect(department, `${index}`)}
                                >
                                    {department.emri}
                                </NavLink>
                            </NavItem>
                        ))}
                    </Nav>
                    <TabContent activeTab={activeDepartmentTab}>
                        <TabPane tabId={activeDepartmentTab}>
                            <Row>
                                <Col xs="12">
                                    {selectedHospital && selectedDepartment && (
                                        <Card>
                                            <CardHeader>
                                                <CardTitle tag="h4">Doctors in {selectedDepartment.emri}</CardTitle>
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
                                                            <th>Image</th>
                                                            <th>
                                                                <Button onClick={toggleDoctorModal}>Add Doctor</Button>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {doctors.map(doctor => (
                                                            <tr key={doctor.nrRegjistrimit}>
                                                                <td>
                                                                    {editingDoctorId === doctor.nrPersonal ? (
                                                                        <Input
                                                                            type="text"
                                                                            name="emri"
                                                                            value={editedDoctor.emri}
                                                                            onChange={handleEditInputChange}
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
                                                                            onChange={handleEditInputChange}
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
                                                                            onChange={handleEditInputChange}
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
                                                                            onChange={handleEditInputChange}
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
                                                                            onChange={handleEditInputChange}
                                                                        />
                                                                    ) : (
                                                                        doctor.specializimi
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {editingDoctorId === doctor.nrPersonal ? (
                                                                        <>
                                                                            <Input
                                                                                type="file"
                                                                                name="img"
                                                                                onChange={handleEditFileChange}
                                                                            />
                                                                            {doctor.imageUrl && (
                                                                                <img
                                                                                    src={`http://localhost:3001/${doctor.imageUrl}`}
                                                                                    alt={doctor.emri}
                                                                                    width="100"
                                                                                    style={{ marginTop: "10px" }}
                                                                                />
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <img
                                                                            src={`http://localhost:3001/${doctor.imageUrl}`}
                                                                            alt={doctor.emri}
                                                                            width="100"
                                                                        />
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {editingDoctorId === doctor.nrPersonal ? (
                                                                        <>
                                                                            <Button color="success" onClick={handleSave} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Save</Button>
                                                                            <Button color="secondary" onClick={handleCancelEdit} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px", fontSize: "small" }}>Cancel</Button>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Button color="info" onClick={() => handleEdit(doctor.nrPersonal)} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Edit</Button>
                                                                            <Button color="danger" onClick={() => handleDeleteDoctor(doctor.nrPersonal)} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Delete</Button>
                                                                        </>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                                <DoctorModal
                                                    isOpen={doctorModal}
                                                    toggle={toggleDoctorModal}
                                                    newDoctor={newDoctor}
                                                    handleChange={handleChange}
                                                    handleSubmit={handleSubmit}
                                                    handleHospitalChange={handleHospitalChange}
                                                    handleDepartmentChange={handleDepartmentChange}
                                                    handleFileChange={handleFileChange}
                                                    errorMessageModal={errorMessageModal}
                                                    setErrorMessageModal={setErrorMessageModal}
                                                    hospitals={hospitals}
                                                    departments={modalDepartments}
                                                    specializations={specializations}
                                                    setNewDoctor={setNewDoctor}
                                                    selectedHospital={selectedHospitalModal}
                                                    selectedDepartment={selectedDepartmentModal}
                                                    selectedImageName={selectedImageName}
                                                />
                                            </CardBody>
                                        </Card>
                                    )}
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </TabPane>
            </TabContent>
        </>
    );
};

export default DoctorList;