// src/App.js
import React, { useState } from 'react';
import zamila from './assets/avatars/zamila.png';
import commenter1 from './assets/avatars/commenter1.png';
import commenter2 from './assets/avatars/commenter2.png';
import commenter3 from './assets/avatars/commenter3.png';


import travel from './assets/travel.png';

const authorImages = {
  'Zamila Mohammad': zamila,
  'Commenter 1': commenter1,
  'Commenter 2': commenter2,
  'Commenter 3': commenter3,
};

/* === Dummy data for posts — TRAVEL THEME === */
const dummyPosts = new Array(15).fill(null).map((_, i) => ({
  id: i + 1,
  title: `Backpacking Sri Lanka: 7-Day Coastal Itinerary`,
  content: `Thinking about a budget-friendly tropical escape? This 7-day Sri Lanka coastal route covers golden beaches, scenic train rides, street food, and sunrise hikes.
              Start in Negombo, then head south to Galle’s Dutch fort and the palm-fringed bays of Unawatuna and Mirissa.
              Ride the iconic Kandy–Ella train for misty tea hills, and finish with turtles, surf lessons, and stilt fishermen along the south coast.
              Tips include using local buses, guesthouses with breakfast, and grabbing kottu roti or hoppers for cheap, delicious meals.`,
  image: travel, 
  authorId: (i % 5) + 1,
  authorName: `Zamila Mohammad`,
  date: `16th august 2025`,
  comments: [
    {
      id: 1,
      author: `Commenter ${(i % 3) + 1}`,
      date: `25 july 2025`,
      content: `Loved the train tip from Kandy to Ella! Please add seat class suggestions and how early to book.`
    },
    {
      id: 2,
      author: `Commenter ${(i % 3) + 2}`,
      date: `30 july 2025`,
      content: `Great coastal picks. Would be awesome to list hostel costs and beginner-friendly surf spots near Mirissa.`
    }
  ]
}));

