import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LadingPage";
import { LoginPage } from "../pages/auth/Login";
import { RegisterPage } from "../pages/auth/Register";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import { AdminRoute, BreederRoute, PrivateRoute, PublicRoute, VetRoute } from "./Guards";
import Profile from "../pages/settings/Profile";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import VetLayout from "../layouts/VetLayout";
import VetDashboard from "../pages/vet/VetDashboard";
import BreederDashboard from "../pages/breeder/BreederDashboard";
import BreederLayout from "../layouts/BreederLayout";
import FirstSpace from "../pages/breeder/FirstSpace.tsx";
import BreederBaseAnimal from "../pages/breeder/animals/BreederBaseAnimal.tsx";
import BreederHomeAnimal from "../pages/breeder/animals/BreederHomeAnimal.tsx";
import BreederFirstAnimal from "../pages/breeder/animals/BreederFirstAnimal.tsx";
import BreederAnimalList from "../pages/breeder/animals/BreederAnimalList.tsx";

export default function AppRouter() {

  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Routes privées */}
        <Route element={<PrivateRoute />}>
            <Route path="creation-espace" element={<FirstSpace/>}/>
          <Route path="/profile" element={<Profile />} />
          {/* Espace Eleveur */}
          <Route element={<BreederRoute />}>
            <Route path="/espace-eleveur" element={<BreederLayout/>} >
                <Route index element={<BreederDashboard/>} />
                <Route path="sujets/" element={<BreederBaseAnimal/>}>
                    <Route path="premier-sujet" element={<BreederFirstAnimal/>} />
                    <Route path="" element={<BreederHomeAnimal/>} />
                    <Route path="liste" element={<BreederAnimalList/>} />

                </Route>
            </Route>
          </Route>
          
          {/* Espace Véto */}
          <Route element={<VetRoute />}>
            <Route path="/espace-vet" element={<VetLayout/>} >
              <Route index element={<VetDashboard/>} />
            
            </Route>
          </Route>
          {/* Espace Admin */}
          <Route element={<AdminRoute />}>  
            <Route path="/espace-admin" element={<AdminLayout/>} >
              <Route index element={<AdminDashboard/>} />
            
            </Route>
          </Route>

        </Route>

        {/* Route libre */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
