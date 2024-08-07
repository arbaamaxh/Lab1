import React from 'react';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Table, Button, Input, Alert } from 'reactstrap';
import { useHospitals } from '../../hooks/useHospitals';
import HospitalModal from './HospitalModal';

const HospitalList = () => {
    const {
        hospitals,
        editingHospitalId,
        editedHospital,
        hospitalModal,
        newHospital,
        successMessage,
        errorMessage,
        errorMessageModal,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
        toggleHospitalModal,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleEdit,
        handleDeleteHospital,
        handleChange,
        handleSubmit
    } = useHospitals();

    return (
        <>
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
                                                        onChange={handleEditInputChange}
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
                                                        onChange={handleEditInputChange}
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
                                                        onChange={handleEditInputChange}
                                                    />
                                                ) : (
                                                    hospital.nrTel
                                                )}
                                            </td>
                                            <td>
                                                {editingHospitalId === hospital.nrRegjistrimit ? (
                                                    <Button color="success" onClick={handleSave}>Save</Button>
                                                ) : (
                                                    <Button color="info" onClick={() => handleEdit(hospital.nrRegjistrimit)}>Edit</Button>
                                                )}
                                            </td>
                                            <td>
                                                {editingHospitalId === hospital.nrRegjistrimit ? (
                                                    <>
                                                        <Button color="secondary" onClick={handleCancelEdit} style={{ marginRight: "10px", fontSize: "small" }}>Cancel</Button>
                                                    </>
                                                ) : (
                                                    <Button color="danger" onClick={() => handleDeleteHospital(hospital.nrRegjistrimit)}>Delete</Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <HospitalModal
                                isOpen={hospitalModal}
                                toggle={toggleHospitalModal}
                                newHospital={newHospital}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                errorMessageModal={errorMessageModal}
                                setErrorMessageModal={setErrorMessageModal}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default HospitalList;