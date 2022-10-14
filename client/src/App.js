import TVShowDetail from './Components/Details/TVShowDetail/TVShowDetail.jsx';
import HomeMovies from './Components/Home/HomeMovies.jsx';
import HomeTVShows from './Components/Home/HomeTVShows.jsx';
import AuthProvider from './Components/AuthContext/AuthContext.jsx';
import LandingPage from './Components/LandingPage/LandingPage';
import MovieDetail from './Components/Details/MovieDetail/MovieDetail';

// Import style:
import './App.css';
import { ProtectedRoute } from './Components/AuthContext/ProtectedRoute.js';
import UserProfile from './Components/UserData/UserProfile/UserProfile.jsx';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/UserData/Login/Login.jsx';
import Register from './Components/UserData/Register/Register.jsx';
import Home from './Components/Home/Home';

// Create App component:
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path='/payment' element={<PaymentCheckout/>}/> */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/home/movies" element={<HomeMovies />} />
        <Route path="/home/tv_shows" element={<HomeTVShows />} />
        <Route path="/home/movie_details/:id" element={<MovieDetail />} />
        <Route path="/home/tv_show_details/:id" element={<TVShowDetail />} />
      </Routes>
    </AuthProvider>
  );
}
