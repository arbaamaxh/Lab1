import React from 'react';
import {
    Table, Button, Input, Alert, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Card, CardBody, CardHeader, CardTitle
} from 'reactstrap';
import classnames from 'classnames';
import { useStaff } from '../../hooks/useStaff';
import StaffDrawer from './StaffDrawer';

const StaffList = () => {
    const {
        hospitals,
        staff,
        newStaff,
        staffModal,
        editedStaff,
        editingStaffId,
        departments,
        rooms,
        selectedDepartmentModal,
        selectedHospitalModal,
        selectedRoom,
        modalDepartments,
        selectedHospital,
        selectedDepartment,
        activeHospitalTab,
        activeDepartmentTab,
        successMessage,
        errorMessage,
        errorMessageModal,
        toggleStaffModal,
        setNewStaff,
        handleHospitalSelect,
        handleDepartmentSelect,
        handleChange,
        handleHospitalChange,
        handleDepartmentChange,
        handleRoomChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteStaff,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    } = useStaff();

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
                                                <CardTitle tag="h4">Staff in {selectedDepartment.emri}</CardTitle>
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
                                                        {staff.map((staff) => (
                                                            <tr key={staff.nrPersonal}>
                                                                <td>{staff.nrPersonal}</td>
                                                                <td>
                                                                    {editingStaffId === staff.nrPersonal ? (
                                                                        <Input
                                                                            type="text"
                                                                            name="emri"
                                                                            value={editedStaff.emri}
                                                                            onChange={handleEditInputChange}
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
                                                                            onChange={handleEditInputChange}
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
                                                                            onChange={handleEditInputChange}
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
                                                                            onChange={handleEditInputChange}
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
                                                                            onChange={handleEditInputChange}
                                                                        />
                                                                    ) : (
                                                                        staff.nrTel
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {editingStaffId === staff.nrPersonal ? (
                                                                        <>
                                                                            <Button color="success" onClick={handleSave} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Save</Button>
                                                                            <Button color="secondary" onClick={handleCancelEdit} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px", fontSize: "small" }}>Cancel</Button>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Button color="info" onClick={() => handleEdit(staff.nrPersonal)} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Edit</Button>
                                                                            <Button color="danger" onClick={() => handleDeleteStaff(staff.nrPersonal)} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Delete</Button>
                                                                        </>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                                <StaffDrawer
                                                    isOpen={staffModal}
                                                    toggle={toggleStaffModal}
                                                    newStaff={newStaff}
                                                    handleChange={handleChange}
                                                    handleSubmit={handleSubmit}
                                                    handleHospitalChange={handleHospitalChange}
                                                    handleDepartmentChange={handleDepartmentChange}
                                                    handleRoomChange={handleRoomChange}
                                                    errorMessageModal={errorMessageModal}
                                                    setErrorMessageModal={setErrorMessageModal}
                                                    hospitals={hospitals}
                                                    departments={modalDepartments}
                                                    rooms={rooms}
                                                    setNewStaff={setNewStaff}
                                                    selectedHospital={selectedHospitalModal}
                                                    selectedDepartment={selectedDepartmentModal}
                                                    selectedRoom={selectedRoom}
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

export default StaffList;