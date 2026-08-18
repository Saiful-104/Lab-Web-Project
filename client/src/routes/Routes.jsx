import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";

import MainLayout from "../layouts/MainLayout";

import AllScholarships from "../components/Home/AllScholarships";
import { createBrowserRouter } from "react-router";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import PaymentCheckout from "../Payment/PaymentCheckout";
import PaymentSuccess from "../Payment/PaymentSuccess";
import PaymentCancel from "../Payment/PaymentCancel";
import PaymentFailed from "../Payment/PaymentFailed";
import AddScholarship from "../components/Form/AddScholarship";
import ManageScholarships from "../pages/Dashboard/Admin/ManageScholarships";
import Analytics from "../pages/Dashboard/Admin/Analytics";
import MyApplications from "../pages/Dashboard/Student/MyApplications";
import MyReviews from "../pages/Dashboard/Student/MyReviews";
import ManageApplications from "../pages/Dashboard/Moderator/ManageApplications";
import AllReviews from "../pages/Dashboard/Moderator/AllReviews";
import AdminRoute from "./AdminRoute";
import ModeratorRout from "./ModeratorRout";
import WishlistPage from "../pages/ScholarshipDetails/WishlistPage";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Help from "../pages/Help/Help";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import Terms from "../pages/Terms/Terms";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/scholarships",
        element: <AllScholarships />,
      },
      {
        path: "/scholarship/:id",
        element: <ScholarshipDetails />,
      },
      {
        path: "/payment/checkout/:id",
        element: <PaymentCheckout />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment-cancel",
        element: <PaymentCancel />,
      },

      {
        path: "/payment-failed",
        element: <PaymentFailed />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-scholarship",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddScholarship />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-scholarships",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageScholarships />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <PrivateRoute>
            <WishlistPage />
          </PrivateRoute>
        ),
      },

      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Analytics />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-applications",
        element: (
          <PrivateRoute>
            <MyApplications />
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "moderator-applications",
        element: (
          <PrivateRoute>
            <ModeratorRout>
              <ManageApplications />
            </ModeratorRout>
          </PrivateRoute>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <PrivateRoute>
            <ModeratorRout>
              <AllReviews />
            </ModeratorRout>
          </PrivateRoute>
        ),
      },
    ],
  },
]);