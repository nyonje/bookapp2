import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, User, Clock, ThumbsUp, Reply } from 'lucide-react';

interface ForumPost {
  id: string;
  author: string;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  tags: string[];
  chapter?: number;
}

interface ForumReply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

export function CommunityForum() {
  const [activeTab, setActiveTab] = useState<'all' | 'questions' | 'progress' | 'tips'>('all');
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: [] as string[] });
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const samplePosts: ForumPost[] = [
    {
      id: '1',
      author: 'Sarah Johnson',
      title: 'Just completed Chapter 1 - Mind blown!',
      content: 'I had no idea that 90% of non-fiction books are never finished. This really puts things into perspective. I\'m already thinking about how I can apply these concepts to my book on productivity.',
      timestamp: '2 hours ago',
      likes: 12,
      replies: 3,
      tags: ['chapter-1', 'motivation'],
      chapter: 1
    },
    {
      id: '2',
      author: 'Mike Chen',
      title: 'Question about the Business Case Calculator',
      content: 'I\'m trying to use the Business Case Calculator tool but I\'m not sure how to estimate my current reader engagement. Any tips on how to measure this effectively?',
      timestamp: '5 hours ago',
      likes: 8,
      replies: 5,
      tags: ['tools', 'business-case', 'question'],
      chapter: 2
    },
    {
      id: '3',
      author: 'Emma Rodriguez',
      title: 'My app plan is ready! 🎉',
      content: 'Just generated my first app plan using the Build App feature. The PRD is incredibly detailed and the prompt is perfect for my no-code platform. Can\'t wait to start building!',
      timestamp: '1 day ago',
      likes: 24,
      replies: 8,
      tags: ['build-app', 'success', 'celebration'],
      chapter: 5
    },
    {
      id: '4',
      author: 'David Kim',
      title: 'Tips for choosing the right development stack',
      content: 'After using the Development Stack Selector, I realized that Bubble.io would be perfect for my needs. The tool really helped me understand the trade-offs between different platforms.',
      timestamp: '2 days ago',
      likes: 15,
      replies: 4,
      tags: ['development', 'tools', 'tips'],
      chapter: 4
    },
    {
      id: '5',
      author: 'Lisa Thompson',
      title: 'How do you stay motivated during the 7-week plan?',
      content: 'I\'m on week 3 of the launch plan and feeling a bit overwhelmed. How do you all stay motivated and on track? Any accountability partners out there?',
      timestamp: '3 days ago',
      likes: 18,
      replies: 12,
      tags: ['motivation', 'accountability', '7-week-plan'],
      chapter: 5
    }
  ];

  const sampleReplies: ForumReply[] = [
    {
      id: 'r1',
      author: 'Alex Smith',
      content: 'Great question! I found that surveying my email list was the most effective way. I asked about their biggest challenges and how they currently consume content.',
      timestamp: '4 hours ago',
      likes: 3
    },
    {
      id: 'r2',
      author: 'Jennifer Lee',
      content: 'I used social media polls to get quick feedback. Also, look at your book reviews on Amazon - they often mention what readers struggled with.',
      timestamp: '3 hours ago',
      likes: 2
    },
    {
      id: 'r3',
      author: 'Robert Wilson',
      content: 'Don\'t forget to check your book\'s analytics if you have any. I found that the chapters with the most highlighting were the ones readers struggled with most.',
      timestamp: '2 hours ago',
      likes: 1
    }
  ];

  const filteredPosts = samplePosts.filter(post => {
    if (activeTab === 'all') return true;
    if (activeTab === 'questions') return post.tags.includes('question');
    if (activeTab === 'progress') return post.tags.includes('success') || post.tags.includes('motivation');
    if (activeTab === 'tips') return post.tags.includes('tips');
    return true;
  });

  const handleLike = (postId: string) => {
    // In a real app, this would update the database
    console.log('Liked post:', postId);
  };

  const handleReply = (postId: string) => {
    setSelectedPost(samplePosts.find(p => p.id === postId) || null);
  };

  const handleSubmitPost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      // In a real app, this would save to the database
      console.log('New post:', newPost);
      setNewPost({ title: '', content: '', tags: [] });
      setShowNewPostForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Community Forum</h2>
          <p className="text-slate-600">Connect with fellow app builders, ask questions, and share your progress</p>
        </div>
        <button
          onClick={() => setShowNewPostForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          New Post
        </button>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Create New Post</h3>
            <button
              onClick={() => setShowNewPostForm(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What's on your mind?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your thoughts, questions, or progress..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNewPostForm(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPost}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'all'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Posts
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'questions'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Questions
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'progress'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Progress
        </button>
        <button
          onClick={() => setActiveTab('tips')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'tips'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Tips
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-slate-900">{post.author}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-sm text-slate-500">{post.timestamp}</span>
                  {post.chapter && (
                    <>
                      <span className="text-slate-400">•</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        Chapter {post.chapter}
                      </span>
                    </>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{post.title}</h3>
                <p className="text-slate-600 mb-4">{post.content}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {/* Actions */}
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-1 text-slate-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  
                  <button
                    onClick={() => handleReply(post.id)}
                    className="flex items-center space-x-1 text-slate-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Reply className="w-4 h-4" />
                    <span className="text-sm">{post.replies}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-slate-500 hover:text-blue-600 transition-colors duration-200">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Post Details */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Post Details</h3>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">{selectedPost.title}</h4>
                  <p className="text-slate-600">{selectedPost.content}</p>
                </div>
                
                <div className="border-t border-slate-200 pt-4">
                  <h5 className="font-medium text-slate-900 mb-3">Replies</h5>
                  <div className="space-y-3">
                    {sampleReplies.map((reply) => (
                      <div key={reply.id} className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-slate-900">{reply.author}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-sm text-slate-500">{reply.timestamp}</span>
                        </div>
                        <p className="text-slate-600">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 