import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context";
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Prediction from './pages/Prediction';
import Hospital from './pages/Hospital';
import Feedback from './pages/Feedback';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-[#EBF4F6] via-[#7AB2B2]/20 to-[#EBF4F6]">
          <Navbar />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/predict" element={<Prediction />} />
              <Route path="/hospitals" element={<Hospital />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;