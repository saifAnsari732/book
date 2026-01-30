import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import BookCard from '../components/BookCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user, isAdmin } = useAuth();

  const categories = [
    'All',
    'Self Help',
    'Fiction',
    'Non-Fiction',
    'Science',
    'Technology',
    'Biography',
    'History',
    'Philosophy',
    'Business',
    'Other',
  ];

  useEffect(() => {
    fetchBooks();
  }, [search, category, currentPage]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      let url = `${process.env.API_URL}/books?page=${currentPage}&limit=9`;
      
      if (search) {
        url += `&search=${search}`;
      }
      
      if (category && category !== 'All') {
        url += `&category=${category}`;
      }

      const res = await axios.get(url);
      setBooks(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error('Failed to fetch books');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat === 'All' ? '' : cat);
    setCurrentPage(1);
  };
   
  return (
    <Layout title="Library System - Discover Your Next Read">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;700;800;900&display=swap');

        .hero-section {
          min-height: 85vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          position: relative;
          overflow: hidden;
          padding: 4rem 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
          animation: float 20s infinite ease-in-out;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }

        .floating-books {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .floating-book {
          position: absolute;
          font-size: 2rem;
          opacity: 0.1;
          animation: floatBook 15s infinite linear;
        }

        @keyframes floatBook {
          0% { transform: translateY(100vh) rotate(0deg); }
          100% { transform: translateY(-100px) rotate(360deg); }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          text-align: center;
          color: white;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: 4.5rem;
          font-weight: 900;
          margin-bottom: 1rem;
          line-height: 1.1;
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.8s ease-out;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 3rem;
          opacity: 0.95;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          animation: slideUp 0.8s ease-out 0.1s both;
          font-weight: 300;
        }

        .search-container {
          max-width: 700px;
          margin: 0 auto 3rem;
          animation: slideUp 0.8s ease-out 0.2s both;
        }

        .search-input {
          width: 100%;
          padding: 1.2rem 2rem 1.2rem 4rem;
          font-size: 1.1rem;
          border: none;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .search-input:focus {
          outline: none;
          transform: translateY(-2px);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.3),
            0 0 0 2px rgba(255, 255, 255, 0.3);
        }

        .search-icon {
          position: absolute;
          left: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          color: #667eea;
          font-size: 1.3rem;
        }

        .category-filter {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.8rem;
          margin: 3rem auto;
          max-width: 1000px;
          animation: fadeIn 0.8s ease-out 0.3s both;
        }

        .category-btn {
          padding: 0.8rem 1.8rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          letter-spacing: 0.3px;
          position: relative;
          overflow: hidden;
        }

        .category-btn.active {
          background: white;
          color: #667eea;
          border-color: white;
          box-shadow: 0 10px 20px rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .category-btn:not(.active) {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .category-btn:not(.active):hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

/* Main Content */
.main-content {
  background: linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%);
  padding: 2rem 1.5rem 3rem;
  position: relative;
  margin-top: -30px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.05);
}

.content-container {
  max-width: 1100px;
  margin: 0 auto;
}

/* Compact Stats Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 2.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(40, 120, 100, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.1);
}

.stat-card {
  background: white;
  padding: 1.2rem 1rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.44);
  transition: all 0.3s ease;
  border: 1px solid rgba(99, 102, 241, 0.08);
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.12);
  border-color: rgba(99, 102, 241, 0.2);
}

.stat-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;
}

.stat-number {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.2rem;
  font-family: 'Playfair Display', serif;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
}

/* Results Section */
.results-section {
  background: white;
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(99, 102, 241, 0.1);
}

.results-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(99, 102, 241, 0.08);
}

.results-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.results-count {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: rgba(99, 102, 241, 0.08);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;
}

.results-subtitle {
  color: var(--text-secondary);
  font-size: 0.95rem;
  max-width: 600px;
  line-height: 1.5;
}

/* Books Grid - More Compact */
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Loading State */
.loading-container {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(99, 102, 241, 0.1);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 1.5rem;
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  opacity: 0.5;
  color: var(--text-secondary);
}

.empty-title {
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.empty-description {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
}

.reset-filters-btn {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-filters-btn:hover {
  background: rgba(99, 102, 241, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.15);
}

/* Pagination - Smaller */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(99, 102, 241, 0.08);
}

.page-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  font-weight: 500;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(99, 102, 241, 0.2);
  background: white;
  color: var(--text-primary);
}

.page-btn:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.1);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin: 0 0.75rem;
  min-width: 100px;
  text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-content {
    padding: 1.5rem 1rem 2.5rem;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  }

  .stats-section {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    margin-bottom: 2rem;
    padding: 0.75rem;
  }

  .stat-card {
    padding: 1rem 0.5rem;
  }

  .stat-number {
    font-size: 1.4rem;
  }

  .stat-icon {
    font-size: 1.3rem;
  }

  .results-section {
    padding: 1.5rem;
  }

  .results-title {
    font-size: 1.6rem;
  }

  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.25rem;
  }
}

@media (max-width: 480px) {
  .stats-section {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .stat-card {
    padding: 0.75rem 0.5rem;
  }

  .stat-number {
    font-size: 1.2rem;
  }

  .stat-label {
    font-size: 0.7rem;
  }

  .books-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .results-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .results-count {
    align-self: flex-start;
  }
      `}</style>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background"></div>
        
        {/* Floating book icons */}
        <div className="floating-books">
          {['📚', '📖', '📕', '📗', '📘', '📙'].map((icon, i) => (
            <div 
              key={i} 
              className="floating-book"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            >
              {icon}
            </div>
          ))}
        </div>

        <div className="hero-content">
          <h1 className="hero-title">Journey Through<br />Endless Stories</h1>
          <p className="hero-subtitle">
            Discover hidden gems, timeless classics, and life-changing reads in our curated collection of literary masterpieces
          </p>
          
          <div className="search-container">
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search books by title, author, or keyword..."
                value={search}
                onChange={handleSearchChange}
                className="search-input"
              />
              <div className="search-icon">
                🔍
              </div>
            </div>
          </div>

          <div className="category-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`category-btn ${
                  (cat === 'All' && !category) || category === (cat === 'All' ? '' : cat) 
                    ? 'active' 
                    : ''
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Stats Section */}
        <div className="stats-section ">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-number">{books.length * totalPages}</div>
            <div className="stat-label">Total Books</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📖</div>
            <div className="stat-number">{categories.length}</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-number">24/7</div>
            <div className="stat-label">Digital Access</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-number">∞</div>
            <div className="stat-label">Readers Community</div>
          </div>
        </div>

        {/* Books Display */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : books.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3 className="empty-title">No Books Found</h3>
            <p className="empty-description">
              Try adjusting your search or filter to find what you're looking for
            </p>
          </div>
        ) : (
          <>
            <div className="books-grid">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="page-btn"
                >
                  ← Previous
                </button>
                <span className="page-info">
                  Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="page-btn"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Admin Quick Action */}
      {isAdmin && (
        <div className="admin-actions">
          <button 
            className="admin-btn"
            onClick={() => window.location.href = '/admin/books/new'}
            title="Add New Book"
          >
            +
          </button>
        </div>
      )}
    </Layout>
  );
}