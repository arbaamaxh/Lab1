import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePatients = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessageModal, setErrorMessageModal] = useState(null);
    const [hospitals, setHospitals] = useState([]);

    //displaying patients in a hospital
    const [patients, setPatients] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [activeHospitalTab, setActiveHospitalTab] = useState('0');

    const handleHospitalSelect = async (hospital, tab) => {
        setSelectedHospital(hospital);
        setActiveHospitalTab(tab);
        try {
            const response = await axios.get(`http://localhost:3001/hospitals/${hospital.nrRegjistrimit}/patients`);
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    //insert a patient into database
    const [newPatient, setNewPatient] = useState({ emri: '', mbriemri: '', nrPersonal: '', datelindja: '', gjinia: '', adresa: '', nrTel: '', hospitalId: '' });
    const [patientModal, setPatientModal] = useState(false);

    const togglePatientModal = () => setPatientModal(!patientModal);

    const fetchPatients = async () => {
        try {
            const response = await fetch("http://localhost:3001/patients");
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleChange = (e) => {
        if (e && e.target) {
            const { name, value } = e.target;
            setNewPatient({ ...newPatient, [name]: value });
        }
    };

    const handleHospitalChange = (selectedOption) => {
        setNewPatient({ ...newPatient, hospitalId: selectedOption.value });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const patientWithHospital = { ...newPatient };
        try {
            const response = await fetch("http://localhost:3001/patients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(patientWithHospital),
            });
            if (response.ok) {
                togglePatientModal();
                handleHospitalSelect(selectedHospital, activeHospitalTab);
                setNewPatient({ emri: "", mbriemri: "", nrPersonal: "", datelindja: "", gjinia: "", adresa: "", nrTel: "", hospitalId: "" });
            } else if (response.status === 400) {
                const responseData = await response.json();
                setErrorMessageModal(`Failed to insert patient: ${responseData.error}`);
                setTimeout(() => {
                    setErrorMessageModal(null);
                }, 3000);
            } else {
                console.error("Failed to insert patient");
                setErrorMessageModal("Failed to insert patient: Unknown error occurred");
                setTimeout(() => {
                    setErrorMessageModal(null);
                }, 3000);
            }
        } catch (error) {
            console.error("Error inserting patient:", error);
        }
    };

    //edit a patient
    const [editingPatientId, setEditingPatientId] = useState(null);
    const [editedPatient, setEditedPatient] = useState({
        emri: "",
        mbiemri: "",
        datelindja: "",
        gjinia: "",
        adresa: "",
        nrTel: "",
    });

    //me tleju me editu faqja
    const handleEdit = (nrPersonal) => {
        const patient = patients.find(pat => pat.nrPersonal === nrPersonal);
        setEditedPatient(patient);
        setEditingPatientId(nrPersonal);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPatient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
  const handleCancelEdit = () => {
    setEditingPatientId(null);
  };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/patients/${editingPatientId}`, editedPatient);
            if (response.status === 200) {
                handleHospitalSelect(selectedHospital, activeHospitalTab);
                setEditingPatientId(null);
                setSuccessMessage('Patient updated successfully');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            } else {
                setErrorMessage('Failed to update patient');
                setEditingPatientId(null);
            }
        } catch (error) {
            console.error('Error updating patient:', error);
            setErrorMessage('An error occurred while updating the patient');
            setEditingPatientId(null);
        }
    };

    //delete a patient
    const handleDeletePatient = async (nrPersonal) => {
        try {
            await axios.delete(`http://localhost:3001/patients/${nrPersonal}`);
            setPatients(patients.filter(patient => patient.nrPersonal !== nrPersonal));
            setSuccessMessage('Patient deleted successfully');
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error deleting patient:', error);
            setErrorMessage('An error occurred while deleting the patient');
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    };

    useEffect(() => {
        axios.get("http://localhost:3001/hospitals/")
          .then(response => {
            setHospitals(response.data);
            if(response.data.length > 0){
              handleHospitalSelect(response.data[0], "0");
            }
          })
          .catch(error => {
            console.error('Error fetching hospitals:', error);
          });
      }, []);

      const hospitalOptions = hospitals.map(hospital => ({
        value: hospital.nrRegjistrimit,
        label: hospital.emri
      }));

    return {
        hospitals,
        patients,
        newPatient,
        patientModal,
        editedPatient,
        editingPatientId,
        selectedHospital,
        activeHospitalTab,
        hospitalOptions,
        successMessage,
        errorMessage,
        errorMessageModal,
        handleHospitalSelect,
        handleChange,
        handleHospitalChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        togglePatientModal,
        handleDeletePatient,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    };
};