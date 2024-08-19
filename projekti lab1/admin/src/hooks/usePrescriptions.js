import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePrescriptions = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageModal, setErrorMessageModal] = useState(null);

  //displaying prescriptions dropped by doctors
  const [prescriptions, setPrescriptions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [activeDoctorTab, setActiveDoctorTab] = useState('0');
  
  const handleDoctorSelect = async (doctor, tab) => {
    setSelectedDoctor(doctor);
    setActiveDoctorTab(tab);
    try {
      const response = await axios.get(`http://localhost:3001/doctors/${doctor.nrPersonal}/prescriptions`);
      const prescriptionsWithPatientNames = await Promise.all(response.data.map(async (prescription) => {
        const patientResponse = await axios.get(`http://localhost:3001/patients/${prescription.patientNrPersonal}`);
        return {
          ...prescription,
          patient: patientResponse.data
        };
      }));
      setPrescriptions(prescriptionsWithPatientNames);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  //inserting an prescription
  const [newPrescription, setNewPrescription] = useState({ data: '', diagnoza: '', ilace: '', udhezimi: '', patientNrPersonal: '', doctorNrPersonal: ''});
  const [prescriptionModal, setPrescriptionModal] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctorsModal, setDoctorsModal] = useState([]);
  const [departments,setDepartments] = useState([]);
  const [selectedHospitalModal, setSelectedHospitalModal] = useState(null);
  const [selectedDepartmentModal, setSelectedDepartmentModal] = useState(null);
  const [selectedDoctorModal, setSelectedDoctorModal] = useState(null);
  const [selectedPatientModal, setSelectedPatientModal] = useState(null);

  const togglePrescriptionModal = () => setPrescriptionModal(!prescriptionModal);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get("http://localhost:3001/hospitals");
      setHospitals(response.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchPatients = async (hospitalId) => {
      try {
          const response = await fetch(`http://localhost:3001/hospitals/${hospitalId}/patients`);
          const data = await response.json();
          setPatients(data);
      } catch (error) {
          console.error("Error fetching patients:", error);
      }
  };

  const fetchDepartments = async (hospitalId) => {
      try {
          const response = await fetch(`http://localhost:3001/hospitals/${hospitalId}/departments`);
          const data = await response.json();
          setDepartments(data);
      } catch (error) {
          console.error("Error fetching departments:", error);
      }
  };

  const fetchDoctors = async (depID) => {
      try {
          const response = await fetch(`http://localhost:3001/departments/${depID}/doctors`);
          const data = await response.json();
          setDoctorsModal(data);
      } catch (error) {
          console.error("Error fetching patients:", error);
      }
  };

  const handleHospitalChange = (selectedOption) => {
      setSelectedHospitalModal(selectedOption);
      fetchDepartments(selectedOption.value);
      fetchPatients(selectedOption.value);
      setNewPrescription({ ...newPrescription, hospitalName: selectedOption.label });
      setSelectedDepartmentModal(null);
      setSelectedPatientModal(null);
      setSelectedDoctorModal(null);
  };

  const handleDepartmentChange = (selectedOption) => {
      setSelectedDepartmentModal(selectedOption);
      fetchDoctors(selectedOption.value);
      setNewPrescription({ ...newPrescription, departmentName: selectedOption.label });
      setSelectedDoctorModal(null);
      setSelectedPatientModal(null); //check this again
  };

  const handlePatientChange = (selectedOption) => {
      const selectedPatient = patients.find(p => p.nrPersonal === selectedOption.value);
      setSelectedPatientModal(selectedPatient);

      const fullName = `${selectedPatient.emri} ${selectedPatient.mbiemri}`;

      setNewPrescription({ ...newPrescription, patientName: fullName });
  };

  const handleDoctorChange = async (selectedOption) => {
      const selectedDoctor = doctorsModal.find(p => p.nrPersonal === selectedOption.value);
      setSelectedDoctorModal(selectedDoctor);

      const fullName = `${selectedDoctor.emri} ${selectedDoctor.mbiemri}`;

      setNewPrescription({ ...newPrescription, doctorName: fullName });
  };

  const handleChange = (e) => {
    if (e && e.target) {
        const { name, value } = e.target;
        setNewPrescription({ ...newPrescription, [name]: value });
    }
};

  const handleSubmit = async (e) => {
      e.preventDefault();
      const prescription = {
          ...newPrescription,
          departmentID: selectedDepartmentModal.departmentID,
          departmentName: selectedDepartmentModal.label,
          patientNrPersonal: selectedPatientModal.nrPersonal,
          patientName: `${selectedPatientModal.emri} ${selectedPatientModal.mbiemri}`,
          doctorNrPersonal: selectedDoctorModal.nrPersonal,
          doctorName: `${selectedDoctorModal.emri} ${selectedDoctorModal.mbiemri}`,
      };
      try {
          const response = await fetch("http://localhost:3001/prescriptions", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(prescription),
          });
          if (response.ok) {
              togglePrescriptionModal();
              setNewPrescription({ data: '', diagnoza: '', ilace: '', udhezimi: '', patientNrPersonal: '', doctorNrPersonal: ''});
              setSelectedHospitalModal(null);
              setSelectedDepartmentModal(null);
              setSelectedPatientModal(null);
              setSelectedDoctorModal(null);
              handleDoctorSelect(selectedDoctor, activeDoctorTab);
          } else if (response.status === 400) {
              const responseData = await response.json();
              setErrorMessageModal(`Failed to insert prescription: ${responseData.error}`);
              setTimeout(() => {
                  setErrorMessageModal(null);
              }, 3000);
          } else {
              console.error("Failed to insert prescription");
              setErrorMessageModal("Failed to insert prescription: Unknown error occurred");
              setTimeout(() => {
                  setErrorMessageModal(null);
              }, 3000);
          }
      } catch (error) {
          console.error("Error inserting prescription:", error);
      }
  };

  //edit an prescription
  const [editingPrescriptionId, setEditingPrescriptionId] = useState(null);
  const [editedPrescription, setEditedPrescription] = useState({
      diagnoza: "",
      ilace: "",
      udhezimi: ""
  });

  //me tleju me editu faqja
  const handleEdit = (prescriptionID) => {
      const prescription = prescriptions.find(app => app.prescriptionID === prescriptionID);
      setEditedPrescription(prescription);
      setEditingPrescriptionId(prescriptionID);
  };

  const handleEditInputChange = (e) => {
      const { name, value } = e.target;
      setEditedPrescription(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  const handleCancelEdit = () => {
    setEditingPrescriptionId(null);
  };

  const handleSave = async () => {
      try {
          const response = await axios.put(`http://localhost:3001/prescriptions/${editingPrescriptionId}`, editedPrescription);
          if (response.status === 200) {
              handleDoctorSelect(selectedDoctor, activeDoctorTab);
              setEditingPrescriptionId(null);
              setSuccessMessage('Prescription updated successfully');
              setTimeout(() => {
                  setSuccessMessage(null);
              }, 3000);
          } else {
              setErrorMessage('Failed to update prescription');
              setEditingPrescriptionId(null);
          }
      } catch (error) {
          console.error('Error updating prescription:', error);
          setErrorMessage('An error occurred while updating the prescription');
          setEditingPrescriptionId(null);
      }
  };

  //delete a prescription
  const handleDeletePrescription = async (prescriptionID) => {
    try{
      await axios.delete(`http://localhost:3001/prescriptions/${prescriptionID}`);
      handleDoctorSelect(selectedDoctor, activeDoctorTab);
      setPrescriptions(prescriptions.filter(prescriptionID => prescriptionID.prescriptionID !== prescriptionID));
      setSuccessMessage('Prescription deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }catch(error){
      console.error('Error deleting prescription:', error);
      setErrorMessage('An error occurred while deleting the prescription');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
      axios.get("http://localhost:3001/doctors/")
      .then(response => {
        setDoctors(response.data);
        if(response.data.length > 0){
          handleDoctorSelect(response.data[0], "0");
        }
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  return {
    successMessage,
    errorMessage,
    errorMessageModal,
    newPrescription,
    prescriptions,
    doctors,
    editingPrescriptionId,
    editedPrescription,
    selectedDoctor,
    activeDoctorTab,
    prescriptionModal,
    hospitals,
    departments,
    patients,
    doctorsModal,
    selectedDepartmentModal,
    selectedHospitalModal,
    selectedDoctorModal,
    selectedPatientModal,
    togglePrescriptionModal,
    handleDoctorSelect,
    handleDeletePrescription,
    handleHospitalChange,
    handleDepartmentChange,
    handlePatientChange,
    handleDoctorChange,
    handleChange,
    handleSubmit,
    handleEdit,
    handleEditInputChange,
    handleCancelEdit,
    handleSave,
    setHospitals,
    setSuccessMessage,
    setErrorMessage,
    setErrorMessageModal,
  };
};