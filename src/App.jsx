import { Route, Routes } from "react-router-dom"
import MusicianHomePage from "./Components/Musician/MusicianHomePage"
import VenueHomePage from "./Components/Venue/VenueHomePage"
import LogInPage from "./Components/Universal/Accounts/LogIn"
import SignUpPage from "./Components/Universal/Accounts/SignUp"
import ForgotPassword from "./Components/Universal/Accounts/ForgotPassword"
import ResetPassword from "./Components/Universal/Accounts/ResetPassword"
import ControlCentre from "./Components/Universal/Sections/ControlCentre"

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<MusicianHomePage />} />
        <Route path="/venue" element={<VenueHomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/controlcentre" element={<ControlCentre />} />
      </Routes>
  )
}

