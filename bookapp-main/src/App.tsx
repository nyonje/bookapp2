import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { ChapterDetail } from './pages/ChapterDetail'; 
import { Tools } from './pages/Tools';
import { Community } from './pages/Community';
import { Progress } from './pages/Progress';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/chapter/:chapterId" element={<ChapterDetail />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/community" element={<Community />} />
                <Route path="/progress" element={<Progress />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;