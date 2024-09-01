import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";
import SectionRoutes from "./pages/Presentation/sections/routes"; // Ensure the path is correct
import { UserProvider } from "context/UserContext"; // Ensure the path is correct
import routes from "routes";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Routes>
          {getRoutes(routes)}
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/sections/*" element={<SectionRoutes />} />
          <Route path="*" element={<Navigate to="/presentation" />} />
        </Routes>
      </UserProvider>
    </ThemeProvider>
  );
}
