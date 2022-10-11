// Import react utilities:
import { BrowserRouter, Route } from 'react-router-dom';

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


// Import style:
import './App.css';


// Create App component:
function App() {
  return (
    <BrowserRouter>
      
          <Route exact path='/' component={LandingPage}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route exact path='/home' component={Home}/>
          <Route path='/payment' component={PaymentCheckout}/>
          <Route path='/profile' component={UserProfile}/>
          <Route path='/home/movies' component={HomeMovies}/>
          <Route path='/home/tv_shows' component={HomeTVShows}/>
          <Route path='/home/movie_details' component={MovieDetail}/>
          <Route path='/home/tv_show_details' component={TVShowDetail}/>
   
    </BrowserRouter>
  );
}

export default App;
