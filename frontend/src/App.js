import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";

// Components
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import SectorsPage from "./components/SectorsPage";
import SectorDetailPage from "./components/SectorDetailPage";
import JobDetailPage from "./components/JobDetailPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardPage from "./components/DashboardPage";
import FavoritesPage from "./components/FavoritesPage";
import ProfilePage from "./components/ProfilePage";
import AdminPage from "./components/AdminPage";
import AllJobsPage from "./components/AllJobsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sectors" element={<SectorsPage />} />
              <Route path="/sectors/:sectorId" element={<SectorDetailPage />} />
              <Route path="/jobs" element={<AllJobsPage />} />
              <Route path="/jobs/:jobId" element={<JobDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;