import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAdmins = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessageModal, setErrorMessageModal] = useState(null);
    const [hospitals, setHospitals] = useState([]);

    //displaying admins in a hospital
    const [admins, setAdmins] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [activeHospitalTab, setActiveHospitalTab] = useState('0');

    const handleHospitalSelect = async (hospital, tab) => {
        setSelectedHospital(hospital);
        setActiveHospitalTab(tab);
        try {
            const response = await axios.get(`http://localhost:3001/hospitals/${hospital.nrRegjistrimit}/administrators`);
            setAdmins(response.data);
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    };

    //insert a admin into database
    const [newAdmin, setNewAdmin] = useState({ emri: '', mbriemri: '', nrPersonal: '', datelindja: '', adresa: '', nrTel: '', email: '', password: '', hospitalNrRegjistrimit: '' });
    const [adminModal, setAdminModal] = useState(false);

    const toggleAdminModal = () => setAdminModal(!adminModal);

    const fetchAdmins = async () => {
        try {
            const response = await fetch("http://localhost:3001/administrators");
            const data = await response.json();
            setAdmins(data);
        } catch (error) {
            console.error("Error fetching admins:", error);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleChange = (e) => {
        if (e && e.target) {
            const { name, value } = e.target;
            setNewAdmin({ ...newAdmin, [name]: value });
        }
    };

    const handleHospitalChange = (selectedOption) => {
        setNewAdmin({ ...newAdmin, hospitalNrRegjistrimit: selectedOption.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adminWithHospital = { ...newAdmin };
        try {
            const response = await fetch("http://localhost:3001/administrators", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(adminWithHospital),
            });
            if (response.ok) {
                toggleAdminModal();
                handleHospitalSelect(selectedHospital, activeHospitalTab);
                setNewAdmin({ emri: "", mbriemri: "", nrPersonal: "", datelindja: "", adresa: "", nrTel: "", email: '', password: '', hospitalNrRegjistrimit: "" });
                fetchAdmins();
            } else if (response.status === 400) {
                const responseData = await response.json();
                setErrorMessageModal(`Failed to insert admin: ${responseData.error}`);
                setTimeout(() => {
                    setErrorMessageModal(null);
                }, 3000);
            } else {
                console.error("Failed to insert admin");
                setErrorMessageModal("Failed to insert admin: Unknown error occurred");
                setTimeout(() => {
                    setErrorMessageModal(null);
                }, 3000);
            }
        } catch (error) {
            console.error("Error inserting admin:", error);
        }
    };

    //edit a admin
    const [editingAdminId, setEditingAdminId] = useState(null);
    const [editedAdmin, setEditedAdmin] = useState({
        emri: "",
        mbiemri: "",
        datelindja: "",
        adresa: "",
        nrTel: "",
        email: "",
        password: ""
    });

    //me tleju me editu faqja
    const handleEdit = (nrPersonal) => {
        const admin = admins.find(pat => pat.nrPersonal === nrPersonal);
        setEditedAdmin(admin);
        setEditingAdminId(nrPersonal);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAdmin(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancelEdit = () => {
        setEditingAdminId(null);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/administrators/${editingAdminId}`, editedAdmin);
            if (response.status === 200) {
                handleHospitalSelect(selectedHospital, activeHospitalTab);
                setEditingAdminId(null);
                fetchAdmins();
                setSuccessMessage('Admin updated successfully');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            } else {
                const errorMessage = response.data.error || 'Failed to update admin: Unknown error occurred';
                setErrorMessage(errorMessage);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000);
                setEditingAdminId(null);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(`Failed to update admin: ${error.response.data.error}`);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000);
            } else {
                setErrorMessage('An error occurred while updating the admin');
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000);
            }
            setEditingAdminId(null);
        }
    };


    //delete a admin
    const handleDeleteAdmin = async (nrPersonal) => {
        try {
            await axios.delete(`http://localhost:3001/administrators/${nrPersonal}`);
            setAdmins(admins.filter(admin => admin.nrPersonal !== nrPersonal));
            setSuccessMessage('Admin deleted successfully');
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error deleting admin:', error);
            setErrorMessage('An error occurred while deleting the admin');
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

    const hospitalOptions = hospitals.map(hospital => ({
        value: hospital.nrRegjistrimit,
        label: hospital.emri
    }));

    return {
        hospitals,
        admins,
        newAdmin,
        adminModal,
        editedAdmin,
        editingAdminId,
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
        toggleAdminModal,
        handleDeleteAdmin,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    };
};