import { useState, useEffect } from 'react';
import axios from 'axios';

export const useHospitals = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageModal, setErrorMessageModal] = useState(null);

  const [hospitals, setHospitals] = useState([]);

  //insert new hospital into database
  const [newHospital, setNewHospital] = useState({ emri: "", adresa: "", nrTel: "" });
  const [hospitalModal, setHospitalModal] = useState(false);

  const toggleHospitalModal = () => setHospitalModal(!hospitalModal);

  const fetchHospitals = async () => {
    try {
      const response = await fetch("http://localhost:3001/hospitals");
      const data = await response.json();
      setHospitals(data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHospital({ ...newHospital, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/hospitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHospital),
      });
      if (response.ok) {
        fetchHospitals();
        setNewHospital({ emri: "", adresa: "", nrTel: "" });
        toggleHospitalModal();
      } else if (response.status === 400) {
        const responseData = await response.json();
        setErrorMessageModal(`Failed to insert hospital: ${responseData.error}`);
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      } else {
        console.error("Failed to insert hospital");
        setErrorMessageModal("Failed to insert hospital: Unknown error occurred");
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error inserting hospital:", error);
    }
  };

  //edit a hospital
  const [editingHospitalId, setEditingHospitalId] = useState(null);
  const [editedHospital, setEditedHospital] = useState({
    emri: "",
    adresa: "",
    nrTel: ""
  });

  //me tleju me editu faqja
  const handleEdit = (hospitalId) => {
    setEditingHospitalId(hospitalId);
    const hospitalToEdit = hospitals.find(hospital => hospital.nrRegjistrimit === hospitalId);
    if (hospitalToEdit) {
      setEditedHospital(hospitalToEdit);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedHospital(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    setEditingHospitalId(null);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/hospitals/${editingHospitalId}`, editedHospital);
      if (response.status === 200) {
        const updatedHospitals = hospitals.map(hospital => {
          if (hospital.nrRegjistrimit === editingHospitalId) {
            return editedHospital;
          }
          return hospital;
        });
        setHospitals(updatedHospitals);
        setEditingHospitalId(null);
        setSuccessMessage('Hospital updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        setErrorMessage('Failed to update hospital');
        setEditingHospitalId(null);
      }
    } catch (error) {
      console.error('Error updating hospital:', error);
      setErrorMessage('An error occurred while updating the hospital');
      setEditingHospitalId(null);
    }
  };

  //delete a hospital
  const handleDeleteHospital = async (hospitalID) => {
    try {
      await axios.delete(`http://localhost:3001/hospitals/${hospitalID}`);
      setHospitals(hospitals.filter(hospital => hospital.nrRegjistrimit !== hospitalID));
      setSuccessMessage('Hospital deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error deleting hospital:', error);
      setErrorMessage('An error occurred while deleting the hospital');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return {
    hospitals,
    newHospital,
    hospitalModal,
    editingHospitalId,
    editedHospital,
    successMessage,
    errorMessage,
    errorMessageModal,
    toggleHospitalModal,
    handleChange,
    handleSubmit,
    handleEdit,
    handleEditInputChange,
    handleCancelEdit,
    handleSave,
    handleDeleteHospital,
    setSuccessMessage,
    setErrorMessage,
    setErrorMessageModal
  };
};