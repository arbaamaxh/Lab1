import React from 'react';
import {
    Table, Button, Input, Alert, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Card, CardBody, CardHeader, CardTitle
} from 'reactstrap';
import classnames from 'classnames';
import { useAdmins } from '../../hooks/useAdmins';
import AdminDrawer from './AdminDrawer';

const AdminList = () => {
    const {
        hospitals,
        admins,
        newAdmin,
        adminModal,
        editedAdmin,
        editingAdminId,
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
        toggleAdminModal,
        handleDeleteAdmin,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    } = useAdmins();

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
                                        <CardTitle tag="h4">Administrators in {selectedHospital.emri}</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Table>
                                            <thead className="text-primary">
                                                <tr>
                                                    <th>Personal ID</th>
                                                    <th>Name</th>
                                                    <th>Surname</th>
                                                    <th>Birthday</th>
                                                    <th>Address</th>
                                                    <th>Phone Number</th>
                                                    <th>Email</th>
                                                    <th>Password</th>
                                                    <th>
                                                        <Button onClick={toggleAdminModal}>Add Administrator</Button>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {admins.map((admin) => (
                                                    <tr key={admin.nrPersonal}>
                                                        <td>{admin.nrPersonal}</td>
                                                        <td>
                                                            {editingAdminId === admin.nrPersonal ? (
                                                                <Input
                                                                    type="text"
                                                                    name="emri"
                                                                    value={editedAdmin.emri}
                                                                    onChange={handleEditInputChange}
                                                                />
                                                            ) : (
                                                                admin.emri
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editingAdminId === admin.nrPersonal ? (
                                                                <Input
                                                                    type="text"
                                                                    name="mbiemri"
                                                                    value={editedAdmin.mbiemri}
                                                                    onChange={handleEditInputChange}
                                                                />
                                                            ) : (
                                                                admin.mbiemri
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editingAdminId === admin.nrPersonal ? (
                                                                <Input
                                                                    type="text"
                                                                    name="datelindja"
                                                                    value={editedAdmin.datelindja}
                                                                    onChange={handleEditInputChange}
                                                                />
                                                            ) : (
                                                                admin.datelindja
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editingAdminId === admin.nrPersonal ? (
                                                                <Input
                                                                    type="text"
                                                                    name="adresa"
                                                                    value={editedAdmin.adresa}
                                                                    onChange={handleEditInputChange}
                                                                />
                                                            ) : (
                                                                admin.adresa
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editingAdminId === admin.nrPersonal ? (
                                                                <Input
                                                                    type="text"
                                                                    name="nrTel"
                                                                    value={editedAdmin.nrTel}
                                                                    onChange={handleEditInputChange}
                                                                />
                                                            ) : (
                                                                admin.nrTel
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editingAdminId === admin.nrPersonal ? (
                                                                <Input
                                                                    type="text"
                                                                    name="email"
                                                                    value={editedAdmin.email}
                                                                    onChange={handleEditInputChange}
                                                                />
                                                            ) : (
                                                                admin.email
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editingAdminId === admin.nrPersonal ? (
                                                                <Input
                                                                    type="text"
                                                                    name="password"
                                                                    value={editedAdmin.password}
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
                                                            {editingAdminId === admin.nrPersonal ? (
                                                                <>
                                                                    <Button color="success" onClick={handleSave} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Save</Button>
                                                                    <Button color="secondary" onClick={handleCancelEdit} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px", fontSize: "small" }}>Cancel</Button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Button color="info" onClick={() => handleEdit(admin.nrPersonal)} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Edit</Button>
                                                                    <Button color="danger" onClick={() => handleDeleteAdmin(admin.nrPersonal)} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Delete</Button>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        <AdminDrawer
                                            isOpen={adminModal}
                                            toggle={toggleAdminModal}
                                            newAdmin={newAdmin}
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

export default AdminList;