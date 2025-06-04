import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './login/page'
import RegisterPage from './register/page'
import DashboardPage from './dashboard/page'
import QuestionsComponent from './components/Questions'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/dashboard/test" element={<QuestionsComponent />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
