import React, { useState } from 'react';
import { User, Mail, Edit3, Save, X, Camera, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const { user, updateProfile, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    avatar_url: user?.avatar_url || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await updateProfile({
        full_name: formData.full_name,
        avatar_url: formData.avatar_url
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const cancelEdit = () => {
    setFormData({
      full_name: user?.full_name || '',
      avatar_url: user?.avatar_url || ''
    });
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Profile</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">{success}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Profile Content */}
          <div className="space-y-6">
            {/* Avatar */}
            <div className="text-center">
              <div className="relative inline-block">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.full_name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                )}
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    value={isEditing ? formData.full_name : user.full_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                    className={`w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg ${
                      isEditing 
                        ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                        : 'bg-slate-50 cursor-not-allowed'
                    }`}
                    placeholder="Enter your full name"
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>

              {/* Email (Read Only) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    value={user.email}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg bg-slate-50 cursor-not-allowed"
                    disabled
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Email cannot be changed. Contact support if needed.
                </p>
              </div>

              {/* Avatar URL (Editing Only) */}
              {isEditing && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Avatar URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, avatar_url: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex-1 px-4 py-3 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </form>

            {/* Sign Out Button */}
            {!isEditing && (
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-3 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}