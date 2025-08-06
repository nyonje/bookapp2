import React, { useState } from 'react';
import { Calendar, Instagram, Facebook, Twitter, Linkedin, Plus, Trash2, Edit3 } from 'lucide-react';

interface ContentPost {
  id: string;
  platform: string;
  contentType: string;
  title: string;
  description: string;
  scheduledDate: string;
  status: 'draft' | 'scheduled' | 'published';
  hashtags: string[];
}

export function SocialMediaContentPlanner() {
  const [posts, setPosts] = useState<ContentPost[]>([]);
  const [showAddPost, setShowAddPost] = useState(false);

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-blue-400' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' }
  ];

  const contentTypes = [
    'Book Quote',
    'Behind the Scenes',
    'Author Interview',
    'Book Review',
    'Writing Tips',
    'Book Launch Announcement'
  ];

  const generatePostId = () => Math.random().toString(36).substr(2, 9);

  const addPost = (postData: Omit<ContentPost, 'id'>) => {
    const newPost: ContentPost = {
      ...postData,
      id: generatePostId(),
      status: 'draft'
    };
    setPosts([...posts, newPost]);
    setShowAddPost(false);
  };

  const deletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Content Calendar</h3>
        <button
          onClick={() => setShowAddPost(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Post</span>
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No posts scheduled</h3>
            <p className="text-slate-600">Start planning your content by adding your first post!</p>
          </div>
        ) : (
          posts.map(post => {
            const platform = platforms.find(p => p.id === post.platform);
            const PlatformIcon = platform?.icon || Instagram;
            
            return (
              <div key={post.id} className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${platform?.color} text-white`}>
                      <PlatformIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-slate-900">{post.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          post.status === 'published' ? 'bg-green-100 text-green-700' :
                          post.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-2">{post.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span>{post.scheduledDate}</span>
                        <span>{post.contentType}</span>
                      </div>
                      {post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.hashtags.map(tag => (
                            <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="p-2 text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Post Modal */}
      {showAddPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Add New Post</h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const postData: Omit<ContentPost, 'id'> = {
                platform: formData.get('platform') as string,
                contentType: formData.get('contentType') as string,
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                scheduledDate: formData.get('scheduledDate') as string,
                status: 'draft',
                hashtags: (formData.get('hashtags') as string).split(',').map(tag => tag.trim()).filter(Boolean)
              };
              addPost(postData);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Platform</label>
                  <select
                    name="platform"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {platforms.map(platform => (
                      <option key={platform.id} value={platform.id}>{platform.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Content Type</label>
                  <select
                    name="contentType"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {contentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Scheduled Date</label>
                  <input
                    type="date"
                    name="scheduledDate"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Hashtags (comma-separated)</label>
                  <input
                    type="text"
                    name="hashtags"
                    placeholder="#bookstagram, #authorlife, #writing"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddPost(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 