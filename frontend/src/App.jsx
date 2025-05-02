import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import Home from './pages/home';
import BusinessPlan from './pages/business-plan';
import Dashboard from './pages/dashboard';
import AiMentor from './pages/ai-mentor';
import Feedback from './pages/feedback';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/forgot-password';
import Terms from './pages/terms';
import Privacy from './pages/privacy';
import Contact from './pages/contact';
import FeaturesPage from './pages/features';
import About from './pages/about';
import NotFound from './pages/not-found';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute';

// Component for pages under construction
const PageUnderConstruction = ({ title }) => (
  <div className="py-20 px-4 min-h-screen">
    <div className="container mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">{title}</h1>
      <div className="w-24 h-24 mx-auto mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      </div>
      <p className="text-xl text-slate-300 mb-8">
        We're working hard to build this page. Please check back soon!
      </p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<PageLayout><Home /></PageLayout>} />
            <Route path="/terms" element={<PageLayout><Terms /></PageLayout>} />
            <Route path="/privacy" element={<PageLayout><Privacy /></PageLayout>} />
            <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
            <Route path="/features" element={<PageLayout><FeaturesPage /></PageLayout>} />
            <Route path="/about" element={<PageLayout><About /></PageLayout>} />
            
            {/* Placeholder routes for the pages under construction */}
            <Route path="/case-studies" element={<PageLayout><PageUnderConstruction title="Case Studies" /></PageLayout>} />
            <Route path="/documentation" element={<PageLayout><PageUnderConstruction title="Documentation" /></PageLayout>} />
            <Route path="/api" element={<PageLayout><PageUnderConstruction title="API Reference" /></PageLayout>} />
            <Route path="/careers" element={<PageLayout><PageUnderConstruction title="Careers" /></PageLayout>} />
            <Route path="/blog" element={<PageLayout><PageUnderConstruction title="Blog" /></PageLayout>} />
            <Route path="/press" element={<PageLayout><PageUnderConstruction title="Press" /></PageLayout>} />
            <Route path="/partners" element={<PageLayout><PageUnderConstruction title="Partners" /></PageLayout>} />
            <Route path="/support" element={<PageLayout><PageUnderConstruction title="Support" /></PageLayout>} />
            <Route path="/help" element={<PageLayout><PageUnderConstruction title="Help Center" /></PageLayout>} />
            <Route path="/status" element={<PageLayout><PageUnderConstruction title="System Status" /></PageLayout>} />
            <Route path="/cookies" element={<PageLayout><PageUnderConstruction title="Cookie Policy" /></PageLayout>} />
            <Route path="/sitemap" element={<PageLayout><PageUnderConstruction title="Sitemap" /></PageLayout>} />

            {/* Authentication routes - only for non-authenticated users */}
            <Route path="/login" element={
              <PageLayout>
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              </PageLayout>
            } />
            <Route path="/register" element={
              <PageLayout>
                <PublicOnlyRoute>
                  <Register />
                </PublicOnlyRoute>
              </PageLayout>
            } />
            <Route path="/forgot-password" element={
              <PageLayout>
                <PublicOnlyRoute>
                  <ForgotPassword />
                </PublicOnlyRoute>
              </PageLayout>
            } />

            {/* Protected routes - only for authenticated users */}
            <Route path="/business-plan" element={
              <PageLayout>
                <ProtectedRoute>
                  <BusinessPlan />
                </ProtectedRoute>
              </PageLayout>
            } />
            <Route path="/dashboard" element={
              <PageLayout>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </PageLayout>
            } />
            <Route path="/ai-mentor" element={
              <PageLayout>
                <ProtectedRoute>
                  <AiMentor />
                </ProtectedRoute>
              </PageLayout>
            } />
            <Route path="/feedback" element={
              <PageLayout>
                <ProtectedRoute>
                  <Feedback />
                </ProtectedRoute>
              </PageLayout>
            } />
            
            {/* 404 page */}
            <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
          </Routes>
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;