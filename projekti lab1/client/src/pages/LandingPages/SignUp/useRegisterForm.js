import { useState, useEffect } from "react";

export const useRegisterForm = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageModal, setErrorMessageModal] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [newPatient, setNewPatient] = useState({
    emri: "",
    mbiemri: "",
    nrPersonal: "",
    datelindja: "",
    gjinia: "",
    adresa: "",
    nrTel: "",
    email: "",
    password: "",
    hospitalId: "",
  });

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
        setNewPatient({
          emri: "",
          mbiemri: "",
          nrPersonal: "",
          datelindja: "",
          gjinia: "",
          adresa: "",
          nrTel: "",
          email: "",
          password: "",
          hospitalId: "",
        });
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

  const hospitalOptions = hospitals.map((hospital) => ({
    value: hospital.nrRegjistrimit,
    label: hospital.emri,
  }));

  return {
    hospitals,
    patients,
    newPatient,
    selectedHospital,
    hospitalOptions,
    successMessage,
    errorMessage,
    errorMessageModal,
    setPatients,
    setSelectedHospital,
    handleChange,
    handleHospitalChange,
    handleSubmit,
    setSuccessMessage,
    setErrorMessage,
    setErrorMessageModal,
  };
};
