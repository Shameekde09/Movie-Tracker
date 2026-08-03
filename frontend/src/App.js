import './App.css';

import MovieForm from './MovieCuratorComponents/MovieForm';
import MovieCuratorNavbar from './MovieCuratorComponents/MovieCuratorNavbar';
import ViewMovie from './MovieCuratorComponents/ViewMovie';
import ErrorPage from './Components/ErrorPage';
import HomePage from './Components/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>

      <MovieCuratorNavbar />

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/newmovie" element={<MovieForm />} />

        <Route path="/viewmovie" element={<ViewMovie />} />

        <Route path="/editmovie/:id" element={<MovieForm />} />

        <Route
          path="/error/400"
          element={<ErrorPage statusCode={400} message="Bad Request" />}
        />

        <Route
          path="/error/404"
          element={<ErrorPage statusCode={404} message="Page Not Found" />}
        />

        <Route
          path="/error/500"
          element={<ErrorPage statusCode={500} message="Internal Server Error" />}
        />

        <Route
          path="*"
          element={<ErrorPage statusCode={404} message="Page Not Found" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
