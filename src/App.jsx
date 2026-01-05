import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Main from "./components/Main";
import LoginPage from "./pages/LoginPage";
import Loader from "./components/Loader";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Loader />

    <Routes>
  {/* Redirect root */}
  <Route path="/" element={<Navigate to="/login" replace />} />

  {/* Login */}
  <Route path="/login" element={<LoginPage />} />
       <Route path="/signup" element={<SignupPage />} />

  {/* Protected */}
  <Route element={<ProtectedRoute />}>
    <Route path="/app" element={<Main />}>
      <Route index element={<Dashboard />} />
      <Route path="products" element={<Products />} />
      <Route path="settings" element={<Settings />} />
     
    </Route>
  </Route>
</Routes>


      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
