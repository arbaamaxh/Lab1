import { useState, useEffect } from "react";
import axios from "axios";

export const useDepartments = () => {
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [newDepartment, setNewDepartment] = useState({
    emri: "",
    lokacioni: "",
    nrTel: "",
  });
  const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  const [editedDepartment, setEditedDepartment] = useState({
    emri: "",
    lokacioni: "",
    nrTel: "",
  });

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("http://localhost:3001/hospitals");
        setHospitals(response.data);
        if (response.data.length > 0) {
          setSelectedHospital(response.data[0]);
        }
      } catch (error) {
        console.error("There was an error fetching the hospitals!", error);
      }
    };

    fetchHospitals();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/hospitals/${selectedHospital.nrRegjistrimit}/departments`
      );
      setDepartments(response.data);
    } catch (error) {
      console.error("There was an error fetching the departments!", error);
    }
  };

  useEffect(() => {
    if (selectedHospital) {
      fetchDepartments();
    } else {
      setDepartments([]);
    }
  }, [selectedHospital]);

  const handleHospitalChange = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleEdit = (department) => {
    setEditingDepartmentId(department.departmentID);
    setEditedDepartment(department);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDepartment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewDepartment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddDepartment = async () => {
    const formData = {
      ...newDepartment,
      hospitalId: selectedHospital.nrRegjistrimit,
    };

    try {
      await axios.post("http://localhost:3001/departments", formData);
      setShowAddDepartmentForm(false);
      setNewDepartment({
        emri: "",
        lokacioni: "",
        nrTel: "",
      });
      fetchDepartments();
    } catch (error) {
      console.error("There was an error adding the department!", error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/departments/${editingDepartmentId}`, editedDepartment);
      setEditingDepartmentId(null);
      fetchDepartments();
    } catch (error) {
      console.error("There was an error saving the department!", error);
    }
  };

  const handleDelete = async (departmentID) => {
    try {
      await axios.delete(`http://localhost:3001/departments/${departmentID}`);
      fetchDepartments();
    } catch (error) {
      console.error("There was an error deleting the department!", error);
    }
  };

  return {
    hospitals,
    departments,
    selectedHospital,
    newDepartment,
    showAddDepartmentForm,
    editingDepartmentId,
    editedDepartment,
    setEditingDepartmentId,
    handleEditInputChange,
    handleEdit,
    handleSave,
    handleDelete,
    handleHospitalChange,
    handleAddDepartment,
    handleAddInputChange,
    setShowAddDepartmentForm,
  };
};
