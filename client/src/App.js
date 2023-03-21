import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";

import Dashboard from "admin/pages/dashboard";
import AdminLayout from "admin/pages/layout";

import Home from "user/pages/static/home";
import ClientLayout from "user/pages/layout";
import PlanRequests from "admin/pages/planRequests";
import Login from "user/pages/login";

import AdminRuralProjects from "admin/pages/ruralProjects";
import RuralProjects from "user/pages/ruralProjects";

import Projects from "user/pages/recentProjects/projects";

import Products from "user/pages/product/products";
import Product from "user/pages/product/product";

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

  const ruralProjectRoutes = (
    <Route
      path="/admin/ruralProjects"
      element={isAdmin ? <AdminRuralProjects /> : <Navigate to="/login" />}
    />
  );

  const recentProjectRoutes = "";
  const productRoutes = "";

  //============================ CLIENT ROUTES =========================
  const staticRoutes =
    ((<Route path="/login" element={<Login />} />),
    (<Route path="/home" element={<Home />} />));

  const dynamicRoutes = [
    <Route path="/products" element={<Products />} />,
    <Route path="/product" element={<Product />} />,
    <Route path="/generateBill" element={<BillGenerator />} />,
    <Route path="/projects" element={<Projects />} />,
  ];

  const userProfileRoutes = "";

  const donationRoutes = <Route path="/donate" element={<RuralProjects />} />;

  return (
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
              {recentProjectRoutes}
              {productRoutes}
            </Route>
            ) :() ) (isCustomer && (
            <Route element={<ClientLayout />}>
              <Route
                path="/submitRequest"
                element={
                  isCustomer ? <PlanRequest /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/pendingRequests"
                element={
                  isCustomer ? <PendingRequests /> : <Navigate to="/login" />
                }
              />
            </Route>
            ) ) :()
            <Route element={<ClientLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/products" element={<Products />} />,
              <Route path="/product" element={<Product />} />,
              <Route path="/generateBill" element={<BillGenerator />} />,
              <Route path="/projects" element={<Projects />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
