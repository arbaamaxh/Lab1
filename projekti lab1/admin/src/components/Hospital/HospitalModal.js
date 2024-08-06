import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import "assets/css/ModalStyles.css";

const HospitalModal = ({
  isOpen,
  toggle,
  newHospital,
  handleChange,
  handleSubmit,
  errorMessageModal,
  setErrorMessageModal,
}) => (
  <Modal isOpen={isOpen} toggle={toggle} className="Modal">
    <ModalHeader toggle={toggle} className="ModalHeader">Add Hospital</ModalHeader>
    <ModalBody className="ModalBody">
      <Alert color="info" isOpen={!!errorMessageModal} toggle={() => setErrorMessageModal('')}>
        {errorMessageModal}
      </Alert>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="emri">Name</Label>
          <Input type="text" name="emri" id="emri" value={newHospital.emri} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="adresa">Address</Label>
          <Input type="text" name="adresa" id="adresa" value={newHospital.adresa} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="nrTel">Phone Number</Label>
          <Input type="text" name="nrTel" id="nrTel" value={newHospital.nrTel} onChange={handleChange} required pattern="^\d{5,15}$" title="Phone Number should have between 5-15 numbers." />
        </FormGroup>
        <Button type="submit">Add Hospital</Button>
      </Form>
    </ModalBody>
  </Modal>
);

export default HospitalModal;