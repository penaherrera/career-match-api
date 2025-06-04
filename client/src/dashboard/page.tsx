import { Routes, Route } from "react-router-dom"
import DashboardContent from "./pagesInfo"

export default function DashboardPage() {
  return (
    <Routes>
      <Route path="/*" element={<DashboardContent />} />
    </Routes>
  )
}
