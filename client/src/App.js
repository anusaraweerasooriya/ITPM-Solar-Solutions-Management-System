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
import RuralProjects from "admin/pages/ruralProjects";
import Donate from "user/pages/donate";

function App() {
  const user = useSelector((state) => state.auth.user);
  let role;
  if (user) {
    role = user.role;
    console.log(role);
  }

  const isAdmin = role === "admin";
  console.log(isAdmin);

  const theme = useMemo(() => createTheme(themeSettings()), []);

  //========================== ADMIN ROUTES =========================
  const clientProjectRoutes = (
    <Route path="/admin/planRequests" element={<PlanRequests />} />
  );

  const ruralProjectRoutes = (
    <Route
      path="/admin/ruralProjects"
      element={isAdmin ? <RuralProjects /> : <Navigate to="/login" />}
    />
  );

  const recentProjectRoutes = "";
  const productRoutes = "";

  //============================ CLIENT ROUTES =========================
  const staticRoutes =
    ((<Route path="/login" element={<Login />} />),
    (<Route path="/home" element={<Home />} />));

  const userProfileRoutes = "";

  const donationRoutes = <Route path="/donate" element={<Donate />} />;

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
            ) : (
            <Route element={<ClientLayout />}>
              {staticRoutes}
              {userProfileRoutes}
              {donationRoutes}
            </Route>
            ) )
            <Route element={<ClientLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
