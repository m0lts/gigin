import { Route, Routes } from "react-router-dom"
import MusicianHomePage from "./Components/Musician/MusicianHomePage"
import VenueHomePage from "./Components/Venue/VenueHomePage"
import LogInPage from "./Components/Universal/Accounts/LogIn"
import SignUpPage from "./Components/Universal/Accounts/SignUp"
import ForgotPassword from "./Components/Universal/Accounts/ForgotPassword"
import ResetPassword from "./Components/Universal/Accounts/ResetPassword"
import ControlCentre from "./Components/Universal/Sections/ControlCentre/ControlCentre"
import Profile from "./Components/Universal/Sections/ControlCentre/Outlets/Shared/Profile"
import GigBuilder from "./Components/Universal/Sections/ControlCentre/Outlets/VenueSpecific/GigBuilder/GigBuilder"
import GigResponses from "./Components/Universal/Sections/ControlCentre/Outlets/VenueSpecific/GigResponses"
import AvailableDates from "./Components/Universal/Sections/ControlCentre/Outlets/MusicianSpecific/AvailableDates"
import GigApplications from "./Components/Universal/Sections/ControlCentre/Outlets/MusicianSpecific/GigApplications"
import ConfirmedGigs from "./Components/Universal/Sections/ControlCentre/Outlets/Shared/ConfirmedGigs"
import Finances from "./Components/Universal/Sections/ControlCentre/Outlets/Shared/Finances"
import PreviousGigs from "./Components/Universal/Sections/ControlCentre/Outlets/Shared/PreviousGigs"
import Ratings from "./Components/Universal/Sections/ControlCentre/Outlets/Shared/Ratings"
import SavedArtists from "./Components/Universal/Sections/ControlCentre/Outlets/VenueSpecific/SavedArtists"


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<MusicianHomePage />} />
        <Route path="/venue" element={<VenueHomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/controlcentre" element={<ControlCentre />}>
          {/* SHARED CONTROL CENTRE COMPONENTS */}
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />}  />
          <Route path="confirmed-gigs" element={<ConfirmedGigs />} />
          <Route path="previous-gigs" element={<PreviousGigs />}  />
          <Route path="finances" element={<Finances />}  />
          <Route path="ratings" element={<Ratings />}  />

          {/* VENUE SPECIFIC CONTROL CENTRE COMPONENTS */}
          <Route path="gig-builder" element={<GigBuilder />} />
          <Route path="gig-responses" element={<GigResponses />} />
          <Route path="saved-artists" element={<SavedArtists />}  />

          {/* MUSICIAN SPECIFIC CONTROL CENTRE COMPONENTS */}
          <Route path="available-dates" element={<AvailableDates />}  />
          <Route path="gig-applications" element={<GigApplications />}  />
        </Route>
      </Routes>
  )
}

