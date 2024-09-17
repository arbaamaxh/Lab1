import React from 'react';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Table, Button, Input, Alert } from 'reactstrap';
import { useRooms } from '../../hooks/useRooms';
import RoomDrawer from './RoomDrawer';

const RoomList = () => {
    const {
        rooms,
        hospitals,
        departments,
        editingRoomId,
        editedRoom,
        roomModal,
        newRoom,
        selectedDepartment,
        selectedHospital,
        successMessage,
        errorMessage,
        errorMessageModal,
        toggleRoomModal,
        setNewRoom,
        handleHospitalChange,
        handleDepartmentChange,
        handleChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteRoom,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    } = useRooms();

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
                                        <th></th>
                                        <th>
                                            <Button onClick={toggleRoomModal}>Add Room</Button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.map(room => (
                                        <tr key={room.roomID}>
                                            <td>{room.roomID}</td>
                                            <td>
                                                {editingRoomId === room.roomID ? (
                                                    <Input
                                                        type="text"
                                                        name="numri"
                                                        value={editedRoom.numri}
                                                        onChange={handleEditInputChange}
                                                    />
                                                ) : (
                                                    room.numri
                                                )}
                                            </td>
                                            <td>{room.Department.emri}</td>
                                            <td>{room.Department.Hospital.emri}</td>
                                            <td>
                                                {editingRoomId === room.roomID ? (
                                                    <Button color="success" onClick={handleSave}>Save</Button>
                                                ) : (
                                                    <Button color="info" onClick={() => handleEdit(room.roomID)}>Edit</Button>
                                                )}
                                            </td>
                                            <td>
                                                {editingRoomId === room.roomID ? (
                                                    <>
                                                        <Button color="secondary" onClick={handleCancelEdit} style={{ marginRight: "10px", fontSize: "small" }}>Cancel</Button>
                                                    </>
                                                ) : (
                                                    <Button color="danger" onClick={() => handleDeleteRoom(room.roomID)}>Delete</Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <RoomDrawer
                                isOpen={roomModal}
                                toggle={toggleRoomModal}
                                newRoom={newRoom}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                handleHospitalChange={handleHospitalChange}
                                handleDepartmentChange={handleDepartmentChange}
                                errorMessageModal={errorMessageModal}
                                setErrorMessageModal={setErrorMessageModal}
                                hospitals={hospitals}
                                departments={departments}
                                setNewRoom={setNewRoom}
                                selectedHospital={selectedHospital}
                                selectedDepartment={selectedDepartment}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default RoomList;