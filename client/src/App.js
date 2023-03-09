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

function App() {
  const role = useSelector((state) => state.auth.role);

  const theme = useMemo(() => createTheme(themeSettings()), []);

  let routes;

  if (role === "admin") {
    //================ ALL THE ROUTES RELATED TO THE ADMIN
    routes = (
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/planRequests" element={<PlanRequests />} />
        </Route>
      </Routes>
    );
  } else {
    //================ ALL THE ROUTES RELATED TO THE CLIENT
    routes = (
      <Routes>
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    );
  }

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {routes}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
