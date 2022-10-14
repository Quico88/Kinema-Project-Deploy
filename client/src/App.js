// Import react utilities:
import { Routes, Route } from 'react-router-dom';

// Import components:
import LandingPage from './Components/LandingPage/LandingPage.jsx';
import Login from './Components/UserData/Login/Login.jsx';
import Register from './Components/UserData/Register/Register.jsx';
import Home from './Components/Home/Home.jsx';
import PaymentCheckout from './Components/UserData/PaymentCheckout/PaymentCheckout.jsx';
import UserProfile from './Components/UserData/UserProfile/UserProfile.jsx';
import MovieDetail from './Components/Details/MovieDetail/MovieDetail.jsx';
import TVShowDetail from './Components/Details/TVShowDetail/TVShowDetail.jsx';
import HomeMovies from './Components/Home/HomeMovies.jsx';
import HomeTVShows from './Components/Home/HomeTVShows.jsx';
import PaymentCheckoutRent from './Components/UserData/PaymentCheckout/PaymentCheckoutRent.jsx';
import HomeSearch from './Components/Home/HomeSearch.jsx';

// Import style:
import './App.css';
import './Components/global.css';




// Create App component:
function App() {
  return (
      <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/payment' element={<PaymentCheckout/>}/>
          <Route path='/rent' element={<PaymentCheckoutRent/>}/>
          <Route path='/profile' element={<UserProfile/>}/>
          <Route path='/home/movies' element={<HomeMovies/>}/>
          <Route path='/home/tv_shows' element={<HomeTVShows/>}/>
          <Route path='/home/search' element={<HomeSearch/>}/>
          <Route path='/home/movie_details/:id' element={<MovieDetail/>}/>
          <Route path='/home/tv_show_details/:id' element={<TVShowDetail/>}/>
      </Routes>      
  );
}

export default App;
