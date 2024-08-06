import React from 'react';
import {
    Table, Button, Input, Alert, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Card, CardBody, CardHeader, CardTitle
} from 'reactstrap';
import classnames from 'classnames';
import { useDepartments } from '../../hooks/useDepartments';
import DepartmentModal from './DepartmentModal';

const DepartmentList = () => {
    const {
        hospitals,
        departments,
        newDepartment,
        departmentModal,
        editedDepartment,
        editingDepartmentId,
        successMessage,
        errorMessage,
        errorMessageModal,
        hospitalOptions,
        activeHospitalTab,
        selectedHospital,
        toggleDepartmentModal,
        handleHospitalSelect,
        handleChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteDepartment,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
        handleHospitalChange
    } = useDepartments();

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
                                        <CardTitle tag="h4">Departments in {selectedHospital.emri}</CardTitle>
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
                                                {departments.map((department) => (
                                                    <tr key={department.departmentID}>
                                                        <td>{department.departmentID}</td>
                                                        <td>
                                                            {editingDepartmentId === department.departmentID ? (
                                                                <Input
                                                                    type="text"
                                                                    name="emri"
                                                                    value={editedDepartment.emri}
                                                                    onChange={handleEditInputChange}
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
                                                                    onChange={handleEditInputChange}
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
                                                                    onChange={handleEditInputChange}
                                                                />
                                                            ) : (
                                                                department.nrTel
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editingDepartmentId === department.departmentID ? (
                                                                <Button color="success" onClick={handleSave}>Save</Button>
                                                            ) : (
                                                                <Button color="info" onClick={() => handleEdit(department.departmentID)}>Edit</Button>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editingDepartmentId === department.departmentID ? (
                                                                <>
                                                                    <Button color="secondary" onClick={handleCancelEdit} style={{ marginRight: "10px", fontSize: "small" }}>Cancel</Button>
                                                                </>
                                                            ) : (
                                                                <Button color="danger" onClick={() => handleDeleteDepartment(department.departmentID)}>Delete</Button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        <DepartmentModal
                                            isOpen={departmentModal}
                                            toggle={toggleDepartmentModal}
                                            newDepartment={newDepartment}
                                            handleChange={handleChange}
                                            handleSubmit={handleSubmit}
                                            handleHospitalChange={handleHospitalChange}
                                            errorMessageModal={errorMessageModal}
                                            setErrorMessageModal={setErrorMessageModal}
                                            hospitalOptions={hospitalOptions}
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

export default DepartmentList;