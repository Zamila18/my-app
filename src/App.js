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

// Comment Component
const Comment = ({ comment }) => {
  return (
    <div style={{ 
      backgroundColor: '#f9fafb', 
      padding: '16px', 
      borderRadius: '8px', 
      marginBottom: '12px' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#3b82f6',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>
            {comment.author.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <span style={{ fontWeight: '600', fontSize: '14px' }}>{comment.author}</span>
          <span style={{ color: '#6b7280', fontSize: '12px', marginLeft: '8px' }}>{comment.date}</span>
        </div>
      </div>
      <p style={{ color: '#374151', fontSize: '14px', marginBottom: '12px', lineHeight: '1.5' }}>
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

// Author Profile Component
const AuthorProfile = ({ authorId, onBack }) => {
  const author = `Naima ${authorId}`;
  
  return (
    <div style={{ maxWidth: '768px', margin: '0 auto', padding: '24px' }}>
      <button 
        onClick={onBack}
        style={{
          marginBottom: '16px',
          padding: '8px 16px',
          backgroundColor: '#f3f4f6',
          color: '#374151',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        ← Back to Posts
      </button>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '96px',
          height: '96px',
          backgroundColor: '#3b82f6',
          borderRadius: '50%',
          margin: '0 auto 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
            {author.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '8px' }}>{author}</h2>
        <p style={{ color: '#6b7280', marginBottom: '16px' }}>Student of AUST CSE</p>
        <div style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '8px' }}>
          <p style={{ color: '#374151' }}>
            Welcome to the profile of <strong>{author}</strong>. Passionate learner exploring technology and new innovations.
          </p>
          <div style={{ 
            marginTop: '16px', 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '16px', 
            fontSize: '14px', 
            color: '#6b7280' 
          }}>
            <span>📝 25 Posts</span>
           
            <span>📅 Joined Feb 2023</span>
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
const BlogPost = ({ post, onAuthorClick }) => {
  return (
    <article style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      padding: '24px',
      marginBottom: '24px'
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>
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
          onClick={() => onAuthorClick(post.authorId)}
          style={{
            color: '#2563eb',
            fontWeight: '500',
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
            <Comment key={comment.id} comment={comment} />
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
  
  const postsPerPage = 1; // Show one post per page for simplicity
  const totalPages = Math.ceil(dummyPosts.length / postsPerPage);
  
  const getCurrentPost = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return dummyPosts[startIndex];
  };

  const handleAuthorClick = (authorId) => {
    setSelectedAuthorId(authorId);
    setCurrentView('author');
  };

  const handleBackToPosts = () => {
    setCurrentView('posts');
    setSelectedAuthorId(null);
  };

  if (currentView === 'author') {
    return <AuthorProfile authorId={selectedAuthorId} onBack={handleBackToPosts} />;
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