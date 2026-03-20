import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CGU from './pages/CGU';
import Policy from './pages/Policy';
import './style.css'; // Ton CSS global

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/politique-de-confidentialite" element={<Policy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;