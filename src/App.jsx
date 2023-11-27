import { Route, Routes } from "react-router-dom"
import HomePage from "./Components/HomePage/HomePage"
import ImAVenue from "./Components/VenuePages/ImAVenue"
import AccountsPage from "./Components/Accounts/AccountsPage"
import ForgotPasswordForm from "./Components/Accounts/ForgotPassword/ForgotPasswordForm"
import VenueControlCentre from "./Components/VenuePages/VenueControlCentre/VenueControlCentre"
import GigBuilder from "./Components/VenuePages/VenueControlCentre/GigBuilder/GigBuilder"
import SignUpForm from "./Components/Accounts/SignUp/SignUpForm"
import LogInForm from "./Components/Accounts/LogIn/LogInForm"
import VenueGigPreview from "./Components/VenuePages/GigPreview/VenueGigPreview"
import NotFound from "./Components/Other/NotFound"
import VenuePage from "./Components/VenuePages/VenuePage"
import GigPage from "./Components/GigPage/GigPage"
import MusicianControlCentre from "./Components/MusicianPages/MusicianControlCentre"


export default function App() {
  return (
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path=":id" element={<GigPage />}/>
        <Route path="/venue" element={<VenuePage />}>
          <Route index element={<VenueControlCentre />} />
          <Route path="gig-builder" element={<GigBuilder />} />
          <Route path=":id" element={<VenueGigPreview />} />
        </Route>
        <Route path="/musician" element={<MusicianControlCentre />}>

        </Route>
        <Route path="/account" element={<AccountsPage />} >
          <Route index element={<LogInForm />} />
          <Route path="signup" element={<SignUpForm />} />
          <Route path="forgotpassword" element={<ForgotPasswordForm />} />
        </Route>
      </Routes>
  )
}

