import { Route, Routes } from "react-router-dom"
import MusicianHomePage from "./components/Musician/MusicianHomePage"
import VenueHomePage from "./components/Venue/VenueHomePage"
import LogInPage from "./components/Universal/Accounts/LogIn"
import SignUpPage from "./components/Universal/Accounts/SignUp"
import ForgotPassword from "./components/Universal/Accounts/ForgotPassword"
import ResetPassword from "./components/Universal/Accounts/ResetPassword"

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<MusicianHomePage />} />
        <Route path="/venue" element={<VenueHomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
  )
}

