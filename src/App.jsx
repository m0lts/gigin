import { Route, Routes } from "react-router-dom"
import LandingPage from "./Components/LandingPage"
import ImAVenue from "./Components/VenuePages/ImAVenue"
import AccountsPage from "./Components/Accounts/AccountsPage"
import ForgotPasswordForm from "./Components/Accounts/ForgotPassword/ForgotPasswordForm"
import VenueControlCentre from "./Components/VenuePages/VenueControlCentre"
import GigBuilder from "./Components/VenuePages/VenueCCComponents/GigBuilder/GigBuilder"
import SignUpForm from "./Components/Accounts/SignUp/SignUpForm"
import LogInForm from "./Components/Accounts/LogIn/LogInForm"


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/venue" element={<ImAVenue />} />
        <Route path="/account" element={<AccountsPage />} >
          <Route index element={<LogInForm />} />
          <Route path="signup" element={<SignUpForm />} />
          <Route path="forgotpassword" element={<ForgotPasswordForm />} />
        </Route>
        <Route path="/venue-controlcentre" element={<VenueControlCentre />} />
        <Route path="/build-a-gig" element={<GigBuilder />} />
      </Routes>
  )
}

