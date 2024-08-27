import React from "react";
import { Grid, Card, Switch } from "@mui/material";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import Select from "react-select";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useRegisterForm } from "./useRegisterForm";

const RegisterPatient = () => {
  const {
    newPatient,
    handleChange,
    handleSubmit,
    handleHospitalChange,
    errorMessage,
    hospitalOptions,
  } = useRegisterForm();

  return (
    <>
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={6} lg={4}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Add Patient
                </MKTypography>
              </MKBox>
              {errorMessage && (
                <MKBox px={3}>
                  <MKTypography variant="body2" color="error">
                    {errorMessage}
                  </MKTypography>
                </MKBox>
              )}
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" onSubmit={handleSubmit}>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Name"
                      fullWidth
                      name="emri"
                      id="emri"
                      placeholder="Name"
                      value={newPatient.emri}
                      onChange={handleChange}
                      required
                      pattern="^[A-Z][a-zA-Z\s]*$"
                      title="Name must start with a capital letter"
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Surname"
                      fullWidth
                      name="mbiemri"
                      id="mbiemri"
                      placeholder="Surname"
                      value={newPatient.mbiemri}
                      onChange={handleChange}
                      required
                      pattern="^[A-Z][a-zA-Z\s]*$"
                      title="Surname must start with a capital letter"
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Personal ID"
                      fullWidth
                      name="nrPersonal"
                      id="nrPersonal"
                      placeholder="Personal ID"
                      value={newPatient.nrPersonal}
                      onChange={handleChange}
                      required
                      pattern="^\d{10}$"
                      title="Personal ID should have exactly 10 numbers"
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Birthday"
                      fullWidth
                      name="datelindja"
                      id="datelindja"
                      placeholder="Birthday"
                      value={newPatient.datelindja}
                      onChange={handleChange}
                      required
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKBox display="flex" alignItems="center">
                      <MKTypography variant="body2" color="text" sx={{ mr: 2 }}>
                        Gender
                      </MKTypography>
                      <MKBox display="flex">
                        <Switch
                          checked={newPatient.gjinia === "Male"}
                          onChange={() =>
                            handleChange({ target: { name: "gjinia", value: "Male" } })
                          }
                        />
                        <MKTypography variant="body2" color="text" sx={{ ml: 1 }}>
                          Male
                        </MKTypography>
                        <Switch
                          checked={newPatient.gjinia === "Female"}
                          onChange={() =>
                            handleChange({ target: { name: "gjinia", value: "Female" } })
                          }
                        />
                        <MKTypography variant="body2" color="text" sx={{ ml: 1 }}>
                          Female
                        </MKTypography>
                      </MKBox>
                    </MKBox>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Address"
                      fullWidth
                      name="adresa"
                      id="adresa"
                      placeholder="Address"
                      value={newPatient.adresa}
                      onChange={handleChange}
                      required
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Phone Number"
                      fullWidth
                      name="nrTel"
                      id="nrTel"
                      placeholder="Phone Number"
                      value={newPatient.nrTel}
                      onChange={handleChange}
                      required
                      pattern="^\d{5,15}$"
                      title="Phone Number should have between 5-15 numbers."
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      label="Email"
                      fullWidth
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={newPatient.email}
                      onChange={handleChange}
                      required
                      pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                      title="Please enter a valid email address"
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Password"
                      fullWidth
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={newPatient.password}
                      onChange={handleChange}
                      required
                      pattern="^(?=.*\d)[A-Za-z\d]{8,16}$"
                      title="Password must be 8-16 characters long and include at least one number"
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKTypography variant="body2" color="text" sx={{ mb: 1 }}>
                      Hospital
                    </MKTypography>
                    <Select
                      options={hospitalOptions}
                      classNamePrefix="custom-select"
                      value={hospitalOptions.find(
                        (option) => option.value === newPatient.hospitalId
                      )}
                      onChange={handleHospitalChange}
                      placeholder="Select Hospital"
                      required
                    />
                  </MKBox>
                  <MKBox mt={4}>
                    <MKButton variant="gradient" color="info" fullWidth type="submit">
                      Add Patient
                    </MKButton>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
};

export default RegisterPatient;
