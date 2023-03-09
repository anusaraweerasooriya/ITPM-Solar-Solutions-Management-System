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

function App() {
  const role = useSelector((state) => state.auth.role);

  const theme = useMemo(() => createTheme(themeSettings()), []);

  let routes;

  if (role === "admin") {
    routes = (
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    );
  } else {
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
