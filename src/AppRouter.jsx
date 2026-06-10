import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import DashboardLayout from './pages/DashboardLayout.jsx';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard/*" element={<DashboardLayout />} />
    </Routes>
  );
}
