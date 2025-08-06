import React, { useState } from 'react';
import { Mail, Copy, Download, Send, Users, TrendingUp, Calendar } from 'lucide-react';

interface EmailSequence {
  id: string;
  name: string;
  purpose: string;
  emails: Email[];
  totalDays: number;
  category: string;
}

interface Email {
  id: string;
  subject: string;
  preview: string;
  content: string;
  day: number;
  type: 'Welcome' | 'Nurture' | 'Promotional' | 'Launch' | 'Follow-up';
}

export function EmailMarketingSequences() {
  const [selectedSequence, setSelectedSequence] = useState<string>('');
  const [bookInfo, setBookInfo] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    launchDate: '',
    price: '',
    website: '',
    socialMedia: ''
  });

  const sequences: EmailSequence[] = [
    {
      id: 'welcome-sequence',
      name: 'Welcome Sequence',
      purpose: 'Introduce new subscribers to your author brand and build trust',
      category: 'Onboarding',
      totalDays: 7,
      emails: [
        {
          id: 'welcome-1',
          subject: 'Welcome to the [AUTHOR_NAME] Community! 📚',
          preview: 'Thank you for joining! Here\'s what you can expect...',
          content: `Hi [FIRST_NAME],

Welcome to my author community! I'm so excited you're here. 

I'm [AUTHOR_NAME], and I write [GENRE] books that [BRIEF_DESCRIPTION].

What you can expect from me:
• Behind-the-scenes writing updates
• Exclusive book excerpts and sneak peeks
• Early access to new releases
• Writing tips and inspiration
• Personal stories from my author journey

I promise to only send you valuable content that will help you discover great books and maybe even inspire your own creative journey.

Your first exclusive content is coming tomorrow - a sneak peek at my latest work in progress!

Happy reading,
[AUTHOR_NAME]

P.S. Reply to this email and tell me what you're currently reading! I love connecting with fellow book lovers.`,
          day: 1,
          type: 'Welcome'
        },
        {
          id: 'welcome-2',
          subject: 'Exclusive: First Chapter Preview 📖',
          preview: 'Get an exclusive first look at my latest book...',
          content: `Hi [FIRST_NAME],

As promised, here's your exclusive first chapter preview of "[BOOK_TITLE]"!

[CHAPTER_CONTENT]

This book has been my passion project for the past [X] months, and I'm thrilled to share it with you first.

What did you think? I'd love to hear your thoughts! Just hit reply and let me know.

Coming up tomorrow: My top 5 writing tips that helped me finish this book.

Happy reading,
[AUTHOR_NAME]`,
          day: 2,
          type: 'Welcome'
        },
        {
          id: 'welcome-3',
          subject: '5 Writing Tips That Changed Everything ✍️',
          preview: 'The strategies that helped me complete my latest book...',
          content: `Hi [FIRST_NAME],

Today I want to share the 5 writing tips that completely transformed my writing process and helped me finish "[BOOK_TITLE]".

1. Write First, Edit Later
   Don't let perfectionism stop your momentum. Get the words down first.

2. Set Micro-Goals
   Instead of "write a book," try "write 500 words today."

3. Create a Writing Ritual
   Same time, same place, same coffee. Your brain loves routine.

4. Read in Your Genre
   The best writing teachers are the books you love.

5. Trust the Process
   Every first draft is supposed to be messy. That's normal!

Which of these resonates with you? I'd love to hear about your writing journey.

Tomorrow: The story behind "[BOOK_TITLE]" - how this book came to life.

Happy writing,
[AUTHOR_NAME]`,
          day: 3,
          type: 'Welcome'
        },
        {
          id: 'welcome-4',
          subject: 'The Story Behind "[BOOK_TITLE]" 📝',
          preview: 'How this book came to life and why I had to write it...',
          content: `Hi [FIRST_NAME],

Today I want to share the story behind "[BOOK_TITLE]" - how this book came to life and why I had to write it.

It all started with [INSPIRATION_STORY]...

[PERSONAL_STORY_ABOUT_BOOK]

This book taught me [LESSON_LEARNED], and I hope it will inspire you too.

The characters became like family, and saying goodbye to them was bittersweet. But I know their story will live on in the hearts of readers like you.

Tomorrow: Your exclusive invitation to join my beta reader team.

Happy reading,
[AUTHOR_NAME]`,
          day: 4,
          type: 'Welcome'
        },
        {
          id: 'welcome-5',
          subject: 'Exclusive Invitation: Join My Beta Reader Team 🎯',
          preview: 'Be among the first to read my next book...',
          content: `Hi [FIRST_NAME],

I have an exclusive invitation for you!

I'm looking for beta readers for my next book, and I'd love for you to be part of this special group.

As a beta reader, you'll get:
• Early access to my next book (before anyone else!)
• Direct input on the story and characters
• Your name in the acknowledgments
• Exclusive behind-the-scenes content
• A free copy of the final book

This is a limited opportunity - I only work with a small group of beta readers to ensure quality feedback.

If you're interested, just reply with "YES" and I'll send you all the details.

Tomorrow: My favorite books that inspired "[BOOK_TITLE]".

Happy reading,
[AUTHOR_NAME]`,
          day: 5,
          type: 'Welcome'
        },
        {
          id: 'welcome-6',
          subject: 'Books That Inspired "[BOOK_TITLE]" 📚',
          preview: 'My reading list that shaped this story...',
          content: `Hi [FIRST_NAME],

Today I want to share the books that inspired "[BOOK_TITLE]" and shaped my writing journey.

[BOOK_RECOMMENDATIONS]

Each of these books taught me something different about storytelling, character development, and the craft of writing.

What books have inspired you lately? I'm always looking for new recommendations!

Tomorrow: Your final welcome email with a special surprise.

Happy reading,
[AUTHOR_NAME]`,
          day: 6,
          type: 'Welcome'
        },
        {
          id: 'welcome-7',
          subject: 'Your Special Gift + What\'s Next 🎁',
          preview: 'A free resource just for you...',
          content: `Hi [FIRST_NAME],

Thank you for being part of my author community! I've loved getting to know you through these emails.

As a special thank you, I've created a free resource just for you: "[FREE_RESOURCE_NAME]"

[RESOURCE_DESCRIPTION]

You can download it here: [DOWNLOAD_LINK]

What's next?
• I'll send you weekly updates about my writing journey
• Monthly book recommendations
• Exclusive sneak peeks at new projects
• Behind-the-scenes content from my author life

I'm so grateful you're here, and I can't wait to share more stories with you.

Happy reading,
[AUTHOR_NAME]

P.S. If you loved this welcome sequence, would you mind sharing it with a fellow book lover? Just forward this email to them!`,
          day: 7,
          type: 'Welcome'
        }
      ]
    },
    {
      id: 'launch-sequence',
      name: 'Book Launch Sequence',
      purpose: 'Build excitement and drive sales for your book launch',
      category: 'Launch',
      totalDays: 14,
      emails: [
        {
          id: 'launch-1',
          subject: 'Big News: "[BOOK_TITLE]" Launch Date Announced! 🚀',
          preview: 'The countdown begins...',
          content: `Hi [FIRST_NAME],

I have BIG news to share!

"[BOOK_TITLE]" will be officially launching on [LAUNCH_DATE]!

This has been a labor of love, and I'm so excited to finally share this story with the world.

Over the next two weeks, I'll be sharing:
• Exclusive behind-the-scenes content
• Character spotlights
• Early reviews from beta readers
• Pre-order bonuses and special offers
• Launch day celebration details

The countdown begins now! Are you ready for this journey?

Happy reading,
[AUTHOR_NAME]`,
          day: 1,
          type: 'Launch'
        },
        {
          id: 'launch-2',
          subject: 'Meet the Characters: [CHARACTER_NAME] 👤',
          preview: 'Get to know the characters from "[BOOK_TITLE]"...',
          content: `Hi [FIRST_NAME],

Today I want to introduce you to [CHARACTER_NAME], one of the main characters from "[BOOK_TITLE]".

[CHARACTER_DESCRIPTION]

[CHARACTER_BACKSTORY]

This character taught me [LESSON_ABOUT_CHARACTER], and I hope you'll love them as much as I do.

Tomorrow: Another character spotlight!

Happy reading,
[AUTHOR_NAME]`,
          day: 2,
          type: 'Launch'
        },
        {
          id: 'launch-3',
          subject: 'Early Reviews Are In! ⭐',
          preview: 'See what beta readers are saying about "[BOOK_TITLE]"...',
          content: `Hi [FIRST_NAME],

The early reviews for "[BOOK_TITLE]" are starting to come in, and I'm overwhelmed by the response!

Here's what beta readers are saying:

"[POSITIVE_QUOTE_1]"
- [REVIEWER_NAME]

"[POSITIVE_QUOTE_2]"
- [REVIEWER_NAME]

"[POSITIVE_QUOTE_3]"
- [REVIEWER_NAME]

These reviews mean the world to me. Thank you to everyone who took the time to read and provide feedback.

Tomorrow: Pre-order bonuses revealed!

Happy reading,
[AUTHOR_NAME]`,
          day: 3,
          type: 'Launch'
        },
        {
          id: 'launch-4',
          subject: 'Pre-Order Bonuses Revealed! 🎁',
          preview: 'Special gifts for early supporters...',
          content: `Hi [FIRST_NAME],

Today I'm excited to reveal the special bonuses for pre-ordering "[BOOK_TITLE]"!

Pre-order bonuses include:
• Exclusive deleted scenes
• Character interview Q&A
• Behind-the-scenes writing notes
• Signed bookplate (while supplies last)
• Access to private launch party

Pre-order here: [PRE_ORDER_LINK]

These bonuses are only available for pre-orders, so don't miss out!

Tomorrow: Another character spotlight!

Happy reading,
[AUTHOR_NAME]`,
          day: 4,
          type: 'Launch'
        },
        {
          id: 'launch-5',
          subject: 'Meet the Characters: [CHARACTER_NAME] 👤',
          preview: 'Get to know another character from "[BOOK_TITLE]"...',
          content: `Hi [FIRST_NAME],

Today I want to introduce you to [CHARACTER_NAME], another important character from "[BOOK_TITLE]".

[CHARACTER_DESCRIPTION]

[CHARACTER_BACKSTORY]

This character was inspired by [INSPIRATION], and I hope you'll find them as compelling as I do.

Tomorrow: Behind-the-scenes writing process!

Happy reading,
[AUTHOR_NAME]`,
          day: 5,
          type: 'Launch'
        },
        {
          id: 'launch-6',
          subject: 'Behind the Scenes: Writing "[BOOK_TITLE]" 📝',
          preview: 'The story behind the story...',
          content: `Hi [FIRST_NAME],

Today I want to share the behind-the-scenes story of writing "[BOOK_TITLE]".

[WRITING_PROCESS_STORY]

The most challenging part was [CHALLENGE], but the most rewarding was [REWARD].

I learned so much about [LESSON_LEARNED] while writing this book, and I hope those lessons come through in the story.

Tomorrow: Launch party details!

Happy reading,
[AUTHOR_NAME]`,
          day: 6,
          type: 'Launch'
        },
        {
          id: 'launch-7',
          subject: 'Launch Party Details! 🎉',
          preview: 'Join the celebration for "[BOOK_TITLE]"...',
          content: `Hi [FIRST_NAME],

The launch party for "[BOOK_TITLE]" is just [X] days away!

Here are the details:

📅 Date: [LAUNCH_DATE]
⏰ Time: [LAUNCH_TIME]
📍 Location: [LAUNCH_LOCATION/ONLINE_DETAILS]

What to expect:
• Live reading from the book
• Q&A session
• Special giveaways
• Behind-the-scenes stories
• Virtual meet & greet

RSVP here: [RSVP_LINK]

I can't wait to celebrate with you!

Tomorrow: Final countdown begins!

Happy reading,
[AUTHOR_NAME]`,
          day: 7,
          type: 'Launch'
        },
        {
          id: 'launch-8',
          subject: 'Final Countdown: 7 Days Until Launch! ⏰',
          preview: 'The excitement is building...',
          content: `Hi [FIRST_NAME],

We're in the final countdown! Just 7 days until "[BOOK_TITLE]" launches!

The excitement is building, and I'm so grateful for your support throughout this journey.

Don't forget:
• Pre-order bonuses are still available
• Launch party is this [DAY_OF_WEEK]
• Early reviews are overwhelmingly positive

Are you ready for launch day?

Tomorrow: 6 days to go!

Happy reading,
[AUTHOR_NAME]`,
          day: 8,
          type: 'Launch'
        },
        {
          id: 'launch-9',
          subject: '6 Days to Go: Your Questions Answered! ❓',
          preview: 'Common questions about "[BOOK_TITLE]"...',
          content: `Hi [FIRST_NAME],

6 days to go! Today I'm answering the most common questions about "[BOOK_TITLE]":

Q: What genre is this book?
A: [GENRE_DESCRIPTION]

Q: Is this a standalone or part of a series?
A: [SERIES_INFO]

Q: What age group is this book for?
A: [TARGET_AUDIENCE]

Q: Will there be a sequel?
A: [SEQUEL_INFO]

Q: Where can I buy the book?
A: [PURCHASE_LINKS]

Have other questions? Just reply to this email!

Tomorrow: 5 days to go!

Happy reading,
[AUTHOR_NAME]`,
          day: 9,
          type: 'Launch'
        },
        {
          id: 'launch-10',
          subject: '5 Days to Go: Exclusive Excerpt! 📖',
          preview: 'A special preview just for you...',
          content: `Hi [FIRST_NAME],

5 days to go! Today I'm sharing an exclusive excerpt from "[BOOK_TITLE]" that you won't find anywhere else.

[EXCLUSIVE_EXCERPT]

This scene was one of my favorites to write, and I hope it gives you a taste of what's to come.

Tomorrow: 4 days to go!

Happy reading,
[AUTHOR_NAME]`,
          day: 10,
          type: 'Launch'
        },
        {
          id: 'launch-11',
          subject: '4 Days to Go: Launch Day Schedule! 📅',
          preview: 'What to expect on launch day...',
          content: `Hi [FIRST_NAME],

4 days to go! Here's what to expect on launch day:

🌅 9:00 AM - Book goes live on all platforms
📱 10:00 AM - Social media blitz begins
🎉 2:00 PM - Launch party starts
📖 3:00 PM - Live reading from the book
❓ 4:00 PM - Q&A session
🎁 5:00 PM - Giveaway winners announced

I'll be sharing updates throughout the day, so stay tuned!

Tomorrow: 3 days to go!

Happy reading,
[AUTHOR_NAME]`,
          day: 11,
          type: 'Launch'
        },
        {
          id: 'launch-12',
          subject: '3 Days to Go: Final Reminders! ⚠️',
          preview: 'Don\'t miss the launch...',
          content: `Hi [FIRST_NAME],

3 days to go! Here are your final reminders:

✅ Pre-order bonuses end at midnight
✅ Launch party RSVP closes tomorrow
✅ Set your calendar for launch day
✅ Follow me on social media for live updates

The countdown is almost over!

Tomorrow: 2 days to go!

Happy reading,
[AUTHOR_NAME]`,
          day: 12,
          type: 'Launch'
        },
        {
          id: 'launch-13',
          subject: '2 Days to Go: I\'m Nervous! 😰',
          preview: 'Honest thoughts about launch day...',
          content: `Hi [FIRST_NAME],

2 days to go, and I have to be honest - I'm nervous!

Launching a book is like sending your child off to school for the first time. You've done everything you can to prepare them, but you still worry about how they'll be received.

But I'm also excited because I know this story is ready to meet the world, and I have amazing readers like you supporting me.

Thank you for being part of this journey.

Tomorrow: 1 day to go!

Happy reading,
[AUTHOR_NAME]`,
          day: 13,
          type: 'Launch'
        },
        {
          id: 'launch-14',
          subject: 'TOMORROW IS LAUNCH DAY! 🚀',
          preview: 'The big day is almost here...',
          content: `Hi [FIRST_NAME],

TOMORROW IS LAUNCH DAY! 🚀

I can't believe it's finally here. "[BOOK_TITLE]" launches tomorrow at 9:00 AM.

I'm feeling a mix of excitement, nerves, and gratitude. This book has been my companion for [X] months, and now it's time to share it with the world.

Thank you for being part of this journey. Your support means everything to me.

See you tomorrow for the launch party!

Happy reading,
[AUTHOR_NAME]

P.S. Don't forget to set your calendar reminder!`,
          day: 14,
          type: 'Launch'
        }
      ]
    }
  ];

  const customizeEmail = (email: Email) => {
    let customized = email.content;
    
    if (bookInfo.title) {
      customized = customized.replace(/\[BOOK_TITLE\]/g, bookInfo.title);
    }
    if (bookInfo.author) {
      customized = customized.replace(/\[AUTHOR_NAME\]/g, bookInfo.author);
    }
    if (bookInfo.genre) {
      customized = customized.replace(/\[GENRE\]/g, bookInfo.genre);
    }
    if (bookInfo.description) {
      customized = customized.replace(/\[BRIEF_DESCRIPTION\]/g, bookInfo.description);
    }
    if (bookInfo.launchDate) {
      customized = customized.replace(/\[LAUNCH_DATE\]/g, bookInfo.launchDate);
    }
    if (bookInfo.price) {
      customized = customized.replace(/\[PRICE\]/g, bookInfo.price);
    }
    if (bookInfo.website) {
      customized = customized.replace(/\[WEBSITE\]/g, bookInfo.website);
    }
    if (bookInfo.socialMedia) {
      customized = customized.replace(/\[SOCIAL_MEDIA\]/g, bookInfo.socialMedia);
    }
    
    return customized;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadSequence = (sequence: EmailSequence) => {
    const customizedSequence = {
      ...sequence,
      emails: sequence.emails.map(email => ({
        ...email,
        content: customizeEmail(email)
      }))
    };

    const dataStr = JSON.stringify(customizedSequence, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sequence.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Email Marketing Sequences</h2>
            <p className="text-blue-100">Pre-written email sequences for book launches</p>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="w-8 h-8" />
            <Users className="w-8 h-8" />
            <TrendingUp className="w-8 h-8" />
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
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Author Name</label>
            <input
              type="text"
              value={bookInfo.author}
              onChange={(e) => setBookInfo(prev => ({ ...prev, author: e.target.value }))}
              placeholder="Your name"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Genre</label>
            <input
              type="text"
              value={bookInfo.genre}
              onChange={(e) => setBookInfo(prev => ({ ...prev, genre: e.target.value }))}
              placeholder="e.g., Romance, Mystery, Fantasy"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Launch Date</label>
            <input
              type="date"
              value={bookInfo.launchDate}
              onChange={(e) => setBookInfo(prev => ({ ...prev, launchDate: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Book Price</label>
            <input
              type="text"
              value={bookInfo.price}
              onChange={(e) => setBookInfo(prev => ({ ...prev, price: e.target.value }))}
              placeholder="e.g., 24.99"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Website</label>
            <input
              type="text"
              value={bookInfo.website}
              onChange={(e) => setBookInfo(prev => ({ ...prev, website: e.target.value }))}
              placeholder="Your website URL"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Brief Description</label>
            <textarea
              value={bookInfo.description}
              onChange={(e) => setBookInfo(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of your book (1-2 sentences)"
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Sequence Selection */}
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Choose a Sequence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sequences.map(sequence => (
            <div 
              key={sequence.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedSequence === sequence.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedSequence(sequence.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-slate-900">{sequence.name}</h4>
                <span className="text-sm text-slate-500">{sequence.totalDays} days</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">{sequence.purpose}</p>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                  {sequence.category}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {sequence.emails.length} emails
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Sequence Display */}
      {selectedSequence && (
        <div className="space-y-6">
          {sequences.find(s => s.id === selectedSequence)?.emails.map(email => (
            <div key={email.id} className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{email.subject}</h3>
                  <div className="flex items-center space-x-2 text-sm text-slate-500 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>Day {email.day}</span>
                    <span>•</span>
                    <span>{email.type}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyToClipboard(customizeEmail(email))}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Preview Text</h4>
                  <p className="text-sm text-slate-600 italic">{email.preview}</p>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Email Content</h4>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <pre className="whitespace-pre-wrap text-sm text-slate-700">{customizeEmail(email)}</pre>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Download Sequence */}
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Download Complete Sequence</h3>
                <p className="text-slate-600 text-sm">Get the entire sequence as a JSON file for your email marketing platform</p>
              </div>
              <button
                onClick={() => downloadSequence(sequences.find(s => s.id === selectedSequence)!)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                <span>Download Sequence</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-indigo-50 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Email Sequence Tips</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Send className="w-4 h-4 text-indigo-600 mt-0.5" />
            <span className="text-slate-700">Customize each email with your personal voice and book details</span>
          </div>
          <div className="flex items-start space-x-3">
            <Users className="w-4 h-4 text-indigo-600 mt-0.5" />
            <span className="text-slate-700">Test your sequences with a small group before sending to your full list</span>
          </div>
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-4 h-4 text-indigo-600 mt-0.5" />
            <span className="text-slate-700">Track open rates and click-through rates to optimize your sequences</span>
          </div>
          <div className="flex items-start space-x-3">
            <Mail className="w-4 h-4 text-indigo-600 mt-0.5" />
            <span className="text-slate-700">Always include a clear call-to-action in each email</span>
          </div>
        </div>
      </div>
    </div>
  );
} 