import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, Copy, Download, Image, Hash, MessageCircle } from 'lucide-react';

interface Template {
  id: string;
  platform: string;
  category: string;
  title: string;
  content: string;
  hashtags: string[];
  imageDescription: string;
  bestTime: string;
  engagement: string;
}

export function SocialMediaTemplatesPack() {
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookInfo, setBookInfo] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    launchDate: '',
    price: ''
  });

  const templates: Template[] = [
    // Instagram Templates
    {
      id: '1',
      platform: 'Instagram',
      category: 'Launch',
      title: 'Book Launch Announcement',
      content: '🎉 IT\'S HERE! My new book "[BOOK_TITLE]" is now available! 📚\n\nAfter [X] months of writing, editing, and dreaming, I\'m thrilled to share this story with you.\n\nWhat\'s it about? [BRIEF_DESCRIPTION]\n\nPerfect for readers who love [GENRE] books with [KEY_ELEMENTS].\n\n📖 Available now on [PLATFORMS]\n💰 Price: $[PRICE]\n\nThank you to everyone who supported me on this journey! 🙏\n\n#amwriting #booklaunch #indieauthor #newbook #bookstagram',
      hashtags: ['#amwriting', '#booklaunch', '#indieauthor', '#newbook', '#bookstagram'],
      imageDescription: 'Book cover with launch announcement overlay, author photo, or book flatlay',
      bestTime: '9 AM - 11 AM or 7 PM - 9 PM',
      engagement: 'High - Launch posts typically get 2-3x more engagement'
    },
    {
      id: '2',
      platform: 'Instagram',
      category: 'Behind the Scenes',
      title: 'Writing Process',
      content: '📝 Behind the scenes of "[BOOK_TITLE]"\n\nThis scene took me [X] drafts to get right. Sometimes the words flow like a river, other times it\'s like pulling teeth! 😅\n\nWhat you don\'t see: the coffee cups, the late nights, the moments of doubt, and the pure joy when it finally clicks.\n\nWriting is a journey, not a destination. Every word, every edit, every rejection makes us stronger.\n\nWhat\'s your biggest writing challenge? Share below! 👇\n\n#amwriting #writerslife #authorlife #writingprocess #indieauthor',
      hashtags: ['#amwriting', '#writerslife', '#authorlife', '#writingprocess', '#indieauthor'],
      imageDescription: 'Writing desk, coffee cup, notebook, or laptop with manuscript',
      bestTime: '2 PM - 4 PM',
      engagement: 'Medium - Good for building community'
    },
    {
      id: '3',
      platform: 'Instagram',
      category: 'Reader Engagement',
      title: 'Book Quote',
      content: '💭 "Quote from your book"\n\nThis line from "[BOOK_TITLE]" still gives me chills every time I read it.\n\nSometimes the words write themselves, and you just know they\'re meant to be shared.\n\nWhat\'s a quote from a book that stuck with you? 📚\n\n#bookquotes #amreading #bookstagram #indieauthor #booklove',
      hashtags: ['#bookquotes', '#amreading', '#bookstagram', '#indieauthor', '#booklove'],
      imageDescription: 'Quote text overlay on book cover or elegant typography',
      bestTime: '6 PM - 8 PM',
      engagement: 'High - Quote posts are highly shareable'
    },

    // Facebook Templates
    {
      id: '4',
      platform: 'Facebook',
      category: 'Launch',
      title: 'Book Launch Celebration',
      content: '🎉 BIG NEWS! My new book "[BOOK_TITLE]" is officially live!\n\nThis has been a labor of love, and I\'m so excited to finally share it with the world. The journey from idea to published book has been incredible.\n\nAbout the book: [DESCRIPTION]\n\nPerfect for fans of [SIMILAR_AUTHORS] and [GENRE] lovers.\n\n📚 Available on Amazon, Barnes & Noble, and your favorite bookstores\n💰 Paperback: $[PRICE] | eBook: $[EBOOK_PRICE]\n\nA huge thank you to my beta readers, editor, and everyone who supported me along the way. This wouldn\'t be possible without you!\n\nIf you read it, I\'d love to hear your thoughts. Reviews mean the world to indie authors! ❤️',
      hashtags: ['#booklaunch', '#newbook', '#indieauthor', '#amwriting'],
      imageDescription: 'Book cover with launch banner, author photo, or book stack',
      bestTime: '1 PM - 3 PM or 7 PM - 9 PM',
      engagement: 'High - Facebook users engage well with personal stories'
    },
    {
      id: '5',
      platform: 'Facebook',
      category: 'Community',
      title: 'Reader Appreciation',
      content: '📚 To everyone who has read "[BOOK_TITLE]" - THANK YOU!\n\nYour messages, reviews, and support mean more than words can express. Every time someone tells me they couldn\'t put the book down, my heart soars.\n\nWriting can be lonely, but knowing my words are reaching readers makes it all worthwhile.\n\nSpecial shoutout to the book clubs, bloggers, and reviewers who have shared my work. You\'re the real MVPs! 🙏\n\nWhat\'s the last book that made you stay up late reading? Share below! 👇',
      hashtags: ['#readerappreciation', '#booklove', '#indieauthor', '#amreading'],
      imageDescription: 'Thank you message with book cover or reading scene',
      bestTime: '6 PM - 8 PM',
      engagement: 'High - Gratitude posts perform well'
    },

    // Twitter Templates
    {
      id: '6',
      platform: 'Twitter',
      category: 'Launch',
      title: 'Book Launch Tweet',
      content: '🚀 IT\'S LIVE! My new book "[BOOK_TITLE]" is now available!\n\n[GENRE] fans, this one\'s for you. Think [COMPARISON] meets [COMPARISON].\n\n📖 Available on Amazon\n💰 $[PRICE]\n\nRT if you love [GENRE] books! 📚\n\n#amwriting #booklaunch #indieauthor',
      hashtags: ['#amwriting', '#booklaunch', '#indieauthor'],
      imageDescription: 'Book cover image',
      bestTime: '9 AM - 11 AM or 1 PM - 3 PM',
      engagement: 'Medium - Twitter moves fast, timing is crucial'
    },
    {
      id: '7',
      platform: 'Twitter',
      category: 'Writing Tips',
      title: 'Writing Advice',
      content: '💡 Writing tip: [TIP]\n\nI learned this while writing "[BOOK_TITLE]". Sometimes the best scenes come from the most unexpected places.\n\nWhat\'s your favorite writing tip? Share below! 👇\n\n#amwriting #writingtips #indieauthor #writingcommunity',
      hashtags: ['#amwriting', '#writingtips', '#indieauthor', '#writingcommunity'],
      imageDescription: 'Tip text or writing scene',
      bestTime: '10 AM - 12 PM',
      engagement: 'Medium - Educational content performs well'
    },
    {
      id: '8',
      platform: 'Twitter',
      category: 'Reader Engagement',
      title: 'Book Quote Tweet',
      content: '"Quote from your book"\n\n- [BOOK_TITLE]\n\nThis line still gives me chills. Sometimes the words write themselves.\n\nWhat\'s a quote that stuck with you? 📚\n\n#bookquotes #amreading #indieauthor',
      hashtags: ['#bookquotes', '#amreading', '#indieauthor'],
      imageDescription: 'Quote text or book cover',
      bestTime: '7 PM - 9 PM',
      engagement: 'High - Quote tweets are highly retweetable'
    }
  ];

  const platforms = ['All', 'Instagram', 'Facebook', 'Twitter'];
  const categories = ['All', 'Launch', 'Behind the Scenes', 'Reader Engagement', 'Community', 'Writing Tips'];

  const filteredTemplates = templates.filter(template => {
    const platformMatch = selectedPlatform === 'All' || template.platform === selectedPlatform;
    const categoryMatch = selectedCategory === 'All' || template.category === selectedCategory;
    return platformMatch && categoryMatch;
  });

  const customizeTemplate = (template: Template) => {
    let customized = template.content;
    
    if (bookInfo.title) {
      customized = customized.replace(/\[BOOK_TITLE\]/g, bookInfo.title);
    }
    if (bookInfo.author) {
      customized = customized.replace(/\[AUTHOR\]/g, bookInfo.author);
    }
    if (bookInfo.genre) {
      customized = customized.replace(/\[GENRE\]/g, bookInfo.genre);
    }
    if (bookInfo.description) {
      customized = customized.replace(/\[BRIEF_DESCRIPTION\]/g, bookInfo.description);
      customized = customized.replace(/\[DESCRIPTION\]/g, bookInfo.description);
    }
    if (bookInfo.launchDate) {
      customized = customized.replace(/\[LAUNCH_DATE\]/g, bookInfo.launchDate);
    }
    if (bookInfo.price) {
      customized = customized.replace(/\[PRICE\]/g, bookInfo.price);
      customized = customized.replace(/\[EBOOK_PRICE\]/g, (parseFloat(bookInfo.price) * 0.7).toFixed(2));
    }
    
    return customized;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const downloadTemplate = (template: Template) => {
    const customized = customizeTemplate(template);
    const data = {
      platform: template.platform,
      category: template.category,
      title: template.title,
      content: customized,
      hashtags: template.hashtags,
      imageDescription: template.imageDescription,
      bestTime: template.bestTime,
      engagement: template.engagement
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${template.platform.toLowerCase()}-${template.category.toLowerCase()}-template.json`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Social Media Templates Pack</h2>
            <p className="text-pink-100">Ready-to-use templates for Instagram, Facebook, and Twitter</p>
          </div>
          <div className="flex items-center space-x-4">
            <Instagram className="w-8 h-8" />
            <Facebook className="w-8 h-8" />
            <Twitter className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Book Information */}
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Book Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Book Title</label>
            <input
              type="text"
              value={bookInfo.title}
              onChange={(e) => setBookInfo(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter your book title"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Author Name</label>
            <input
              type="text"
              value={bookInfo.author}
              onChange={(e) => setBookInfo(prev => ({ ...prev, author: e.target.value }))}
              placeholder="Your name"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Genre</label>
            <input
              type="text"
              value={bookInfo.genre}
              onChange={(e) => setBookInfo(prev => ({ ...prev, genre: e.target.value }))}
              placeholder="e.g., Romance, Mystery, Fantasy"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Book Price</label>
            <input
              type="text"
              value={bookInfo.price}
              onChange={(e) => setBookInfo(prev => ({ ...prev, price: e.target.value }))}
              placeholder="e.g., 24.99"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Brief Description</label>
            <textarea
              value={bookInfo.description}
              onChange={(e) => setBookInfo(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of your book (1-2 sentences)"
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Platform</label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Templates */}
      <div className="space-y-6">
        {filteredTemplates.map(template => (
          <div key={template.id} className="bg-white rounded-lg p-6 border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {template.platform === 'Instagram' && <Instagram className="w-5 h-5 text-pink-600" />}
                {template.platform === 'Facebook' && <Facebook className="w-5 h-5 text-blue-600" />}
                {template.platform === 'Twitter' && <Twitter className="w-5 h-5 text-blue-400" />}
                <div>
                  <h3 className="font-semibold text-slate-900">{template.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <span>{template.platform}</span>
                    <span>•</span>
                    <span>{template.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => copyToClipboard(customizeTemplate(template))}
                  className="flex items-center space-x-1 px-3 py-1 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 text-sm"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={() => downloadTemplate(template)}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Customized Content</h4>
                <div className="bg-slate-50 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm text-slate-700">{customizeTemplate(template)}</pre>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Hashtags</h4>
                  <div className="flex flex-wrap gap-2">
                    {template.hashtags.map((hashtag, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        {hashtag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Image Description</h4>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Image className="w-4 h-4" />
                    <span>{template.imageDescription}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Best Posting Time</h4>
                  <div className="text-sm text-slate-600">{template.bestTime}</div>
                  <div className="text-xs text-slate-500 mt-1">{template.engagement}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-purple-50 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Template Usage Tips</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <MessageCircle className="w-4 h-4 text-purple-600 mt-0.5" />
            <span className="text-slate-700">Customize templates with your book details for authenticity</span>
          </div>
          <div className="flex items-start space-x-3">
            <Hash className="w-4 h-4 text-purple-600 mt-0.5" />
            <span className="text-slate-700">Use relevant hashtags to increase discoverability</span>
          </div>
          <div className="flex items-start space-x-3">
            <Image className="w-4 h-4 text-purple-600 mt-0.5" />
            <span className="text-slate-700">Always include high-quality images with your posts</span>
          </div>
          <div className="flex items-start space-x-3">
            <MessageCircle className="w-4 h-4 text-purple-600 mt-0.5" />
            <span className="text-slate-700">Engage with comments and messages to build community</span>
          </div>
        </div>
      </div>
    </div>
  );
} 