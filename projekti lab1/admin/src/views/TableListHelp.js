//ndrroj qito departmentsforbllablla edhe krejt qa jon me for per inserta se jon tu ta fuck up kodin.. e din qa se skom qa ta spjegoj :P

import { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import 'moment-timezone';

export const useTableList = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageModal, setErrorMessageModal] = useState(null);

  //hospitals
  const [hospitals, setHospitals] = useState([]);

  //insert new hospital into database
  const [newHospital, setNewHospital] = useState({ emri: "", adresa: "", nrTel: "" });
  const [hospitalModal, setHospitalModal] = useState(false);

  const toggleHospitalModal = () => setHospitalModal(!hospitalModal);

  const fetchHospitals = async () => {
    try{
      const response = await fetch("http://localhost:3001/hospitals");
      const data = await response.json();
      setHospitals(data);
    }catch(error){
      console.error("Error fetching hospitals:", error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleChangeForHospitals = (e) => {
    const { name, value } = e.target;
    setNewHospital({ ...newHospital, [name]: value });
  };

  const handleSubmitForHospitals = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch("http://localhost:3001/hospitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHospital),
      });
      if(response.ok){
        fetchHospitals();
        setNewHospital({ emri: "", adresa: "", nrTel: "" });
        toggleHospitalModal();
      }else if(response.status === 400){
        const responseData = await response.json();
        setErrorMessageModal(`Failed to insert hospital: ${responseData.error}`);
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }else{
        console.error("Failed to insert hospital");
        setErrorMessageModal("Failed to insert hospital: Unknown error occurred");
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }  
    }catch(error){
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
  const handleEditForHospitals = (hospitalId) => {
    setEditingHospitalId(hospitalId);
    const hospitalToEdit = hospitals.find(hospital => hospital.nrRegjistrimit === hospitalId);
    if(hospitalToEdit){
      setEditedHospital(hospitalToEdit);
    }
  };

  const handleEditInputChangeForHospitals = (e) => {
    const { name, value } = e.target;
    setEditedHospital(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveForHospitals = async () => {
    try{
      const response = await axios.put(`http://localhost:3001/hospitals/${editingHospitalId}`, editedHospital);
      if(response.status === 200){
        const updatedHospitals = hospitals.map(hospital => {
          if(hospital.nrRegjistrimit === editingHospitalId){
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
      }else{
        setErrorMessage('Failed to update hospital');
        setEditingHospitalId(null);
      }
    }catch (error){
      console.error('Error updating hospital:', error);
      setErrorMessage('An error occurred while updating the hospital');
      setEditingHospitalId(null);
    }
  };

  //delete a hospital
  const handleDeleteHospital = async (hospitalID) => {
    try{
      await axios.delete(`http://localhost:3001/hospitals/${hospitalID}`);
      setHospitals(hospitals.filter(hospital => hospital.nrRegjistrimit !== hospitalID));
      setSuccessMessage('Hospital deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }catch(error){
      console.error('Error deleting hospital:', error);
      setErrorMessage('An error occurred while deleting the hospital');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };


  // displaying departments in a hospital
  const [departmentsForDepartments, setDepartmentsForDepartments] = useState([]);
  const [selectedHospitalForDepartments, setSelectedHospitalForDepartments] = useState(null);
  const [activeHospitalTabForDepartments, setActiveHospitalTabForDepartments] = useState('0');

  const handleHospitalSelectForDepartments = async (hospital, tab) => {
    setSelectedHospitalForDepartments(hospital);
    setActiveHospitalTabForDepartments(tab);
    try{
      const response = await axios.get(`http://localhost:3001/hospitals/${hospital.nrRegjistrimit}/departments`);
      setDepartmentsForDepartments(response.data);
    }catch(error){
      console.error('Error fetching departments:', error);
    }
  };

  //insert new department into database
  const [newDepartment, setNewDepartment] = useState({ emri: '', lokacioni: '', nrTel: '', hospitalId: '' });
  const [departmentModal, setDepartmentModal] = useState(false);

  const toggleDepartmentModal = () => setDepartmentModal(!departmentModal);

  const fetchDepartments = async () => {
    try{
      const response = await fetch("http://localhost:3001/departments");
      const data = await response.json();
      setDepartmentsForDepartments(data);
    }catch(error){
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChangeForDepartments = (e) => {
    if(e && e.target){
      const { name, value } = e.target;
      setNewDepartment({ ...newDepartment, [name]: value });
    }
  };

  const handleSubmitForDepartments = async (e) => {
    e.preventDefault();
    const departmentWithHospital = { ...newDepartment, hospitalId: selectedHospitalForDepartments.nrRegjistrimit };
    try{
      const response = await fetch("http://localhost:3001/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(departmentWithHospital),
      });
      if(response.ok){
        // fetchDepartments();
        toggleDepartmentModal();
        handleHospitalSelectForDepartments(selectedHospitalForDepartments, activeHospitalTabForDepartments);
        setNewDepartment({ emri: "", lokacioni: "", nrTel: "", hospitalId: "" });
      }else if(response.status === 400){
        const responseData = await response.json();
        setErrorMessageModal(`Failed to insert department: ${responseData.error}`);
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }else{
        console.error("Failed to insert department");
        setErrorMessageModal("Failed to insert department: Unknown error occurred");
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }  
    }catch(error){
      console.error("Error inserting department:", error);
    }
  };

  //edit a department
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  const [editedDepartment, setEditedDepartment] = useState({
    emri: "",
    lokacioni: "",
    nrTel: "",
    hospitalName: ""
  });

  //me tleju me editu faqja
  const handleEditForDepartments = (departmentID) => {
    const department = departmentsForDepartments.find(dept => dept.departmentID === departmentID);
    setEditedDepartment(department);
    setEditingDepartmentId(departmentID);
  };  

  const handleEditInputChangeForDepartments = (e) => {
    const { name, value } = e.target;
    setEditedDepartment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveForDepartments = async () => {
    try{
      const response = await axios.put(`http://localhost:3001/departments/${editingDepartmentId}`, editedDepartment);
      if(response.status === 200){
        // fetchDepartments();
        handleHospitalSelectForDepartments(selectedHospitalForDepartments, activeHospitalTabForDepartments);
        setEditingDepartmentId(null);
        setSuccessMessage('Department updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }else{
        setErrorMessage('Failed to update department');
        setEditingDepartmentId(null);
      }
    }catch(error){
      console.error('Error updating department:', error);
      setErrorMessage('An error occurred while updating the department');
      setEditingDepartmentId(null);
    }
  };

  
  //delete a department
  const handleDeleteDepartment = async (departmentID) => {
    try{
      await axios.delete(`http://localhost:3001/departments/${departmentID}`);
      setDepartmentsForDepartments(departmentsForDepartments.filter(department => department.departmentID !== departmentID));
      setDepartmentsForDoctors(departmentsForDoctors.filter(department => department.departmentID !== departmentID));
      setDepartmentsForStaff(departmentsForStaff.filter(department => department.departmentID !== departmentID));
      setDepartmentsForAppointments(departmentsForAppointments.filter(department => department.departmentID !== departmentID));
      setSuccessMessage('Department deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }catch(error){
      console.error('Error deleting department:', error);
      setErrorMessage('An error occurred while deleting the department');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };
  

  //displaying doctors in a specific department in a hospital
  const [doctorsForDoctors, setDoctorsForDoctors] = useState([]);
  const [departmentsForDoctors, setDepartmentsForDoctors] = useState([]);
  const [selectedHospitalForDoctors, setSelectedHospitalForDoctors] = useState(null);
  const [selectedDepartmentForDoctors, setSelectedDepartmentForDoctors] = useState(null);
  const [activeHospitalTabForDoctors, setActiveHospitalTabForDoctors] = useState('0');
  const [activeDepartmentTabForDoctors, setActiveDepartmentTabForDoctors] = useState('0');

  const handleHospitalSelectForDoctors = async (hospital, tab) => {
    setSelectedHospitalForDoctors(hospital);
    setActiveHospitalTabForDoctors(tab);
    try{
      const response = await axios.get(`http://localhost:3001/hospitals/${hospital.nrRegjistrimit}/departments`);
      setDepartmentsForDoctors(response.data);
    }catch(error){
      console.error('Error fetching departments:', error);
    }
  };

  const handleDepartmentSelectForDoctors = async (department, tab) => {
    setSelectedDepartmentForDoctors(department);
    setActiveDepartmentTabForDoctors(tab);
    try{
      const response = await axios.get(`http://localhost:3001/hospitals/${selectedHospitalForDoctors.nrRegjistrimit}/departments/${department.departmentID}/doctors`);
      setDoctorsForDoctors(response.data);
    }catch(error){
      console.error('Error fetching doctors:', error);
    }
  };

  //insert a doctor in database
  const [newDoctor, setNewDoctor] = useState({ emri: '', mbiemri: '', nrPersonal: '', adresa: '', nrTel: '', specializimi: '', depID: '' });
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [doctorModal, setDoctorModal] = useState(false);
  const [specializations, setSpecializations] = useState([]);

  const toggleDoctorModal = () => setDoctorModal(!doctorModal);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchDepartmentsForDoctors = async (hospitalId) => {
    try{
      const response = await fetch(`http://localhost:3001/hospitals/${hospitalId}/departments`);
      const data = await response.json();
      setDepartmentsForDoctors(data);
    }catch(error){
      console.error("Error fetching departments:", error);
    }
  };

  const handleHospitalChangeForDoctors = async (selectedOption) => {
    setSelectedHospital(selectedOption);
    setSelectedDepartment(null);
    setNewDoctor({ ...newDoctor, hospitalName: selectedOption.label, depID: '', specializimi: '' });
    setSpecializations([]);
    fetchDepartmentsForDoctors(selectedOption.value);
  };

  const handleDepartmentChangeForDoctors = (selectedOption) => {
    const selectedDept = departmentsForDoctors.find(d => d.departmentID === selectedOption.value);
    setSelectedDepartment(selectedDept);
    setNewDoctor({ ...newDoctor, depID: selectedOption.value, specializimi: '' });

    let filteredSpecializations = [];
    if(selectedDept.emri === "Emergjenca"){
      filteredSpecializations = ["Mjek i Pergjithshem", "Radiolog"];
    }else if(selectedDept.emri === "Neurologjia"){
      filteredSpecializations = ["Neurolog", "Neurokirurg"];
    }else if(selectedDept.emri === "Kardiologjia"){
      filteredSpecializations = ["Kardiolog", "Kardiokirurg"];
    }else if(selectedDept.emri === "Pediatria"){
      filteredSpecializations = ["Pediater", "Psikolog Pediatrik", "Kirurg Pediater"];
    }else if(selectedDept.emri === "Psikiatria"){
      filteredSpecializations = ["Psikiater"];
    }else if(selectedDept.emri === "Pulmologjia"){
      filteredSpecializations = ["Pulmolog", "Pulmokirurg"];
    }else if(selectedDept.emri === "Gjinekologjia"){
      filteredSpecializations = ["Gjinekolog", "Neonatolog"];
    }else if(selectedDept.emri === "Dermatologjia"){
      filteredSpecializations = ["Dermatolog"];
    }else if(selectedDept.emri === "Otorinolaringologjia"){
      filteredSpecializations = ["Otorinolaringolog"];
    }else if(selectedDept.emri === "Interno"){
      filteredSpecializations = ["Internist Abdominal"];
    }else if(selectedDept.emri === "Oftalmologjia"){
      filteredSpecializations = ["Oftalmolog", "Oftalmokirurg"];
    }else if(selectedDept.emri === "Ortopedia"){
      filteredSpecializations = ["Ortoped", "Kirurg Ortoped"];
    }else if(selectedDept.emri === "Radiologjia"){
      filteredSpecializations = ["Radiologjia"];
    }
    setSpecializations(filteredSpecializations);
  };

  const fetchDoctors = async () => {
    try{
      const response = await fetch("http://localhost:3001/doctors");
      const data = await response.json();
      setDoctorsForDoctors(data);
    }catch(error){
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChangeForDoctors = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setNewDoctor({ ...newDoctor, [name]: value });
    }
  };

  const handleSubmitForDoctors = async (e) => {
    e.preventDefault();
    const doctorWithDepartment = {
      ...newDoctor,
      depID: selectedDepartment.depID,
      hospitalName: selectedHospital.label,
      departmentName: departmentsForDoctors.find(d => d.departmentID === newDoctor.depID)?.emri
    };
    try {
      const response = await fetch("http://localhost:3001/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorWithDepartment),
      });
  
      if (response.ok) {
        toggleDoctorModal();
        handleDepartmentSelectForDoctors(selectedDepartmentForDoctors, activeDepartmentTabForDoctors);
        setNewDoctor({ emri: "", mbiemri: "", nrPersonal: "", adresa: "", nrTel: "", specializimi: "", depID: "" });
        setSelectedHospital(null);
        setSelectedDepartment(null);
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
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [editedDoctor, setEditedDoctor] = useState({
    emri: "",
    mbiemri: "",
    adresa: "",
    nrTel: "",
    specializimi: ""
  });

  //me tleju me editu faqja
  const handleEditForDoctors = (nrPersonal) => {
    const doctor = doctorsForDoctors.find(doc => doc.nrPersonal === nrPersonal);
    setEditedDoctor(doctor);
    setEditingDoctorId(nrPersonal);
  };  

  const handleEditInputChangeForDoctors = (e) => {
    const { name, value } = e.target;
    setEditedDoctor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveForDoctors = async () => {
    try{
      const response = await axios.put(`http://localhost:3001/doctors/${editingDoctorId}`, editedDoctor);
      if(response.status === 200){
        handleHospitalSelectForDoctors(selectedHospitalForDoctors, activeHospitalTabForDoctors);
        handleDepartmentSelectForDoctors(selectedDepartmentForDoctors, activeDepartmentTabForDoctors);
        setEditingDoctorId(null);
        setSuccessMessage('Doctor updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }else{
        setErrorMessage('Failed to update doctor');
        setEditingDoctorId(null);
      }
    }catch(error){
      console.error('Error updating doctor:', error);
      setErrorMessage('An error occurred while updating the doctor');
      setEditingDoctorId(null);
    }
  };

  //delete a doctor
  const handleDeleteDoctor = async (nrPersonal) => {
    try{
      await axios.delete(`http://localhost:3001/doctors/${nrPersonal}`);
      setDoctorsForDoctors(doctorsForDoctors.filter(doctor => doctor.nrPersonal !== nrPersonal));
      setDoctorsForPrescriptions(doctorsForPrescriptions.filter(doctor => doctor.nrPersonal !== nrPersonal));
      setSuccessMessage('Doctor deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }catch(error){
      console.error('Error deleting doctor:', error);
      setErrorMessage('An error occurred while deleting the doctor');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  
  //displaying patients in a hospital
  const [patientsForPatients, setPatientsForPatients] = useState([]);
  const [selectedHospitalForPatients, setSelectedHospitalForPatients] = useState(null);
  const [activeHospitalTabForPatients, setActiveHospitalTabForPatients] = useState('0');

  const handleHospitalSelectForPatients = async (hospital, tab) => {
    setSelectedHospitalForPatients(hospital);
    setActiveHospitalTabForPatients(tab);
    try{
      const response = await axios.get(`http://localhost:3001/hospitals/${hospital.nrRegjistrimit}/patients`);
      setPatientsForPatients(response.data);
    }catch(error){
      console.error('Error fetching patients:', error);
    }
  };

  //insert a patient into database
  const [newPatient, setNewPatient] = useState({ emri: '', mbriemri: '', nrPersonal: '', datelindja: '', gjinia: '', adresa: '', nrTel: '', hospitalId: '' });
  const [patientModal, setPatientModal] = useState(false);

  const togglePatientModal = () => setPatientModal(!patientModal);

  const fetchPatients = async () => {
    try{
      const response = await fetch("http://localhost:3001/patients");
      const data = await response.json();
      setPatientsForPatients(data);
    }catch(error){
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChangeForPatients = (e) => {
    if(e && e.target){
      const { name, value } = e.target;
      setNewPatient({ ...newPatient, [name]: value });
    }
  };

  const handleSubmitForPatients = async (e) => {
    e.preventDefault();
    const patientWithHospital = { ...newPatient, hospitalId: selectedHospitalForPatients.nrRegjistrimit };
    try{
      const response = await fetch("http://localhost:3001/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientWithHospital),
      });
      if(response.ok){
        togglePatientModal();
        handleHospitalSelectForPatients(selectedHospitalForPatients, activeHospitalTabForPatients);
        setNewPatient({ emri: "", mbriemri: "", nrPersonal: "", datelindja: "", gjinia: "", adresa: "", nrTel: "", hospitalId: "" });
      }else if(response.status === 400){
        const responseData = await response.json();
        setErrorMessageModal(`Failed to insert patient: ${responseData.error}`);
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }else{
        console.error("Failed to insert patient");
        setErrorMessageModal("Failed to insert patient: Unknown error occurred");
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }  
    }catch(error){
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
  const handleEditForPatients = (nrPersonal) => {
    const patient = patientsForPatients.find(pat => pat.nrPersonal === nrPersonal);
    setEditedPatient(patient);
    setEditingPatientId(nrPersonal);
  };  

  const handleEditInputChangeForPatients = (e) => {
    const { name, value } = e.target;
    setEditedPatient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveForPatients = async () => {
    try{
      const response = await axios.put(`http://localhost:3001/patients/${editingPatientId}`, editedPatient);
      if(response.status === 200){
        handleHospitalSelectForPatients(selectedHospitalForPatients, activeHospitalTabForPatients);
        setEditingPatientId(null);
        setSuccessMessage('Patient updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }else{
        setErrorMessage('Failed to update patient');
        setEditingPatientId(null);
      }
    }catch(error){
      console.error('Error updating patient:', error);
      setErrorMessage('An error occurred while updating the patient');
      setEditingPatientId(null);
    }
  };

  //delete a patient
  const handleDeletePatient = async (nrPersonal) => {
    try{
      await axios.delete(`http://localhost:3001/patients/${nrPersonal}`);
      setPatientsForPatients(patientsForPatients.filter(patient => patient.nrPersonal !== nrPersonal));
      setSuccessMessage('Patient deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }catch (error){
      console.error('Error deleting patient:', error);
      setErrorMessage('An error occurred while deleting the patient');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };


  //displaying staff in a department in a hospital
  const [staffForStaff, setStaffForStaff] = useState([]);
  const [departmentsForStaff, setDepartmentsForStaff] = useState([]);
  const [selectedHospitalForStaff, setSelectedHospitalForStaff] = useState(null);
  const [selectedDepartmentForStaff, setSelectedDepartmentForStaff] = useState(null);
  const [activeHospitalTabForStaff, setActiveHospitalTabForStaff] = useState('0');
  const [activeDepartmentTabForStaff, setActiveDepartmentTabForStaff] = useState('0');

  const handleHospitalSelectForStaff = async (hospital, tab) => {
    setSelectedHospitalForStaff(hospital);
    setActiveHospitalTabForStaff(tab);
    try{
      const response = await axios.get(`http://localhost:3001/hospitals/${hospital.nrRegjistrimit}/departments`);
      setDepartmentsForStaff(response.data);
    }catch (error){
      console.error('Error fetching departments:', error);
    }
  };

  const handleDepartmentSelectForStaff = async (department, tab) => {
    setSelectedDepartmentForStaff(department);
    setActiveDepartmentTabForStaff(tab);
    try{
      const response = await axios.get(`http://localhost:3001/hospitals/${selectedHospitalForStaff.nrRegjistrimit}/departments/${department.departmentID}/staff`);
      setStaffForStaff(response.data);
    }catch (error){
      console.error('Error fetching staff:', error);
    }
  };

  //insert a new staff member into database
  const [newStaff, setNewStaff] = useState({ emri: '', mbiemri: '', nrPersonal: '', pozita: '', adresa: '', nrTel: '', depID: '', dhoma: ''});
  const [staffModal, setStaffModal] = useState(false);
  const [roomsForStaff, setRoomsForStaff] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const toggleStaffModal = () => setStaffModal(!staffModal);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchDepartmentsForStaff = async (hospitalId) => {
    try{
      const response = await fetch(`http://localhost:3001/hospitals/${hospitalId}/departments`);
      const data = await response.json();
      setDepartmentsForStaff(data);
      setRoomsForStaff([]);
    }catch(error){
      console.error("Error fetching departments:", error);
    }
  };

  const fetchRoomsForStaff = async (departmentId) => {
    try{
      const response = await fetch(`http://localhost:3001/departments/${departmentId}/rooms`);
      const data = await response.json();
      setRoomsForStaff(data);
    }catch(error){
      console.error("Error fetching rooms:", error);
    }
  };

  const handleHospitalChangeForStaff = (selectedOption) => {
    setSelectedHospital(selectedOption);
    fetchDepartmentsForStaff(selectedOption.value);
    setNewStaff({ ...newStaff, hospitalName: selectedOption.label });
    setSelectedDepartment(null);
    setSelectedRoom(null);
  };

  const handleDepartmentChangeForStaff = (selectedOption) => {
    setSelectedDepartment(selectedOption);
    setNewStaff({ ...newStaff, departmentName: selectedOption.label });
    fetchRoomsForStaff(selectedOption.value);
    setSelectedRoom(null);
  };

  const handleRoomChangeForStaff = (selectedOption) => {
    setSelectedRoom(selectedOption);
    setNewStaff({ ...newStaff, dhomaNumri: selectedOption.label });
  };

  const fetchStaff = async () => {
    try{
      const response = await fetch("http://localhost:3001/staff");
      const data = await response.json();
      setStaffForStaff(data);
    }catch(error){
      console.error("Error fetching staff member:", error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleChangeForStaff = (e) => {
    if(e && e.target){
      const { name, value } = e.target;
      setNewStaff({ ...newStaff, [name]: value });
    }
  };

  const handleSubmitForStaff = async (e) => {
    e.preventDefault();
    const staffWithDepartment = {
      ...newStaff,
      depID: selectedDepartment.depID,
      dhoma: selectedRoom.roomID,
      departmentName: selectedDepartment.label,
      dhomaNumri: selectedRoom.label,
    };
    try{
      const response = await fetch("http://localhost:3001/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(staffWithDepartment),
      });
      if(response.ok){
        toggleStaffModal();
        handleDepartmentSelectForStaff(selectedDepartmentForStaff, activeDepartmentTabForStaff);
        fetchStaff();
        setNewStaff({ emri: "", mbiemri: "", nrPersonal: "", pozita: "", adresa: "", nrTel: "", depID: "", dhoma: ''});
        setSelectedHospital(null);
        setSelectedDepartment(null);
        setSelectedRoom(null);
      }else if(response.status === 400){
        const responseData = await response.json();
        setErrorMessageModal(`Failed to insert staff member: ${responseData.error}`);
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }else{
        console.error("Failed to insert staff member");
        setErrorMessageModal("Failed to insert staff member: Unknown error occurred");
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }  
    }catch(error){
      console.error("Error inserting staff member:", error);
    }
  };
  
  //edit a staff member
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [editedStaff, setEditedStaff] = useState({
    emri: "",
    mbiemri: "",
    pozita: "",
    adresa: "",
    nrTel: ""
  });

  //me tleju me editu faqja
  const handleEditForStaff = (nrPersonal) => {
    const staff = staffForStaff.find(staff => staff.nrPersonal === nrPersonal);
    setEditedStaff(staff);
    setEditingStaffId(nrPersonal);
  };  

  const handleEditInputChangeForStaff = (e) => {
    const { name, value } = e.target;
    setEditedStaff(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveForStaff = async () => {
    try{
      const response = await axios.put(`http://localhost:3001/staff/${editingStaffId}`, editedStaff);
      if(response.status === 200){
        fetchStaff();
        handleHospitalSelectForStaff(selectedHospitalForStaff, activeHospitalTabForStaff);
        handleDepartmentSelectForStaff(selectedDepartmentForStaff, activeDepartmentTabForStaff);
        setEditingStaffId(null);
        setSuccessMessage('Staff updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }else{
        setErrorMessage('Failed to update staff member');
        setEditingStaffId(null);
      }
    }catch(error){
      console.error('Error updating staff member:', error);
      setErrorMessage('An error occurred while updating the staff member');
      setEditingStaffId(null);
    }
  };

  //delete a staff member
  const handleDeleteStaff = async (nrPersonal) => {
    try{
      await axios.delete(`http://localhost:3001/staff/${nrPersonal}`);
      setStaffForStaff(staffForStaff.filter(staff => staff.nrPersonal !== nrPersonal));
      setSuccessMessage('Staff member deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }catch(error){
      console.error('Error deleting staff member:', error);
      setErrorMessage('An error occurred while deleting the staff member');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  //inserting a bill into database
  const [bills, setBills] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientsForBills,setPatientsForBills] = useState([]);
  const [newBill, setNewBill] = useState({ sherbimi: [], data: '', totali: 0, hospitalNrRegjistrimit: '', patientNrPersonal: '' });
  const [billModal, setBillModal] = useState(false);
  const [newService, setNewService] = useState('');
  const [servicePrices, setServicePrices] = useState({});

  const toggleBillModal = () => setBillModal(!billModal);

  useEffect(() => {
    const fetchServicePrices = async () => {
      try{
        const response = await fetch('http://localhost:3001/services');
        const data = await response.json();
        const prices = data.reduce((acc, service) => {
          acc[service.emri] = service.cmimi;
          return acc;
        }, {});
        setServicePrices(prices);
      }catch(error){
        console.error('Error fetching service prices:', error);
      }
    };

    fetchServicePrices();
  }, []);

  const addService = () => {
    const servicePrice = servicePrices[newService];
    if(servicePrice){
      setNewBill(prevState => ({
        ...prevState,
        sherbimi: [...prevState.sherbimi, { emri: newService, cmimi: servicePrice }],
        totali: prevState.totali + servicePrice,
      }));
    }else{
      console.error(`Price not found for service: ${newService}`);
    }
    setNewService('');
  };
  
  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchPatientsForBills = async (hospitalId) => {
    try{
      const response = await fetch(`http://localhost:3001/hospitals/${hospitalId}/patients`);
      const data = await response.json();
      setPatientsForBills(data);
    }catch(error){
      console.error("Error fetching patients:", error);
    }
  };

  const handleHospitalChangeForBills = async (selectedOption) => {
    setSelectedHospital(selectedOption);
    setSelectedPatient(null);
    setNewBill({ ...newBill, hospitalName: selectedOption.label, patientNrPersonal: '' });
    fetchPatientsForBills(selectedOption.value);
  };

  const handlePatientChangeForBills = (selectedOption) => {
    const selectedPatient = patientsForBills.find(p => p.nrPersonal === selectedOption.value);
    setSelectedPatient(selectedPatient);
    
    const fullName = `${selectedPatient.emri} ${selectedPatient.mbiemri}`;
    setNewBill({ ...newBill, patientName: fullName });
  };  

  const fetchBills = async () => {
    try{
      const response = await fetch("http://localhost:3001/bills");
      const data = await response.json();
      setBills(data);
    }catch(error){
      console.error("Error fetching bills:", error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handleChangeForBills = (e) => {
    if(e && e.target){
      const { name, value } = e.target;
      setNewBill({ ...newBill, [name]: value });
    }
  };

  const handleSubmitForBills = async (e) => {
    e.preventDefault();
    const billWithDoctor = {
      ...newBill,
      patientNrPersonal: selectedPatient.nrPersonal,
      hospitalNrRegjistrimit: selectedHospital.value,
      patientName: `${selectedPatient.emri} ${selectedPatient.mbiemri}`,
    };
    try{
      const response = await fetch("http://localhost:3001/bills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billWithDoctor),
      });

      if(response.ok){
        toggleBillModal();
        setNewBill({ sherbimi: [], data: "", totali: "", hospitalNrRegjistrimit: "", patientNrPersonal: "" });
        fetchBills();
        setSelectedHospital(null);
        setSelectedPatient(null);
      }else if(response.status === 400){
        const responseData = await response.json();
        setErrorMessageModal(`Failed to insert bill: ${responseData.error}`);
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }else{
        console.error("Failed to insert bill");
        setErrorMessageModal("Failed to insert bill: Unknown error occurred");
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }
    }catch(error){
      console.error("Error inserting doctor:", error);
    }
  };

  //edit a bill
  const [editingBillId, setEditingBillId] = useState(null);
  const [editedBill, setEditedBill] = useState({
    sherbimi: "",
    data: "",
    totali: "",
  });

  //me tleju me editu faqja
  const handleEditForBills = (billID) => {
    const bill = bills.find(b => b.billID === billID);
    setEditedBill(bill);
    setEditingBillId(billID);
  };  

  const handleEditInputChangeForBills = (e) => {
    const { name, value } = e.target;
    setEditedBill(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveForBills = async () => {
    try{
      const response = await axios.put(`http://localhost:3001/bills/${editingBillId}`, editedBill);
      if(response.status === 200){
        setEditingBillId(null);
        fetchBills();
        setSuccessMessage('Bill updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }else{
        setErrorMessage('Failed to update bill');
        setEditingBillId(null);
      }
    }catch(error){
      console.error('Error updating bill:', error);
      setErrorMessage('An error occurred while updating the bill');
      setEditingBillId(null);
    }
  };

  useEffect(() => {
    const fetchBills = async () => {
      try{
        const response = await fetch("http://localhost:3001/bills");
        const data = await response.json();
        setBills(data);
      }catch(error){
        console.error("Error fetching bills:", error);
      }
    };
    fetchBills();
  }, []);
  
  //delete a bill
  const handleDeleteBill = async (billID) => {
    try{
      await axios.delete(`http://localhost:3001/bills/${billID}`);
      setBills(bills.filter(bill => bill.billID !== billID));
      setSuccessMessage('Bill deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }catch(error){
      console.error('Error deleting bill:', error);
      setErrorMessage('An error occurred while deleting the bill');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };


  //displaying appointments by date
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [departmentsForAppointments, setDepartmentsForAppointments] = useState([]);
  const [selectedHospitalForAppointments, setSelectedHospitalForAppointments] = useState(null);
  const [selectedDepartmentForAppointments, setSelectedDepartmentForAppointments] = useState(null);
  const [activeHospitalTabForAppointments, setActiveHospitalTabForAppointments] = useState('0');
  const [activeDepartmentTabForAppointments, setActiveDepartmentTabForAppointments] = useState('0'); 

  const handleHospitalSelectForAppointments = async (hospital, tab) => {
    setSelectedHospitalForAppointments(hospital);
    setActiveHospitalTabForAppointments(tab);
    try{
      const response = await axios.get(`http://localhost:3001/hospitals/${hospital.nrRegjistrimit}/departments`);
      setDepartmentsForAppointments(response.data);
    }catch(error){
      console.error('Error fetching departments:', error);
      setErrorMessage('An error occurred while fetching departments');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleDepartmentSelectForAppointments = async (department, tab) => {
    setSelectedDepartmentForAppointments(department);
    setActiveDepartmentTabForAppointments(tab);
    try{
      const response = await axios.get(`http://localhost:3001/hospitals/${selectedHospitalForStaff.nrRegjistrimit}/departments/${department.departmentID}/appointments`);
      setAppointments(response.data);
    }catch(error){
        console.error('Error fetching appointments:', error);
        setErrorMessage('An error occurred while fetching ');
        setTimeout(() => {
            setErrorMessage(null);
        }, 3000);
    }
  };
  
  const handleFetchAppointmentsByDate = async (date, departmentID) => {
    try{
        const formattedDate = moment(date).tz('Europe/Tirane').format('YYYY-MM-DD');
        let url = `http://localhost:3001/appointments?date=${formattedDate}`;
        if(departmentID){
            url += `&departmentID=${departmentID}`;
        }
        const response = await axios.get(url);

        const sortedAppointments = response.data.sort((a, b) => {
            const dateA = moment.tz(`${a.data}T${a.ora}`, 'Europe/Tirane').toDate();
            const dateB = moment.tz(`${b.data}T${b.ora}`, 'Europe/Tirane').toDate();
            return dateA - dateB;
        });

        setAppointments(sortedAppointments);
    }catch(error){
        console.error('Error fetching appointments:', error);
        setErrorMessage('An error occurred while fetching appointments');
        setTimeout(() => {
            setErrorMessage(null);
        }, 3000);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleFetchAppointmentsByDate(date, selectedDepartmentForAppointments ? selectedDepartmentForAppointments.departmentID : null);
  };

  //inserting an appointment
  const [newAppointment, setNewAppointment] = useState({ data: '', ora: '', patientNrPersonal: '', doctorNrPersonal: '', departmentID: ''});
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [patientsForAppointments,setPatientsForAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorsForAppointments, setDoctorsForAppointments] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDateForInsert, setSelectedDateForInsert] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const toggleAppointmentModal = () => setAppointmentModal(!appointmentModal);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchPatientsForAppointments = async (hospitalId) => {
    try{
      const response = await fetch(`http://localhost:3001/hospitals/${hospitalId}/patients`);
      const data = await response.json();
      setPatientsForAppointments(data);
    }catch(error){
      console.error("Error fetching patients:", error);
    }
  };

  const fetchDepartmentsForAppointments = async (hospitalId) => {
    try{
      const response = await fetch(`http://localhost:3001/hospitals/${hospitalId}/departments`);
      const data = await response.json();
      setDepartmentsForAppointments(data);
    }catch(error){
      console.error("Error fetching departments:", error);
    }
  };

  const fetchDoctorsForAppointments = async (depID) => {
    try{
      const response = await fetch(`http://localhost:3001/departments/${depID}/doctors`);
      const data = await response.json();
      setDoctorsForAppointments(data);
    }catch(error){
      console.error("Error fetching patients:", error);
    }
  };

  const handleHospitalChangeForAppointments = (selectedOption) => {
    setSelectedHospital(selectedOption);
    fetchDepartmentsForAppointments(selectedOption.value);
    fetchPatientsForAppointments(selectedOption.value);
    setNewAppointment({ ...newAppointment, hospitalName: selectedOption.label });
    setSelectedDepartment(null);
    setSelectedPatient(null);
    setSelectedDoctor(null);
  };

  const handleDepartmentChangeForAppointments = (selectedOption) => {
    setSelectedDepartment(selectedOption);
    fetchDoctorsForAppointments(selectedOption.value);
    setNewAppointment({ ...newAppointment, departmentName: selectedOption.label });
    setSelectedDoctor(null);
    setSelectedPatient(null);
  };

  const handlePatientChangeForAppointments = (selectedOption) => {
    const selectedPatient = patientsForAppointments.find(p => p.nrPersonal === selectedOption.value);
    setSelectedPatient(selectedPatient);
    
    const fullName = `${selectedPatient.emri} ${selectedPatient.mbiemri}`;
    
    setNewAppointment({ ...newAppointment, patientName: fullName });
  };

  const handleDoctorChangeForAppointments = async (selectedOption) => {
    const selectedDoctor = doctorsForAppointments.find(p => p.nrPersonal === selectedOption.value);
    setSelectedDoctor(selectedDoctor);

    const fullName = `${selectedDoctor.emri} ${selectedDoctor.mbiemri}`;

    setNewAppointment({ ...newAppointment, doctorName: fullName });
    setSelectedTime(null);
  };

  const handleDateToInsert = async (selectedOption) => {
    setSelectedDateForInsert(selectedOption);
    setSelectedTime(null);
    setNewAppointment({ ...newAppointment, data: selectedOption });
};

  const handleTimeChange = (selectedOption) => {
    setSelectedTime(selectedOption);
    setNewAppointment({ ...newAppointment, ora: selectedOption.value });
  };

  const fetchAvailableTimeSlots = async (date, doctorId) => {
    try{
        const formattedDate = moment(date).format('YYYY-MM-DD');
        const response = await fetch(`http://localhost:3001/appointments/availability?date=${formattedDate}&doctor=${doctorId}`);
        const data = await response.json();
        return data.availableTimeSlots;
    }catch(error){
        console.error('Error fetching available time slots:', error);
        return [];
    }
  };

  const fetchAppointments = async () => {
    try{
      const response = await fetch("http://localhost:3001/appointments");
      const data = await response.json();
      setAppointments(data);
    }catch(error){
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    const fetchTimeSlots = async () => {
        if(selectedDateForInsert && selectedDoctor){
            const slots = await fetchAvailableTimeSlots(selectedDateForInsert, selectedDoctor.nrPersonal);
            setAvailableTimeSlots(slots);
        }
    };
    fetchTimeSlots();
  }, [selectedDateForInsert, selectedDoctor]);

  // useEffect(() => {
  //   fetchAppointments();
  // }, []);

  // const handleChangeForAppointments = (e) => {
  //   if(e && e.target){
  //     const { name, value } = e.target;
  //     if(name === "ora"){
  //       setSelectedTime(value); // Update selectedTime directly
  //     }
  //     setNewAppointment({ ...newAppointment, [name]: value });
  //   }
  // };

  const handleSubmitForAppointments = async (e) => {
    e.preventDefault();
    const appointment = {
      ...newAppointment,
      data: moment(selectedDateForInsert).format('YYYY-MM-DD'),
      ora: selectedTime.value,
      departmentID: selectedDepartment.departmentID,
      departmentName: selectedDepartment.label,
      patientNrPersonal: selectedPatient.nrPersonal,
      patientName: `${selectedPatient.emri} ${selectedPatient.mbiemri}`,
      doctorNrPersonal: selectedDoctor.nrPersonal,
      doctorName: `${selectedDoctor.emri} ${selectedDoctor.mbiemri}`,
    };
    try{
      const response = await fetch("http://localhost:3001/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      });
      if(response.ok){
        toggleAppointmentModal();
        handleDepartmentSelectForAppointments(selectedDepartmentForAppointments, activeDepartmentTabForAppointments);
        handleFetchAppointmentsByDate(selectedDate, selectedDepartmentForAppointments ? selectedDepartmentForAppointments.departmentID : null);
        // fetchAppointments();
        setNewAppointment({ data: '', ora: '', patientNrPersonal: '', doctorNrPersonal: '', departmentID: ''});
        setSelectedHospital(null);
        setSelectedDepartment(null);
        setSelectedPatient(null);
        setSelectedDoctor(null);
        setSelectedTime(null);
      }else if(response.status === 400){
        const responseData = await response.json();
        setErrorMessageModal(`Failed to insert appointment: ${responseData.error}`);
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }else{
        console.error("Failed to insert appointment");
        setErrorMessageModal("Failed to insert appointment: Unknown error occurred");
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }  
    }catch(error){
      console.error("Error inserting appointment:", error);
    }
  };
  
  //edit an appointment
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [editedAppointment, setEditedAppointment] = useState({
    data: "",
    ora: "",
  });

  //me tleju me editu faqja
  const handleEditForAppointments = (appointmentID) => {
    const appointment = appointments.find(app => app.appointmentID === appointmentID);
    setEditedAppointment(appointment);
    setEditingAppointmentId(appointmentID);
  };

  const handleEditInputChangeForAppointments = (e) => {
    const { name, value } = e.target;
    setEditedAppointment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveForAppointments = async () => {
    try{
      const response = await axios.put(`http://localhost:3001/appointments/${editingAppointmentId}`, editedAppointment);
      if(response.status === 200){
        fetchAppointments();
        handleHospitalSelectForAppointments(selectedHospitalForAppointments, activeHospitalTabForAppointments);
        handleDepartmentSelectForAppointments(selectedDepartmentForAppointments, activeDepartmentTabForAppointments);
        setEditingAppointmentId(null);
        setSuccessMessage('Appointment updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }else{
        setErrorMessage('Failed to update appointment');
        setEditingAppointmentId(null);
      }
    }catch(error){
      console.error('Error updating appointment:', error);
      setErrorMessage('An error occurred while updating the appointment');
      setEditingAppointmentId(null);
    }
  };

  //delete an appointment
  const handleDeleteAppointment = async (appointmentID) => {
    try{
      await axios.delete(`http://localhost:3001/appointments/${appointmentID}`);
      setAppointments(appointments.filter(appointment => appointment.appointmentID !== appointmentID));
      setSuccessMessage('Appointment deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }catch(error){
      console.error('Error deleting appointment:', error);
      setErrorMessage('An error occurred while deleting the appointment');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };


  //delete a room
  const [rooms, setRooms] = useState([]);

  const handleDeleteRoom = async (roomID) => {
    try{
      await axios.delete(`http://localhost:3001/rooms/${roomID}`);
      setRooms(rooms.filter(room => room.roomID !== roomID));
      setSuccessMessage('Room deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }catch(error){
      console.error('Error deleting room:', error);
      setErrorMessage('An error occurred while deleting the room');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };


  //displaying prescriptions dropped by doctors
  const [prescriptions, setPrescriptions] = useState([]);
  const [doctorsForPrescriptions, setDoctorsForPrescriptions] = useState([]);
  const [selectedDoctorForPrescriptions, setSelectedDoctorForPrescriptions] = useState(null);
  const [activeDoctorTabForPrescriptions, setActiveDoctorTabForPrescriptions] = useState('0');

  const handleDoctorSelectForPrescriptions = async (doctor, tab) => {
    setSelectedDoctorForPrescriptions(doctor);
    setActiveDoctorTabForPrescriptions(tab);
    try{
      const response = await axios.get(`http://localhost:3001/doctors/${doctor.nrPersonal}/prescriptions`);
      setPrescriptions(response.data);
    }catch(error){
      console.error('Error fetching prescriptions:', error);
    }
  };

  //delete a prescription
  const handleDeletePrescription = async (prescriptionID) => {
    try{
      await axios.delete(`http://localhost:3001/prescriptions/${prescriptionID}`);
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
    //display hospitals
    axios.get("http://localhost:3001/hospitals/")
      .then(response => {
        setHospitals(response.data);
        // Set initial tabs here
        if(response.data.length > 0){
          handleHospitalSelectForDepartments(response.data[0], "0");
          handleHospitalSelectForDoctors(response.data[0], "0");
          handleHospitalSelectForPatients(response.data[0], "0");
          handleHospitalSelectForStaff(response.data[0], "0");
          handleHospitalSelectForAppointments(response.data[0], "0");
        }
      })
      .catch(error => {
        console.error('Error fetching hospitals:', error);
      });

      axios.get("http://localhost:3001/bills/")
      .then(response => {
        setBills(response.data);
      })
      .catch(error => {
        console.error('Error fetching bills:', error);
      });

      axios.get("http://localhost:3001/rooms/")
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching rooms:', error);
      });

      axios.get("http://localhost:3001/doctors/")
      .then(response => {
        setDoctorsForDoctors(response.data);
        setDoctorsForPrescriptions(response.data);
        if(response.data.length > 0){
          handleDoctorSelectForPrescriptions(response.data[0], "0");
        }
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });

      handleFetchAppointmentsByDate(new Date());
  }, []);

  useEffect(() => {
    if(departmentsForDoctors.length > 0){
      handleDepartmentSelectForDoctors(departmentsForDoctors[0], "0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentsForDoctors]);

  useEffect(() => {
    if(departmentsForStaff.length > 0){
      handleDepartmentSelectForStaff(departmentsForStaff[0], "0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentsForStaff]);

  useEffect(() => {
    if(departmentsForAppointments.length > 0){
      handleDepartmentSelectForAppointments(departmentsForAppointments[0], '0');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentsForAppointments]);

  useEffect(() => {
    handleFetchAppointmentsByDate(selectedDate, selectedDepartmentForAppointments ? selectedDepartmentForAppointments.departmentID : null);
  }, [selectedDate, selectedDepartmentForAppointments]);


  //kur ndrron data
  //   const [filteredAppointments, setFilteredAppointments] = useState([]);
  // useEffect(() => {
  //   const filtered = appointments.filter(appointment => {
  //     return appointment.data === selectedDate.toISOString().slice(0, 10);
  //   });
  //   setFilteredAppointments(filtered);
  // }, [selectedDate, appointments]);

  const hospitalOptions = hospitals.map(hospital => ({
    value: hospital.emri,
    label: hospital.emri
  }));

  return{
    hospitalOptions,
    selectedHospital,
    selectedDepartment,
    selectedRoom,
    selectedPatient,
    successMessage,
    errorMessage,
    errorMessageModal,
    setSuccessMessage,
    setErrorMessage,
    setSelectedDepartment,

    hospitals,
    newHospital,
    hospitalModal,
    editedHospital,
    editingHospitalId,
    toggleHospitalModal,
    handleChangeForHospitals,
    handleSubmitForHospitals,
    handleEditForHospitals,
    handleSaveForHospitals,
    handleEditInputChangeForHospitals,
    handleDeleteHospital,

    departmentsForDepartments,
    newDepartment,
    departmentModal,
    editedDepartment,
    editingDepartmentId,
    selectedHospitalForDepartments,
    activeHospitalTabForDepartments,
    toggleDepartmentModal,
    handleHospitalSelectForDepartments,
    handleChangeForDepartments,
    handleSubmitForDepartments,
    handleEditForDepartments,
    handleEditInputChangeForDepartments,
    handleSaveForDepartments,
    handleDeleteDepartment,

    doctorsForDoctors,
    newDoctor,
    doctorModal,
    specializations,
    editedDoctor,
    editingDoctorId,
    departmentsForDoctors,
    selectedHospitalForDoctors,
    selectedDepartmentForDoctors,
    activeHospitalTabForDoctors,
    activeDepartmentTabForDoctors,
    toggleDoctorModal,
    setNewDoctor,
    handleHospitalSelectForDoctors,
    handleDepartmentSelectForDoctors,
    handleChangeForDoctors,
    handleHospitalChangeForDoctors,
    handleDepartmentChangeForDoctors,
    handleSubmitForDoctors,
    handleEditForDoctors,
    handleEditInputChangeForDoctors,
    handleSaveForDoctors,
    handleDeleteDoctor,

    patientsForPatients,
    newPatient,
    patientModal,
    editedPatient,
    editingPatientId,
    selectedHospitalForPatients,
    activeHospitalTabForPatients,
    handleHospitalSelectForPatients,
    handleChangeForPatients,
    handleSubmitForPatients,
    handleEditForPatients,
    handleEditInputChangeForPatients,
    handleSaveForPatients,
    togglePatientModal,
    handleDeletePatient,

    staffForStaff,
    newStaff,
    staffModal,
    editedStaff,
    editingStaffId,
    departmentsForStaff,
    roomsForStaff,
    selectedHospitalForStaff,
    selectedDepartmentForStaff,
    activeHospitalTabForStaff,
    activeDepartmentTabForStaff,
    toggleStaffModal,
    setNewStaff,
    handleHospitalSelectForStaff,
    handleDepartmentSelectForStaff,
    handleChangeForStaff,
    handleHospitalChangeForStaff,
    handleDepartmentChangeForStaff,
    handleRoomChangeForStaff,
    handleSubmitForStaff,
    handleEditForStaff,
    handleEditInputChangeForStaff,
    handleSaveForStaff,
    handleDeleteStaff,

    bills,
    patientsForBills,
    newBill,
    servicePrices,
    billModal,
    editedBill,
    editingBillId,
    toggleBillModal,
    addService,
    setNewService,
    handleHospitalChangeForBills,
    handlePatientChangeForBills,
    handleChangeForBills,
    handleSubmitForBills,
    handleEditForBills,
    handleEditInputChangeForBills,
    handleSaveForBills,
    handleDeleteBill,

    appointments,
    newAppointment,
    appointmentModal,
    selectedDoctor,
    editedAppointment,
    editingAppointmentId,
    departmentsForAppointments,
    patientsForAppointments,
    doctorsForAppointments,
    selectedDate,
    selectedDateForInsert,
    selectedTime,
    availableTimeSlots,
    selectedDepartmentForAppointments,
    selectedHospitalForAppointments,
    activeHospitalTabForAppointments,
    activeDepartmentTabForAppointments,
    toggleAppointmentModal,
    handleTimeChange,
    handleFetchAppointmentsByDate,
    handleDateChange,
    handleHospitalSelectForAppointments,
    handleDepartmentSelectForAppointments,
    handleHospitalChangeForAppointments,
    handleDepartmentChangeForAppointments,
    handlePatientChangeForAppointments,
    handleDoctorChangeForAppointments,
    handleDateToInsert,
    handleSubmitForAppointments,
    handleEditForAppointments,
    handleEditInputChangeForAppointments,
    handleSaveForAppointments,
    handleDeleteAppointment,

    rooms,
    handleDeleteRoom,

    prescriptions,
    doctorsForPrescriptions,
    selectedDoctorForPrescriptions,
    activeDoctorTabForPrescriptions,
    handleDoctorSelectForPrescriptions ,
    handleDeletePrescription,
  };
};