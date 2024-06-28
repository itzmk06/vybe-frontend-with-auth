import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Trending from './components/Trending';
import Popular from './components/Popular';
import Movie from './components/Movie';
import TvShows from './components/TvShows';
import People from './components/People';
import MovieDetails from './components/helper/MovieDetails';
import TvDetails from './components/helper/TvDetails';
import PersonDetails from './components/helper/PersonDetails';
import Trailer from './components/helper/Trailer';
import MySpace from './components/MySpace';
import SignUp from './components/helper/SignUp';
import { Toaster } from 'react-hot-toast';

function App() {
  document.title = "Vybe | Home";
  return (
    <div className='w-screen h-screen bg-[#13141A] flex font-jose'>
      <Toaster />
      <Routes>
        <Route path='/' element={<MySpace />} />
        <Route path='/home' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movie' element={<Movie />} />
        <Route path='/movie/details/:id' element={<MovieDetails />}>
          <Route path='trailer' element={<Trailer />} />
        </Route>
        <Route path='/tv' element={<TvShows />} />
        <Route path='/tv/details/:id' element={<TvDetails />}>
          <Route path='trailer' element={<Trailer />} />
        </Route>
        <Route path='/person' element={<People />} >
          <Route path='/person/details/:id' element={<PersonDetails />} />
        </Route>
        <Route path='/myspace' element={<MySpace/>} >
        </Route>
          <Route path='/myspace/sign' element={<SignUp/>} /> 
        <Route path='*' element={<img className="w-[10rem] h-[10rem] object-cover object-center flex justify-center items-center absolute translate-x-[360%] translate-y-[150%] overflow-hidden" src="https://cdn-icons-png.flaticon.com/128/4826/4826313.png" alt="Page Not Found!" />} />
      </Routes>
    </div>
  );
}

export default App;
