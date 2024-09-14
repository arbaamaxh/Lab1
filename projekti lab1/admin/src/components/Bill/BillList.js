import React from 'react';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Table, Button, Input, Alert } from 'reactstrap';
import { useBills } from '../../hooks/useBills';
import BillModal from './BillModal';

const BillList = () => {
    const {
        bills,
        patients,
        newBill,
        newService,
        servicePrices,
        billModal,
        editedBill,
        editingBillId,
        successMessage,
        errorMessage,
        errorMessageModal,
        selectedHospital,
        selectedPatient,
        selectedDate,
        hospitals,
        toggleBillModal,
        addService,
        setNewService,
        handleHospitalChange,
        handlePatientChange,
        handleDateChange,
        handleChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteBill,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    } = useBills();

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
                                                            <li key={index} style={{ fontSize: "small" }}>{service.emri}:{service.cmimi}€</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>
                                                    {editingBillId === bill.billID ? (
                                                        <Input
                                                            type="text"
                                                            name="data"
                                                            value={editedBill.data}
                                                            onChange={handleEditInputChange}
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
                                                        <Button color="success" onClick={handleSave}>Save</Button>
                                                    ) : (
                                                        <Button color="info" onClick={() => handleEdit(bill.billID)}>Edit</Button>
                                                    )}
                                                </td>
                                                <td>
                                                    {editingBillId === bill.billID ? (
                                                        <>
                                                            <Button color="secondary" onClick={handleCancelEdit} style={{ marginRight: "10px", fontSize: "small" }}>Cancel</Button>
                                                        </>
                                                    ) : (
                                                        <Button color="danger" onClick={() => handleDeleteBill(bill.billID)}>Delete</Button>
                                                    )}
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </Table>
                            <BillModal
                                isOpen={billModal}
                                toggle={toggleBillModal}
                                newBill={newBill}
                                servicePrices={servicePrices}
                                addService={addService}
                                newService={newService}
                                setNewService={setNewService}
                                handleHospitalChange={handleHospitalChange}
                                handlePatientChange={handlePatientChange}
                                handleDateChange={handleDateChange}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                selectedHospital={selectedHospital}
                                selectedPatient={selectedPatient}
                                selectedDate={selectedDate}
                                hospitals={hospitals}
                                patients={patients}
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
export default BillList;