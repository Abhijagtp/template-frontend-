// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TemplateDetails from './pages/TemplateDetails';
import CategoryPage from './pages/CategoryPage';
import BlogPost1 from './pages/BlogPost1';
import BlogPost2 from './pages/BlogPost2';
import PaymentStatus from './pages/PaymentStatus';
import SupportForm from './components/SupportForm';
import SupportTrack from './components/SupportTrack';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
        <Route path="/support" element={<ErrorBoundary><SupportForm /></ErrorBoundary>} />
        <Route path="/support/track" element={<ErrorBoundary><SupportTrack /></ErrorBoundary>} />
        <Route path="/template/:id" element={<ErrorBoundary><TemplateDetails /></ErrorBoundary>} />
        <Route path="/category/:categoryId" element={<ErrorBoundary><CategoryPage /></ErrorBoundary>} />
        <Route path="/blog/how-to-build-a-standout-portfolio" element={<ErrorBoundary><BlogPost1 /></ErrorBoundary>} />
        <Route path="/blog/top-5-resume-mistakes-to-avoid" element={<ErrorBoundary><BlogPost2 /></ErrorBoundary>} />
        <Route path="/payment-status" element={<ErrorBoundary><PaymentStatus /></ErrorBoundary>} />
      </Routes>
    </Router>
  );
}

export default App;