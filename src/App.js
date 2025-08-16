// src/App.js
import React, { useState } from 'react';

// Dummy data for posts
const dummyPosts = new Array(15).fill(null).map((_, i) => ({
  id: i + 1,
  title: `CSE2200`,
  content: `Computer Science and Engineering (CSE) focuses on the study of computer systems, software, and hardware.
              It involves programming, algorithms, networks, and artificial intelligence.
              CSE professionals design and develop innovative solutions for real-world technological problems.`,
  image: `/assets/istockphoto-1140180560-612x612.jpg`,
  authorId: (i % 5) + 1,
  authorName: `Zamila Mohammad`,
  date: `16th august 2025`,
  comments: [
    {
      id: 1,
      author: `Commenter ${(i % 3) + 1}`,
      date: `25 july 2025`,
      content: `CSE is the backbone of modern technology and innovation.`
    },
    {
      id: 2,
      author: `Commenter ${(i % 3) + 2}`,
      date: `30 july 2025`,
      content: `It is a field that shapes the future through coding and creativity.`
    }
  ]
}));

const reactions = [
  { emoji: '👍', label: 'Like' },
  { emoji: '❤️', label: 'Love' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😢', label: 'Sad' }
];

// Reactions Component - UPDATED WITH CHANGES
const Reactions = ({ postId, type = 'post' }) => {
  const [activeReaction, setActiveReaction] = useState(null);
  // CHANGED: Updated initial values to actual numbers instead of percentages
  const [reactionCounts, setReactionCounts] = useState({
    0: 42,  // Like: 42 reactions
    1: 156, // Love: 156 reactions
    2: 8,   // Angry: 8 reactions
    3: 12   // Sad: 12 reactions
  });

  const handleReactionClick = (index) => {
    // CHANGED: Updated logic to increment/decrement counts when clicking reactions
    setReactionCounts(prev => {
      const newCounts = { ...prev };
      
      if (activeReaction === index) {
        // If clicking the same reaction, remove it and decrease count
        newCounts[index] = Math.max(0, newCounts[index] - 1);
        setActiveReaction(null);
      } else {
        // If clicking a different reaction
        if (activeReaction !== null) {
          // Decrease count of previously active reaction
          newCounts[activeReaction] = Math.max(0, newCounts[activeReaction] - 1);
        }
        // Increase count of new reaction
        newCounts[index] = newCounts[index] + 1;
        setActiveReaction(index);
      }
      
      return newCounts;
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
            onMouseOver={(e) => {
              if (activeReaction !== index) {
                e.target.style.backgroundColor = '#f3f4f6';
              }
            }}
            onMouseOut={(e) => {
              if (activeReaction !== index) {
                e.target.style.backgroundColor = '#f9fafb';
              }
            }}
          >
            <span style={{ fontSize: '18px' }}>{reaction.emoji}</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{reaction.label}</span>
          </button>
        ))}
      </div>
      {/* CHANGED: Updated display to show actual numbers instead of percentages */}
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

// Comment Component  ➜ (1) NEW RGB background, (4) clickable commenter -> profile
const Comment = ({ comment, onAuthorClick }) => {
  const initials = comment.author.split(' ').map(n => n[0]).join('');

  return (
    <div style={{ 
      // ❗ new RGB color for comment cards (soft blue)
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
            background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(59,130,246,.25)'
          }}
        >
          <span style={{ color: 'white', fontSize: '14px', fontWeight: 700 }}>
            {initials}
          </span>
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

// Author Profile Component  ➜ (3) style tweaks + supports commenters
const AuthorProfile = ({ authorId, authorName, role = 'Author', onBack }) => {
  const name = authorName ?? `Zamila ${authorId}`;
  const initials = name.split(' ').map(n => n[0]).join('');

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
          <div style={{
            width: '104px',
            height: '104px',
            background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
            borderRadius: '9999px',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(59,130,246,.35)'
          }}>
            <span style={{ color: 'white', fontSize: '28px', fontWeight: 800 }}>
              {initials}
            </span>
          </div>

          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: 6, letterSpacing: '-0.02em' }}>{name}</h2>
          <p style={{ color: '#6b7280', marginBottom: '18px' }}>
            {role === 'Commenter' ? 'Community Member' : 'Student of AUST CSE'}
          </p>

          <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #eef2f7' }}>
            <p style={{ color: '#374151' }}>
              Welcome to the profile of <strong>{name}</strong>. Passionate learner exploring technology and new innovations.
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

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
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

// Main Post Component
const BlogPost = ({ post, onAuthorClick, onCommentAuthorClick }) => {
  return (
    <article style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      padding: '24px',
      marginBottom: '24px'
    }}>
      {/* (2) Title styled with color + font */}
      <h1 style={{
        fontSize: '28px',
        fontWeight: 800,
        color: '#0ea5e9',              // cyan-ish accent
        marginBottom: '12px',
        fontFamily: 'Georgia, "Times New Roman", serif',
        letterSpacing: '-0.01em'
      }}>
        {post.title}
      </h1>
      
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
        
        <div style={{ marginBottom: '24px' }}>
          <textarea
            placeholder="Write your comment..."
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
          <button style={{
            marginTop: '8px',
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
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

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentView, setCurrentView] = useState('posts'); // 'posts' or 'author'
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);

  // NEW: when opening profile we can also carry a name + role for commenters
  const [selectedAuthorName, setSelectedAuthorName] = useState(null);
  const [selectedRole, setSelectedRole] = useState('Author');
  
  const postsPerPage = 1; // Show one post per page for simplicity
  const totalPages = Math.ceil(dummyPosts.length / postsPerPage);
  
  const getCurrentPost = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return dummyPosts[startIndex];
  };

  const handleAuthorClick = (authorId, authorName) => {
    setSelectedAuthorId(authorId);
    setSelectedAuthorName(authorName);
    setSelectedRole('Author');
    setCurrentView('author');
  };

  // NEW: commenters open profile too
  const handleCommentAuthorClick = (commenterName) => {
    setSelectedAuthorId(null); // not needed for commenters
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
          <p style={{ color: '#6b7280',}}>Discover amazing content from our writers</p>
        </header>
        
        <BlogPost 
          post={getCurrentPost()} 
          onAuthorClick={handleAuthorClick}
          onCommentAuthorClick={handleCommentAuthorClick}
        />
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default App;
