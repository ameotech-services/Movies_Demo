import logo from './logo.svg';
import './App.css';
import '../src/assets/css/responsive.css';
import { Routes, Route } from 'react-router-dom';
import Login from './component/auth/Login';
import MovieList from './component/main/MovieList';
import CreateMovie from './component/main/CreateMovie';
import { ToastContainer, toast } from "react-toastify";
import PrivateRoute from './routes/PrivateRoutes';
import EditMovie from './component/main/EditMovie';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/movieList"} element={<PrivateRoute><MovieList /></PrivateRoute>}/>
        <Route path={"/createMovie"} element={<PrivateRoute><CreateMovie /></PrivateRoute>}/>
        <Route path={"/editMovie/:movieId"} element={<PrivateRoute><EditMovie /></PrivateRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
