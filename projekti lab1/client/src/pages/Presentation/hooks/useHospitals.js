import { useState, useEffect } from "react";
import axios from "axios";

export const useHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingHospitalId, setEditingHospitalId] = useState(null);
  const [editedHospital, setEditedHospital] = useState({
    emri: "",
    adresa: "",
    nrTel: "",
    imageUrl: "",
  });
  const [newHospital, setNewHospital] = useState({
    emri: "",
    adresa: "",
    nrTel: "",
  });
  const [showAddHospitalForm, setShowAddHospitalForm] = useState(false);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get("http://localhost:3001/hospitals");
      setHospitals(response.data);
    } catch (error) {
      console.error("There was an error fetching the hospitals!", error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleEdit = (hospital) => {
    setEditingHospitalId(hospital.nrRegjistrimit);
    setEditedHospital(hospital);
  };

  const handleImageChange = (e, type) => {
    if (type === "new") {
      setSelectedImage(e.target.files[0]);
    } else {
      setEditedHospital((prevState) => ({
        ...prevState,
        image: e.target.files[0],
      }));
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedHospital((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewHospital((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddHospital = async () => {
    const formData = new FormData();
    formData.append("emri", newHospital.emri);
    formData.append("adresa", newHospital.adresa);
    formData.append("nrTel", newHospital.nrTel);
    if (selectedImage) {
      formData.append("img", selectedImage);
    }

    try {
      await axios.post("http://localhost:3001/hospitals", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchHospitals();
      setNewHospital({
        emri: "",
        adresa: "",
        nrTel: "",
      });
      setSelectedImage(null);
      setShowAddHospitalForm(false);
    } catch (error) {
      console.error("Error adding hospital:", error);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("emri", editedHospital.emri);
    formData.append("adresa", editedHospital.adresa);
    formData.append("nrTel", editedHospital.nrTel);
    if (editedHospital.image) {
      formData.append("img", editedHospital.image);
    }

    try {
      await axios.put(`http://localhost:3001/hospitals/${editingHospitalId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchHospitals();
      setEditingHospitalId(null);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error updating hospital:", error);
    }
  };

  const handleDelete = async (hospitalId) => {
    try {
      await axios.delete(`http://localhost:3001/hospitals/${hospitalId}`);
      fetchHospitals(); // Refresh the hospital list after deletion
    } catch (error) {
      console.error("Error deleting hospital:", error);
    }
  };

  return {
    hospitals,
    editedHospital,
    editingHospitalId,
    newHospital,
    showAddHospitalForm,
    setEditingHospitalId,
    handleEdit,
    handleImageChange,
    handleEditInputChange,
    handleSave,
    handleDelete,
    handleAddHospital,
    handleAddInputChange,
    setShowAddHospitalForm,
  };
};
