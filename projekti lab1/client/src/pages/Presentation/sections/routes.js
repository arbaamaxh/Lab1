// sections/Routes.js
import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import OurHospitals from "pages/Presentation/sections/OurHospitals";
import OurDepartments from "pages/Presentation/sections/OurDepartments";
import OurDoctors from "pages/Presentation/sections/OurDoctors";

const SectionRoutes = () => {
  return (
    <RouterRoutes>
      <Route path="OurHospitals" element={<OurHospitals />} />
      <Route path="OurDepartments" element={<OurDepartments />} />
      <Route path="OurDoctors" element={<OurDoctors />} />
    </RouterRoutes>
  );
};

export default SectionRoutes;