const reactions = [
  { emoji: '👍', label: 'Like' },
  { emoji: '❤️', label: 'Love' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😢', label: 'Sad' }
];

const Reactions = ({ postId, type = 'post' }) => {
  const [activeReaction, setActiveReaction] = useState(null);
  const [reactionCounts, setReactionCounts] = useState({ 0: 42, 1: 156, 2: 8, 3: 12 });

  const handleReactionClick = (index) => {
    setReactionCounts(prev => {
      const next = { ...prev };
      if (activeReaction === index) {
        next[index] = Math.max(0, next[index] - 1);
        setActiveReaction(null);
      } else {
        if (activeReaction !== null) next[activeReaction] = Math.max(0, next[activeReaction] - 1);
        next[index] = next[index] + 1;
        setActiveReaction(index);
      }
      return next;
    });
  };

  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
        {reactions.map((reaction, index) => (
          <button
            key={index}
            onClick={() => handleReactionClick(index)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 12px',
              borderRadius: '20px',
              border: '1px solid',
              backgroundColor: activeReaction === index ? '#dbeafe' : '#f9fafb',
              borderColor: activeReaction === index ? '#93c5fd' : '#e5e7eb',
              color: activeReaction === index ? '#1d4ed8' : '#374151',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: '18px' }}>{reaction.emoji}</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{reaction.label}</span>
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
        {reactions.map((reaction, index) => (
          <span key={index}>
            {reaction.label}: {reactionCounts[index]}
          </span>
        ))}
      </div>
    </div>
  );
};

// Comment (RGB bg + clickable commenter + avatar)
const Comment = ({ comment, onAuthorClick }) => {
  const initials = comment.author.split(' ').map(n => n[0]).join('');
  const avatarSrc = authorImages[comment.author] || null;

  return (
    <div style={{
      backgroundColor: 'rgb(227, 242, 253)',
      padding: '16px',
      borderRadius: '12px',
      marginBottom: '12px',
      border: '1px solid rgba(2, 132, 199, 0.15)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <button
          onClick={() => onAuthorClick(comment.author)}
          title={`Open profile of ${comment.author}`}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: 'none',
            cursor: 'pointer',
            background: avatarSrc ? 'transparent' : 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
            boxShadow: '0 2px 8px rgba(59,130,246,.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {avatarSrc ? (
            <img src={avatarSrc} alt={comment.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ color: 'white', fontSize: '14px', fontWeight: 700 }}>{initials}</span>
          )}
        </button>

        <div>
          <button
            onClick={() => onAuthorClick(comment.author)}
            style={{
              fontWeight: 700,
              fontSize: '14px',
              color: '#1d4ed8',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {comment.author}
          </button>
          <span style={{ color: '#6b7280', fontSize: '12px', marginLeft: '8px' }}>{comment.date}</span>
        </div>
      </div>

      <p style={{ color: '#374151', fontSize: '14px', marginBottom: '12px', lineHeight: 1.6 }}>
        {comment.content}
      </p>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button style={{ fontSize: '12px', color: '#6b7280', cursor: 'pointer', border: 'none', background: 'none' }}>
          Like
        </button>
        <button style={{ fontSize: '12px', color: '#6b7280', cursor: 'pointer', border: 'none', background: 'none' }}>
          Dislike
        </button>
        <button style={{ fontSize: '12px', color: '#6b7280', cursor: 'pointer', border: 'none', background: 'none' }}>
          Reply
        </button>
      </div>

      <Reactions postId={`comment-${comment.id}`} type="comment" />
    </div>
  );
};


const AuthorProfile = ({ authorId, authorName, role = 'Author', onBack }) => {
  const name = authorName ?? `Zamila ${authorId}`;
  const initials = name.split(' ').map(n => n[0]).join('');
  const avatarSrc = authorImages[name] || null;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)', padding: '24px' }}>
      <div style={{ maxWidth: '768px', margin: '0 auto' }}>
        <button
          onClick={onBack}
          style={{
            marginBottom: '16px',
            padding: '8px 16px',
            backgroundColor: '#eef2ff',
            color: '#1e40af',
            borderRadius: '8px',
            cursor: 'pointer',
            border: '1px solid #c7d2fe'
          }}
        >
          ← Back to Posts
        </button>

        <div style={{
          textAlign: 'center',
          background: '#ffffff',
          borderRadius: '16px',
          padding: '28px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 8px 30px rgba(2,6,23,0.06)'
        }}>
          <div
            style={{
              width: '104px',
              height: '104px',
              borderRadius: '9999px',
              margin: '0 auto 16px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: avatarSrc ? 'transparent' : 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              boxShadow: '0 6px 16px rgba(59,130,246,.35)'
            }}
          >
            {avatarSrc ? (
              <img src={avatarSrc} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ color: 'white', fontSize: '28px', fontWeight: 800 }}>{initials}</span>
            )}
          </div>

          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: 6, letterSpacing: '-0.02em' }}>{name}</h2>
          <p style={{ color: '#6b7280', marginBottom: '18px' }}>
            {role === 'Commenter' ? 'Community Member' : 'Student of AUST CSE'}
          </p>

          <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #eef2f7' }}>
            <p style={{ color: '#374151' }}>
              Welcome to the profile of <strong>{name}</strong>. Passionate traveler exploring cultures, cuisines, and new adventures.
            </p>

            <div style={{
              marginTop: '16px',
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              fontSize: '14px',
              color: '#475569'
            }}>
              <span>📝 25 Posts</span>
              <span>📅 Joined Feb 2023</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pagination
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginTop: '32px'
    }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '8px 12px',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          fontSize: '14px',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage === 1 ? 0.5 : 1,
          backgroundColor: '#f9fafb'
        }}
      >
        Previous
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' ? onPageChange(page) : null}
          disabled={page === '...'}
          style={{
            padding: '8px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: page === '...' ? 'default' : 'pointer',
            backgroundColor: page === currentPage ? '#3b82f6' : '#ffffff',
            color: page === currentPage ? 'white' : '#374151',
            borderColor: page === currentPage ? '#3b82f6' : '#e5e7eb'
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: '8px 12px',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          fontSize: '14px',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage === totalPages ? 0.5 : 1,
          backgroundColor: '#f9fafb'
        }}
      >
        Next
      </button>
    </div>
  );
};


