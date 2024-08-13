/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import HospitalData from "views/HospitalData";
import DepartmentData from "views/DepartmentData";
import DoctorData from "views/DoctorData";
import PatientData from "views/PatientData";
import BillData from "views/BillData";
import StaffData from "views/StaffData";
import AppointmentData from "views/AppointmentData";
import RoomData from "views/RoomData";
import PrescriptionData from "views/PrescriptionData";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/hospitals",
    name: "Hospitals",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: <HospitalData />,
    layout: "/admin",
  },
  {
    path: "/departments",
    name: "Departments",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: <DepartmentData />,
    layout: "/admin",
  },
  {
    path: "/doctors",
    name: "Doctors",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: <DoctorData />,
    layout: "/admin",
  },
  {
    path: "/patients",
    name: "Patients",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: <PatientData />,
    layout: "/admin",
  },
  {
    path: "/staff",
    name: "Staff",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: <StaffData />,
    layout: "/admin",
  },
  {
    path: "/bills",
    name: "Bills",
    rtlName: "طباعة",
    icon: "tim-icons icon-align-center",
    component: <BillData />,
    layout: "/admin",
  },
  {
    path: "/appointments",
    name: "Appointments",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: <AppointmentData />,
    layout: "/admin",
  },
  {
    path: "/rooms",
    name: "Rooms",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <RoomData />,
    layout: "/admin",
  },
  {
    path: "/prescriptions",
    name: "Prescriptions",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: <PrescriptionData />,
    layout: "/admin",
  },
];
export default routes;
