import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Regester/Register";
import Dashboard from "../Layout/Dashboard/Dashboard";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import GetAdmission from "../Pages/GetAdmission/GetAdmission";
import AdmissionForm from "../Pages/GetAdmission/AdmissionForm";
import PrivateRoute from "./PrivateRoute";
import AdminRoutes from "./AdminRoute";
import UserProfile from "../Pages/Dashboard/Profile/UserProfile";
import AdmissionRequests from "../Pages/Dashboard/Admin/AdmissionRequests/AdmissionRequests";
import AdmissionDetails from "../Pages/Dashboard/Admin/AdmissionDetails/AdmissionDetails";

import AdminList from "../Pages/Dashboard/Admin/AdminList";
import StudentsLists from "../Pages/Dashboard/Admin/StudentsLists/StudentsLists";
import Programs from "../Pages/Dashboard/Admin/Programs/Programs";
import Department from "../Pages/Dashboard/Admin/Department/Department";
import AcademicSemester from "../Pages/Dashboard/Admin/AcademicSemester/AcademicSemester";
import Batch from "../Pages/Dashboard/Admin/Batch/Batch";
import AdditionalInfoRequireRoutes from "./AdditionalInfoRequireRoutes";
import FacultyList from "../Pages/Dashboard/Admin/FacultyList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/getAdmission",
        element: (
          <PrivateRoute>
            <GetAdmission />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/getAdmission/admission-form",
    element: (
      <PrivateRoute>
        <AdditionalInfoRequireRoutes>
          <AdmissionForm />
        </AdditionalInfoRequireRoutes>
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/users",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <ManageUsers />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admission-requests-lists",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <AdmissionRequests />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admins",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <AdminList />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/faculties",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <FacultyList />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/programs",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <Programs />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/department",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <Department />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/batch",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <Batch />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/academic-semesters",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <AcademicSemester />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/students",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <StudentsLists />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admission-requests-lists/details/:email",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <AdmissionDetails />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
