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
import DonateForm from "user/pages/ruralProjects/donateForm";
import AdminDonations from "admin/pages/donations";

import Projects from "user/pages/recentProjects/projects";
import Project from "user/pages/recentProjects/project";

import AdminRecentProjects from "admin/pages/recentProjects";
import AddToRecentForm from "admin/pages/recentProjects/addToRecentForm";

import Products from "user/pages/product/products";
import Product from "user/pages/product/product";
import AdminProducts from "admin/pages/product";
import ProductForm from "admin/pages/product/productFrom";

import BillGenerator from "user/pages/billGenerator";
import PlanRequest from "user/pages/planRequests";
import PendingRequests from "user/pages/profile/PendingRequests/PendingRequests";

function App() {
  const user = useSelector((state) => state.auth.user);
  let role;
  if (user) {
    role = user.role;
    console.log(role);
  }

  const isAdmin = role === "admin";
  const isCustomer = role === "customer";

  const theme = useMemo(() => createTheme(themeSettings()), []);

  //========================== ADMIN ROUTES =========================
  const clientProjectRoutes = (
    <Route path="/admin/planRequests" element={<PlanRequests />} />
  );

  const ruralProjectRoutes = [
    <Route
      path="/admin/ruralProjects"
      element={isAdmin ? <AdminRuralProjects /> : <Navigate to="/login" />}
    />,
    <Route
      path="/admin/addRuralProject"
      element={isAdmin ? <RuralProjectForm /> : <Navigate to="/login" />}
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
  ];

  const recentProjectRoutes = [
    <Route
      path="/admin/recentProjects"
      element={isAdmin ? <AdminRecentProjects /> : <Navigate to="/login" />}
    />,
    <Route
      path="/admin/addToRecent/:id"
      element={isAdmin ? <AddToRecentForm /> : <Navigate to="/login" />}
    />,
  ];

  //============================ CLIENT ROUTES =========================
  const staticRoutes =
    ((<Route path="/login" element={<Login />} />),
    (<Route path="/home" element={<Home />} />));

  const dynamicRoutes = [
    <Route path="/products" element={<Products />} />,
    <Route path="/product" element={<Product />} />,
    <Route path="/generateBill" element={<BillGenerator />} />,
    <Route path="/projects" element={<Projects />} />,
    <Route path="/donate" element={<RuralProjects />} />,
    <Route path="/donate/submit" element={<DonateForm />} />,
  ];

  const userProfileRoutes = "";

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
              </Route>
              ) :() ){" "}
              {isCustomer && (
                <Route element={<ClientLayout />}>
                  {staticRoutes}
                  {dynamicRoutes}
                  {userProfileRoutes}
                  <Route
                    path="/submitRequest"
                    element={
                      isCustomer ? <PlanRequest /> : <Navigate to="/login" />
                    }
                  />
                  <Route
                    path="/pendingRequests"
                    element={
                      isCustomer ? (
                        <PendingRequests />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                </Route>
              )}
              <Route element={<ClientLayout />}>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/products" element={<Products />} />,
                <Route path="/product" element={<Product />} />,
                <Route path="/generateBill" element={<BillGenerator />} />,
                <Route path="/projects" element={<Projects />} />
                <Route path="/project" element={<Project />} />
                <Route path="/generateBill" element={<BillGenerator />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
