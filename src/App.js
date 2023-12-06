import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Root from './components/Root/Root';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Logout from './components/Login/Logout';
import Profile from './components/Profile/Profile';
import WeightTracker from './components/WeightTracker/WeightTracker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/weight" element={<WeightTracker />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
