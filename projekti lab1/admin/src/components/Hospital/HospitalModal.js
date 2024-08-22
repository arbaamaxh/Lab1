import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import "assets/css/ModalStyles.css";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { IconButton } from '@mui/material';

const HospitalModal = ({
  isOpen,
  toggle,
  newHospital,
  selectedImageName,
  handleChange,
  handleSubmit,
  errorMessageModal,
  setErrorMessageModal,
  handleFileChange,
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
        <FormGroup>
          <Label for="imageUrl">Hospital's Image</Label>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
            <span>Select Image</span>
          </label>
          {selectedImageName && <div style={{ marginTop: '10px' }}>{selectedImageName}</div>}
        </FormGroup>
        <Button type="submit">Add Hospital</Button>
      </Form>
    </ModalBody>
  </Modal>
);

export default HospitalModal;
