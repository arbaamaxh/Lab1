import { useState, useEffect } from 'react';
import axios from 'axios';

export const useDoctors = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageModal, setErrorMessageModal] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [activeHospitalTab, setActiveHospitalTab] = useState('0');
  const [activeDepartmentTab, setActiveDepartmentTab] = useState('0');

  const handleHospitalSelect = async (hospital, tab) => {
    setSelectedHospital(hospital);
    setActiveHospitalTab(tab);
    try {
      const response = await axios.get(`http://localhost:3001/hospitals/${hospital.nrRegjistrimit}/departments`);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleDepartmentSelect = async (department, tab) => {
    setSelectedDepartment(department);
    setActiveDepartmentTab(tab);
    try {
      const response = await axios.get(`http://localhost:3001/hospitals/${selectedHospital.nrRegjistrimit}/departments/${department.departmentID}/doctors`);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  //insert a doctor in database
  const [newDoctor, setNewDoctor] = useState({ emri: '', mbiemri: '', nrPersonal: '', adresa: '', nrTel: '', specializimi: '', depID: '', email: '', password: '' });
  const [selectedHospitalModal, setSelectedHospitalModal] = useState(null);
  const [selectedDepartmentModal, setSelectedDepartmentModal] = useState(null);
  const [doctorModal, setDoctorModal] = useState(false);
  const [specializations, setSpecializations] = useState([]);
  const [modalDepartments, setModalDepartments] = useState([]);
  const [selectedImageName, setSelectedImageName] = useState('');
  const [imageError, setImageError] = useState('');

  const toggleDoctorModal = () => setDoctorModal(!doctorModal);

  const handleHospitalChange = async (selectedOption) => {
    setSelectedHospitalModal(selectedOption);
    setSelectedDepartmentModal(null);
    setNewDoctor({ ...newDoctor, hospitalName: selectedOption.label, depID: '', specializimi: '' });
    setSpecializations([]);

    try {
      const response = await axios.get(`http://localhost:3001/hospitals/${selectedOption.value}/departments`);
      setModalDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleDepartmentChange = (selectedOption) => {
    const selectedDept = modalDepartments.find(d => d.departmentID === selectedOption.value);
    setSelectedDepartmentModal(selectedDept);
    setNewDoctor({ ...newDoctor, depID: selectedOption.value, specializimi: '' });

    let filteredSpecializations = [];
    if (selectedDept.emri === "Emergjenca") {
      filteredSpecializations = ["Mjek i Pergjithshem", "Radiolog"];
    } else if (selectedDept.emri === "Neurologjia") {
      filteredSpecializations = ["Neurolog", "Neurokirurg"];
    } else if (selectedDept.emri === "Kardiologjia") {
      filteredSpecializations = ["Kardiolog", "Kardiokirurg"];
    } else if (selectedDept.emri === "Pediatria") {
      filteredSpecializations = ["Pediater", "Psikolog Pediatrik", "Kirurg Pediater"];
    } else if (selectedDept.emri === "Psikiatria") {
      filteredSpecializations = ["Psikiater"];
    } else if (selectedDept.emri === "Pulmologjia") {
      filteredSpecializations = ["Pulmolog", "Pulmokirurg"];
    } else if (selectedDept.emri === "Gjinekologjia") {
      filteredSpecializations = ["Gjinekolog", "Neonatolog"];
    } else if (selectedDept.emri === "Dermatologjia") {
      filteredSpecializations = ["Dermatolog"];
    } else if (selectedDept.emri === "Otorinolaringologjia") {
      filteredSpecializations = ["Otorinolaringolog"];
    } else if (selectedDept.emri === "Interno") {
      filteredSpecializations = ["Internist Abdominal"];
    } else if (selectedDept.emri === "Oftalmologjia") {
      filteredSpecializations = ["Oftalmolog", "Oftalmokirurg"];
    } else if (selectedDept.emri === "Ortopedia") {
      filteredSpecializations = ["Ortoped", "Kirurg Ortoped"];
    } else if (selectedDept.emri === "Radiologjia") {
      filteredSpecializations = ["Radiologjia"];
    }
    setSpecializations(filteredSpecializations);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewDoctor({ ...newDoctor, imageUrl: e.target.files[0] });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImageName(file.name);
    } else {
      setSelectedImageName('');
    }
    handleImageChange(event);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!selectedImageName) {
      setImageError('Please select an image.');
      return;
    }
    setImageError('');
    handleSubmit(e);
  };

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setNewDoctor({ ...newDoctor, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('emri', newDoctor.emri);
    formData.append('mbiemri', newDoctor.mbiemri);
    formData.append('nrPersonal', newDoctor.nrPersonal);
    formData.append('adresa', newDoctor.adresa);
    formData.append('nrTel', newDoctor.nrTel);
    formData.append('specializimi', newDoctor.specializimi);
    formData.append('email', newDoctor.email);
    formData.append('password', newDoctor.password);
    formData.append('hospitalName', selectedHospitalModal.label);
    formData.append('departmentName', modalDepartments.find(d => d.departmentID === newDoctor.depID)?.emri);

    if (newDoctor.imageUrl) {
      formData.append('img', newDoctor.imageUrl);
    }

    try {
      const response = await fetch("http://localhost:3001/doctors", {
        method: "POST",
        body: formData,  // Use FormData for multipart/form-data
      });

      if (response.ok) {
        toggleDoctorModal();
        handleDepartmentSelect(selectedDepartment, activeDepartmentTab);
        setNewDoctor({ emri: "", mbiemri: "", nrPersonal: "", adresa: "", nrTel: "", specializimi: "", depID: "", imageUrl: null, email: "", password: "" });
        setSelectedHospitalModal(null);
        setSelectedDepartmentModal(null);
      } else if (response.status === 400) {
        const responseData = await response.json();
        setErrorMessageModal(`Failed to insert doctor: ${responseData.error}`);
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      } else {
        console.error("Failed to insert doctor");
        setErrorMessageModal("Failed to insert doctor: Unknown error occurred");
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error inserting doctor:", error);
    }
  };

  //edit a doctor
  const [selectedEditFile, setSelectedEditFile] = useState(null);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [editedDoctor, setEditedDoctor] = useState({
    emri: "",
    mbiemri: "",
    adresa: "",
    nrTel: "",
    specializimi: "",
    imageUrl: "",
    email: "",
    password: "",
  });

  //me tleju me editu faqja
  const handleEdit = (nrPersonal) => {
    const doctor = doctors.find(doc => doc.nrPersonal === nrPersonal);
    setEditedDoctor(doctor);
    setEditingDoctorId(nrPersonal);
  };

  const handleEditFileChange = (e) => {
    setSelectedEditFile(e.target.files[0]);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDoctor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    setEditingDoctorId(null);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('emri', editedDoctor.emri);
    formData.append('mbiemri', editedDoctor.mbiemri);
    formData.append('adresa', editedDoctor.adresa);
    formData.append('nrTel', editedDoctor.nrTel);
    formData.append('specializimi', editedDoctor.specializimi);
    formData.append('email', editedDoctor.email);
    formData.append('password', editedDoctor.password);
    if (selectedEditFile) {
      formData.append('img', selectedEditFile);
    }

    try {
      const response = await axios.put(`http://localhost:3001/doctors/${editingDoctorId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        handleHospitalSelect(selectedHospital, activeHospitalTab);
        handleDepartmentSelect(selectedDepartment, activeDepartmentTab);
        setEditingDoctorId(null);
        setSelectedEditFile(null);
        setSuccessMessage('Doctor updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        const errorMessage = response.data.error || 'Failed to update patient: Unknown error occurred';
        setErrorMessage(errorMessage);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        setEditingDoctorId(null);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(`Failed to update doctor: ${error.response.data.error}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      } else {
        setErrorMessage('An error occurred while updating the doctor');
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
      setEditingDoctorId(null);
    }
  };

  //delete a doctor
  const handleDeleteDoctor = async (nrPersonal) => {
    try {
      await axios.delete(`http://localhost:3001/doctors/${nrPersonal}`);
      setDoctors(doctors.filter(doctor => doctor.nrPersonal !== nrPersonal));
      setSuccessMessage('Doctor deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error deleting doctor:', error);
      setErrorMessage('An error occurred while deleting the doctor');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3001/hospitals/")
      .then(response => {
        setHospitals(response.data);
        if (response.data.length > 0) {
          handleHospitalSelect(response.data[0], "0");
        }
      })
      .catch(error => {
        console.error('Error fetching hospitals:', error);
      });
  }, []);

  useEffect(() => {
    if (departments.length > 0) {
      handleDepartmentSelect(departments[0], "0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departments]);

  return {
    hospitals,
    doctors,
    newDoctor,
    doctorModal,
    specializations,
    editedDoctor,
    editingDoctorId,
    departments,
    selectedHospital,
    selectedDepartment,
    selectedImageName,
    selectedEditFile,
    activeHospitalTab,
    activeDepartmentTab,
    successMessage,
    errorMessage,
    errorMessageModal,
    imageError,
    selectedHospitalModal,
    selectedDepartmentModal,
    modalDepartments,
    toggleDoctorModal,
    setNewDoctor,
    handleHospitalSelect,
    handleDepartmentSelect,
    handleChange,
    handleHospitalChange,
    handleDepartmentChange,
    handleFileChange,
    onSubmit,
    handleSubmit,
    handleEdit,
    handleEditInputChange,
    handleEditFileChange,
    handleCancelEdit,
    handleSave,
    handleDeleteDoctor,
    setSuccessMessage,
    setErrorMessage,
    setErrorMessageModal,
  };
};