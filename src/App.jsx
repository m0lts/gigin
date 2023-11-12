import { Route, Routes } from "react-router-dom"
import MusicianHomePage from "./Components/Musician/MusicianHomePage"
import VenueHomePage from "./Components/Venue/VenueHomePage"
import AccountsPage from "./Components/Universal/Accounts/AccountsPage"
import ForgotPasswordForm from "./Components/Universal/Accounts/ForgotPassword/ForgotPasswordForm"
import ControlCentre from "./Components/Universal/Sections/ControlCentre/ControlCentre"
import GigBuilder from "./Components/Universal/Sections/ControlCentre/Outlets/VenueSpecific/GigBuilder/GigBuilder"
import SignUpForm from "./Components/Universal/Accounts/SignUp/SignUpForm"
import LogInForm from "./Components/Universal/Accounts/LogIn/LogInForm"


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<MusicianHomePage />} />
        <Route path="/venue" element={<VenueHomePage />} />
        <Route path="/account" element={<AccountsPage />} >
          <Route index element={<LogInForm />} />
          <Route path="signup" element={<SignUpForm />} />
          <Route path="forgotpassword" element={<ForgotPasswordForm />} />
        </Route>
        <Route path="/controlcentre" element={<ControlCentre />} />
        <Route path="/build-a-gig" element={<GigBuilder />} />
      </Routes>
  )
}

