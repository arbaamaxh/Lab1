import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import OurHospitals from "pages/Presentation/sections/OurHospitals";
import OurDepartments from "pages/Presentation/sections/OurDepartments";
import OurDoctors from "pages/Presentation/sections/OurDoctors";
import { useUser } from "context/UserContext";

const SectionRoutes = () => {
  const { user } = useUser();

  return (
    <RouterRoutes>
      <Route path="OurHospitals" element={<OurHospitals user={user} />} />
      <Route path="OurDepartments" element={<OurDepartments />} />
      <Route path="OurDoctors" element={<OurDoctors />} />
    </RouterRoutes>
  );
};

export default SectionRoutes;
