import { useState, useEffect } from "react";
import axios from "axios";

export const useTableList = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  //hospitals
  const [hospitals, setHospitals] = useState([]);
  const [newHospital, setNewHospital] = useState({ emri: "", adresa: "", nrTel: "" });

  const fetchHospitals = async () => {
    try{
      const response = await fetch("http://localhost:3001/hospitals");
      const data = await response.json();
      setHospitals(data);
    }catch(error){
      console.error("Error fetching hospitals:", error);
    }
  };

  //insert new hospital into database
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
        fetchHospitals(); // Refresh the hospitals list after successful insertion
        setNewHospital({ emri: "", adresa: "", nrTel: "" }); // Clear the form
      }else{
        console.error("Failed to insert hospital");
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
      }
    }catch (error){
      console.error('Error updating hospital:', error);
      setErrorMessage('An error occurred while updating the hospital');
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
    try {
      const response = await axios.get(`http://localhost:3001/hospitals/${hospital.nrRegjistrimit}/departments`);
      setDepartmentsForDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  //insert new department into database
  const [newDepartment, setNewDepartment] = useState({ emri: '', lokacioni: '', nrTel: '', hospitalId: '' });
  const fetchDepartments = async () => {
    try{
      const response = await fetch("http://localhost:3001/departments");
      const data = await response.json();
      setDepartmentsForDepartments(data);
      setDepartmentsForDoctors(data);
      setDepartmentsForStaff(data);
      setDepartmentsForAppointments(data);
    }catch(error){
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChangeForDepartments = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setNewDepartment({ ...newDepartment, [name]: value });
    }
  };

  const handleSubmitForDepartments = async (e) => {
    e.preventDefault();
    const departmentWithHospital = { ...newDepartment, hospitalId: selectedHospitalForDepartments.nrRegjistrimit };
    try {
      const response = await fetch("http://localhost:3001/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(departmentWithHospital),
      });
      if (response.ok) {
        handleHospitalSelectForDepartments(selectedHospitalForDepartments, activeHospitalTabForDepartments);
        setNewDepartment({ emri: "", lokacioni: "", nrTel: "", hospitalId: "" });
      } else {
        console.error("Failed to insert department");
      }
    } catch (error) {
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
    try {
      const response = await axios.put(`http://localhost:3001/departments/${editingDepartmentId}`, editedDepartment);
      if (response.status === 200) {
        handleHospitalSelectForDepartments(selectedHospitalForDepartments, activeHospitalTabForDepartments);
        setEditingDepartmentId(null);
        setSuccessMessage('Department updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        setErrorMessage('Failed to update department');
      }
    } catch (error) {
      console.error('Error updating department:', error);
      setErrorMessage('An error occurred while updating the department');
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


  const [newDoctor, setNewDoctor] = useState({ emri: '', mbiemri: '', adresa: '', nrTel: '', specializimi: '', depID: '' });
  const fetchDoctors = async () => {
    try{
      const response = await fetch("http://localhost:3001/doctors");
      const data = await response.json();
      setDoctorsForDoctors(data);
      setDoctorsForPrescriptions(data);
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
    const doctorWithDepartment = { ...newDoctor, depID: selectedDepartmentForDoctors.depID };
    try {
      const response = await fetch("http://localhost:3001/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorWithDepartment),
      });
      if (response.ok) {
        handleDepartmentSelectForDoctors(selectedDepartmentForDoctors, activeDepartmentTabForDoctors);
        setNewDoctor({ emri: "", mbiemri: "", adresa: "", nrTel: "", specializimi: "", depID: "" });
      } else {
        console.error("Failed to insert doctor");
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
    try {
      const response = await axios.put(`http://localhost:3001/doctors/${editingDoctorId}`, editedDoctor);
      if (response.status === 200) {
        handleHospitalSelectForDoctors(selectedHospitalForDoctors, activeHospitalTabForDoctors);
        handleDepartmentSelectForDoctors(selectedDepartmentForDoctors, activeDepartmentTabForDoctors);
        setEditingDoctorId(null);
        setSuccessMessage('Doctor updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        setErrorMessage('Failed to update doctor');
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
      setErrorMessage('An error occurred while updating the doctor');
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
      const response = await axios.get(`http://localhost:3001/hospitals/${selectedHospitalForStaff.nrRegjistrimit}/departments/${department.departmentID}/staffs`);
      setStaffForStaff(response.data);
    }catch (error){
      console.error('Error fetching staff:', error);
    }
  };

  //delete a staff member
  const handleDeleteStaff = async (nrPersonal) => {
    try{
      await axios.delete(`http://localhost:3001/staffs/${nrPersonal}`);
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

  
  //delete a bill
  const [bills, setBills] = useState([]);
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
    try {
      const response = await axios.get(`http://localhost:3001/hospitals/${hospital.nrRegjistrimit}/departments`);
      setDepartmentsForAppointments(response.data);
    } catch (error) {
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
    try {
        const roomAppointmentsResponse = await axios.get(`http://localhost:3001/hospitals/${selectedHospitalForAppointments.nrRegjistrimit}/departments/${department.departmentID}/appointments`, {
            params: {
                date: selectedDate
            }
        });
        setAppointments(roomAppointmentsResponse.data);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        setErrorMessage('An error occurred while fetching appointments');
        setTimeout(() => {
            setErrorMessage(null);
        }, 3000);
    }
  };
  
  const handleFetchAppointmentsByDate = async (date) => {
    try {
      const formattedDate = date.toISOString().split('T')[0]; // Format the date as 'YYYY-MM-DD'
      const response = await axios.get(`http://localhost:3001/appointments?date=${formattedDate}`);
      
      // Sort appointments by time
      const sortedAppointments = response.data.sort((a, b) => {
        const timeA = new Date(`1970-01-01T${a.ora}`);
        const timeB = new Date(`1970-01-01T${b.ora}`);
        return timeA - timeB; // Compare times
      });
      setAppointments(sortedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setErrorMessage('An error occurred while fetching appointments');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleFetchAppointmentsByDate(date);
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


  //kur ndrron data
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
// useEffect(() => {
//   const filtered = appointments.filter(appointment => {
//     return appointment.data === selectedDate.toISOString().slice(0, 10);
//   });
//   setFilteredAppointments(filtered);
// }, [selectedDate, appointments]);

  const optionsForDepartments = hospitals.map(hospital => ({
    value: hospital.emri,
    label: hospital.emri
  }));

  const optionsForDoctors = departmentsForDepartments.map(department => ({
    value: department.emri,
    label: department.emri
  }));

  // const [selectedHospital, setSelectedHospital] = useState('');
  // const [selectedDepartment, setSelectedDepartment] = useState('');

  // const handleHospitalChangeForDoctors = (e) => {
  //   setSelectedHospital(e.target.value);
  // };

  // const handleDepartmentChangeForDoctors = (e) => {
  //   setSelectedDepartment(e.target.value);
  // };

  return{
    successMessage,
    errorMessage,

    hospitals,
    newHospital,
    editedHospital,
    editingHospitalId,
    handleChangeForHospitals,
    handleSubmitForHospitals,
    handleEditForHospitals,
    handleSaveForHospitals,
    handleEditInputChangeForHospitals,
    handleDeleteHospital,

    departmentsForDepartments,
    newDepartment,
    editedDepartment,
    editingDepartmentId,
    selectedHospitalForDepartments,
    activeHospitalTabForDepartments,
    optionsForDepartments,
    handleHospitalSelectForDepartments,
    handleChangeForDepartments,
    handleSubmitForDepartments,
    handleEditForDepartments,
    handleEditInputChangeForDepartments,
    handleSaveForDepartments,
    handleDeleteDepartment,

    doctorsForDoctors,
    newDoctor,
    editedDoctor,
    editingDoctorId,
    departmentsForDoctors,
    selectedHospitalForDoctors,
    selectedDepartmentForDoctors,
    activeHospitalTabForDoctors,
    activeDepartmentTabForDoctors,
    optionsForDoctors,
    // selectedDepartment,
    // selectedHospital,
    handleHospitalSelectForDoctors,
    handleDepartmentSelectForDoctors,
    handleChangeForDoctors,
    handleSubmitForDoctors,
    handleEditForDoctors,
    handleEditInputChangeForDoctors,
    handleSaveForDoctors,
    // handleHospitalChangeForDoctors,
    // handleDepartmentChangeForDoctors,
    handleDeleteDoctor,

    patientsForPatients,
    selectedHospitalForPatients,
    activeHospitalTabForPatients,
    handleHospitalSelectForPatients,
    handleDeletePatient,

    staffForStaff,
    departmentsForStaff,
    selectedHospitalForStaff,
    selectedDepartmentForStaff,
    activeHospitalTabForStaff,
    activeDepartmentTabForStaff,
    handleHospitalSelectForStaff,
    handleDepartmentSelectForStaff,
    handleDeleteStaff,

    bills,
    handleDeleteBill,


    appointments,
    departmentsForAppointments,
    selectedDate,
    selectedDepartmentForAppointments,
    selectedHospitalForAppointments,
    activeHospitalTabForAppointments,
    activeDepartmentTabForAppointments,
    handleFetchAppointmentsByDate,
    handleDateChange,
    handleHospitalSelectForAppointments,
    handleDepartmentSelectForAppointments,
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