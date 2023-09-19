import './App.css';

import Signup from './components/Signup';
import Login from './components/Login';
import Feed from './components/Feed';
import Profile from './components/Profile';
import PriavteRoute from './components/PrivateRoute';
import Ioa from './components/Ioa';
import { AuthProvider } from './Context/AuthContext';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/:id" element={<PriavteRoute><Profile /></PriavteRoute>} />
          <Route path="/" element={<PriavteRoute><Feed /></PriavteRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
