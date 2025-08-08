import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { ChapterDetail } from './pages/ChapterDetail'; 
import { Tools } from './pages/Tools';
import { BuildApp } from './pages/BuildApp';
import { Community } from './pages/Community';
import { Progress } from './pages/Progress';
import { Search } from './pages/Search';
import { MarketingVault } from './pages/MarketingVault';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/chapter/:chapterId" element={
                  <ProtectedRoute>
                    <ChapterDetail />
                  </ProtectedRoute>
                } />
                <Route path="/tools" element={
                  <ProtectedRoute>
                    <Tools />
                  </ProtectedRoute>
                } />
                <Route path="/build-app" element={
                  <ProtectedRoute>
                    <BuildApp />
                  </ProtectedRoute>
                } />
                <Route path="/marketing-vault" element={
                  <ProtectedRoute>
                    <MarketingVault />
                  </ProtectedRoute>
                } />
                <Route path="/community" element={
                  <ProtectedRoute>
                    <Community />
                  </ProtectedRoute>
                } />
                <Route path="/progress" element={
                  <ProtectedRoute>
                    <Progress />
                  </ProtectedRoute>
                } />
                <Route path="/search" element={
                  <ProtectedRoute>
                    <Search />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
          </div>
        </Router>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;