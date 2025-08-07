import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { Lock, BookOpen } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Sign In Required
              </h2>
              
              <p className="text-slate-600 mb-6">
                Please sign in to access your learning progress, save your work, and unlock all features.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Sign In to Continue
                </button>
                
                <p className="text-sm text-slate-500">
                  Don't have an account? The sign-in modal also allows you to create one.
                </p>
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <BookOpen className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-slate-900">Why sign in?</span>
                </div>
                <ul className="text-sm text-slate-600 space-y-1 text-left">
                  <li>• Save your learning progress across devices</li>
                  <li>• Access premium features and tools</li>
                  <li>• Join the community discussions</li>
                  <li>• Get personalized recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultMode="signin"
        />
      </>
    );
  }

  return <>{children}</>;
}