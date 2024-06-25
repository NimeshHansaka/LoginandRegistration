
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Frogotpassword from './Components/FrogotPassword/Frogotpassword';

import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Header from './Components/NavBar/Header';
import Profile from './Components/Profile/Profile';
import Register from './Components/Register/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header />
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/frogot" element={<Frogotpassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;