const BlogPost = ({ post, onAuthorClick, onCommentAuthorClick, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handlePost = () => {
    const text = newComment.trim();
    if (!text) return;
    onAddComment(post.id, text);
    setNewComment('');
  };

  return (
    <article style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      padding: '24px',
      marginBottom: '24px'
    }}>
      <h1
        style={{
          fontSize: '32px',
          lineHeight: 1.15,
          fontWeight: 800,
          color: 'rgba(145, 197, 221, 1)',
          fontFamily: 'Georgia, "Times New Roman", serif',
          letterSpacing: '-0.01em',
          marginBottom: '12px',
          textShadow: '0 1px 0 rgba(255,255,255,0.6)'
        }}
      >
        {post.title}
      </h1>

      {/* Travel hero image */}
      {post.image && (
        <div style={{ margin: '12px 0 20px 0' }}>
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: '100%',
              height: '220px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}
          />
        </div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
        fontSize: '14px',
        color: '#6b7280'
      }}>
        <span>By</span>
        <button
          onClick={() => onAuthorClick(post.authorId, post.authorName)}
          style={{
            color: '#2563eb',
            fontWeight: '600',
            cursor: 'pointer',
            border: 'none',
            background: 'none',
            textDecoration: 'underline'
          }}
        >
          {post.authorName}
        </button>
        <span>•</span>
        <span>{post.date}</span>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <p style={{ color: '#374151', lineHeight: '1.6' }}>{post.content}</p>
      </div>

      <Reactions postId={post.id} />

      <div style={{ marginTop: '32px', borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          {post.comments.length} Comments
        </h3>

        {/* Write-a-comment UI */}
        <div style={{ marginBottom: '24px' }}>
          <textarea
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',   
              borderRadius: '8px',
              resize: 'none',
              fontSize: '14px',
              fontFamily: 'inherit',
              outline: 'none'
            }}
            rows="3"
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            onClick={handlePost}
            style={{
              marginTop: '8px',
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Post Comment
          </button>
        </div>

        <div>
          {post.comments.map(comment => (
            <Comment key={comment.id} comment={comment} onAuthorClick={onCommentAuthorClick} />
          ))}
        </div>
      </div>
    </article>
  );
};

// Main App
const App = () => {
  const [posts, setPosts] = useState(dummyPosts);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 1;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const [currentView, setCurrentView] = useState('posts'); // 'posts' | 'author'
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [selectedAuthorName, setSelectedAuthorName] = useState(null);
  const [selectedRole, setSelectedRole] = useState('Author');

  const getCurrentPost = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return posts[startIndex];
  };

  const handleAuthorClick = (authorId, authorName) => {
    setSelectedAuthorId(authorId);
    setSelectedAuthorName(authorName);
    setSelectedRole('Author');
    setCurrentView('author');
  };

  const handleCommentAuthorClick = (commenterName) => {
    setSelectedAuthorId(null);
    setSelectedAuthorName(commenterName);
    setSelectedRole('Commenter');
    setCurrentView('author');
  };

  const handleBackToPosts = () => {
    setCurrentView('posts');
    setSelectedAuthorId(null);
    setSelectedAuthorName(null);
    setSelectedRole('Author');
  };

  const handleAddComment = (postId, content) => {
    const fmt = new Date().toLocaleDateString('en-GB', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const nextIndex = p.comments.length + 1;
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: Date.now(),
              author: `Commenter ${nextIndex}`,
              date: fmt.toLowerCase(),
              content
            }
          ]
        };
      })
    );
  };

  if (currentView === 'author') {
    return (
      <AuthorProfile
        authorId={selectedAuthorId}
        authorName={selectedAuthorName}
        role={selectedRole}
        onBack={handleBackToPosts}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '32px 0' }}>
      <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 16px' }}>
        <header style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            Blog Posts
          </h1>
          <p style={{ color: '#6b7280' }}>Discover amazing content from our writers</p>
        </header>

        <BlogPost
          post={getCurrentPost()}
          onAuthorClick={handleAuthorClick}
          onCommentAuthorClick={handleCommentAuthorClick}
          onAddComment={handleAddComment}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            if (page >= 1 && page <= totalPages) setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default App;
