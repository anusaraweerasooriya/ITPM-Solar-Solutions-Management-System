import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Dashboard from "admin/pages/dashboard";
import AdminLayout from "admin/pages/layout";

import Home from "user/pages/static/home";
import ClientLayout from "user/pages/layout";
import PlanRequests from "admin/pages/planRequests";
import Login from "user/pages/login";

import AdminRuralProjects from "admin/pages/ruralProjects";
import RuralProjectForm from "admin/pages/ruralProjects/ruralProjectForm";
import RuralProjects from "user/pages/ruralProjects";
import DonateForm from "user/pages/donations/donateForm";
import AdminDonations from "admin/pages/donations";

import Projects from "user/pages/recentProjects/projects";
import Project from "user/pages/recentProjects/project";

import AdminRecentProjects from "admin/pages/recentProjects";
import AddToRecentForm from "admin/pages/recentProjects/addToRecentForm";

import Products from "user/pages/product/products";
import Product from "user/pages/product/product";
import ProductRequestForm from "user/pages/productRequest/productRequestForm";

import AdminProducts from "admin/pages/product";
import ProductForm from "admin/pages/product/productFrom";
import SolarPanelsForm from "admin/pages/product/solarPanelsForm";
import BatteriesForm from "admin/pages/product/BatteriesForm";
import AdminProductRequest from "admin/pages/productRequest";

import BillGenerator from "user/pages/billGenerator";
import PlanRequest from "user/pages/planRequests";
import PendingRequests from "user/pages/profile/PendingRequests/PendingRequests";
import AddProjectPlan from "admin/pages/projectPlans/AddProjectPlan";
import ProjectPlans from "admin/pages/projectPlans";
import UserProjectPlans from "user/pages/profile/ProjectPlans";
import RuralProject from "user/pages/ruralProjects/ruralProject";
import Donations from "user/pages/profile/Donations/Donations";
import RecentProjects from "admin/pages/recentProjects/RecentProjects";

function App() {
  const role = useSelector((state) => state.auth.role);

  const isAdmin = role === "admin";
  const isCustomer = role === "customer";

  const theme = useMemo(() => createTheme(themeSettings()), []);

  //========================== ADMIN ROUTES =========================
  const clientProjectRoutes = [
    <Route path="/admin/planRequests" element={<PlanRequests />} />,
    <Route path="/admin/addProjectPlan/:id" element={<AddProjectPlan />} />,
    <Route path="/admin/projectPlans" element={<ProjectPlans />} />,
  ];

  const ruralProjectRoutes = [
    <Route
      path="/admin/ruralProjects"
      element={isAdmin ? <AdminRuralProjects /> : <Navigate to="/login" />}
    />,
    <Route
      path="/admin/addRuralProject"
      element={isAdmin ? <RuralProjectForm /> : <Navigate to="/login" />}
    />,
    <Route
      path="/ruralProject/admin/:id"
      element={isAdmin ? <RuralProject /> : <Navigate to="/login" />}
    />,
  ];

  const donationRoutes = [
    <Route
      path="/admin/donations"
      element={isAdmin ? <AdminDonations /> : <Navigate to="/login" />}
    />,
  ];

  const productRoutes = [
    <Route
      path="/admin/products"
      element={isAdmin ? <AdminProducts /> : <Navigate to="/login" />}
    />,
    <Route
      path="/admin/addProduct"
      element={isAdmin ? <ProductForm /> : <Navigate to="/login" />}
    />,
    <Route
      path="/admin/addSolarPanels"
      element={isAdmin ? <SolarPanelsForm /> : <Navigate to="/login" />}
    />,
    <Route
      path="/admin/addBatteries"
      element={isAdmin ? <BatteriesForm /> : <Navigate to="/login" />}
    />,
  ];

  const recentProjectRoutes = [
    <Route
      path="/admin/completedProjects"
      element={isAdmin ? <AdminRecentProjects /> : <Navigate to="/login" />}
    />,
    <Route
      path="/admin/addToRecent/:id"
      element={isAdmin ? <AddToRecentForm /> : <Navigate to="/login" />}
    />,
    <Route
      path="/admin/recentProjects"
      element={isAdmin ? <RecentProjects /> : <Navigate to="/login" />}
    />,
  ];

  const productRequestRoutes = [
    <Route
      path="/admin/productRequest"
      element={isAdmin ? <AdminProductRequest /> : <Navigate to="/login" />}
    />,
  ];

  //============================ CLIENT ROUTES =========================
  const staticRoutes =
    ((<Route path="/login" element={<Login />} />),
    (<Route path="/home" element={<Home />} />));

  const dynamicRoutes = [
    <Route path="/products" element={<Products />} />,
    <Route path="/product" element={<Product />} />,
    <Route path="/productRequest" element={<ProductRequestForm />} />,
    <Route path="/generateBill" element={<BillGenerator />} />,
    <Route path="/projects" element={<Projects />} />,
    <Route path="/donate" element={<RuralProjects />} />,
    <Route path="/donate/submit" element={<DonateForm />} />,
    <Route path="/profile/donations" element={<Donations />} />,
  ];

  const userProfileRoutes = [
    <Route
      path="/profile/submitRequest"
      element={isCustomer ? <PlanRequest /> : <Navigate to="/login" />}
    />,
    <Route
      path="/profile/pendingRequests"
      element={isCustomer ? <PendingRequests /> : <Navigate to="/login" />}
    />,
    <Route
      path="/profile/projectPlans"
      element={isCustomer ? <UserProjectPlans /> : <Navigate to="/login" />}
    />,
  ];

  return (
    <PayPalScriptProvider
      options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
    >
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              (isAdmin ? (
              <Route element={<AdminLayout />}>
                <Route
                  path="/admin/dashboard"
                  element={isAdmin ? <Dashboard /> : <Navigate to="/login" />}
                />
                {clientProjectRoutes}
                {ruralProjectRoutes}
                {donationRoutes}
                {recentProjectRoutes}
                {productRoutes}
                {productRequestRoutes}
              </Route>
              ) :() ) (isCustomer ? (
              <Route element={<ClientLayout />}>
                {staticRoutes}
                {dynamicRoutes}
                {userProfileRoutes}
              </Route>
              ):())
              <Route element={<ClientLayout />}>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/products" element={<Products />} />,
                <Route path="/product/:id" element={<Product />} />,
                <Route path="/generateBill" element={<BillGenerator />} />,
                <Route path="/projects" element={<Projects />} />
                <Route path="/project/:id" element={<Project />} />
                <Route path="/generateBill" element={<BillGenerator />} />
                <Route path="/ruralProject/:id" element={<RuralProject />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
