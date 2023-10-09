import { Route, Routes } from "react-router-dom"
import MusicianLandingPage from "./components/major_components/common_pages/musician_pages/musician_landing_page"
import LogInPage from "./components/major_components/unique_pages/login_page/login_page"
import SignUpPage from "./components/major_components/unique_pages/signup_page/signup_page"

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<MusicianLandingPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
  )
}

