import { useState, useEffect } from 'react'; // Add useEffect import
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function AddBook() {
  const router = useRouter();
  const { isAdmin, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); // Add auth check state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Self Help',
    available: true,
    description: '',
    publishYear: '',
    isbn: '',
  });

  const categories = [
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
    if (!isAuthenticated || !isAdmin) {
      router.push('/');
    } else {
      setAuthChecked(true);
    }
  }, [isAuthenticated, isAdmin, router]);

  if (!authChecked) {
    return (
      <Layout title="Add New Book - Library System">
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
        }}>
          <div style={{
            color: 'white',
            fontSize: '1.2rem',
            textAlign: 'center'
          }}>
            Loading...
          </div>
        </div>
      </Layout>
    );
  }

  const handleChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = { ...formData };
      if (!submitData.publishYear) delete submitData.publishYear;
      if (!submitData.isbn) delete submitData.isbn;
      if (!submitData.description) delete submitData.description;

      const res = await axios.post(
        `${process.env.API_URL}/books`,
        submitData
      );
      toast.success('Book added successfully!');
      router.push(`/books/${res.data.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add book');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Add New Book - Library System">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Playfair+Display:wght@700;900&display=swap');

        .page-container {
          font-family: 'Poppins', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }

        .page-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .animated-bg-shapes {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          animation: float 20s infinite ease-in-out;
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          top: -100px;
          left: -100px;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          bottom: -50px;
          right: -50px;
          animation-delay: 5s;
        }

        .shape-3 {
          width: 150px;
          height: 150px;
          top: 50%;
          right: 10%;
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }

        .content-wrapper {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          font-weight: 500;
          font-size: 0.95rem;
          margin-bottom: 2rem;
          transition: all 0.3s ease;
          text-decoration: none;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          backdrop-filter: blur(10px);
        }

        .back-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(-5px);
        }

        .form-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 30px;
          padding: 3rem;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.5);
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .form-subtitle {
          color: #64748b;
          font-size: 1rem;
          font-weight: 400;
        }

        .icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
          }
        }

        .form-group {
          margin-bottom: 1.5rem;
          animation: fadeIn 0.6s ease-out backwards;
        }

        .form-group:nth-child(1) { animation-delay: 0.1s; }
        .form-group:nth-child(2) { animation-delay: 0.2s; }
        .form-group:nth-child(3) { animation-delay: 0.3s; }
        .form-group:nth-child(4) { animation-delay: 0.4s; }
        .form-group:nth-child(5) { animation-delay: 0.5s; }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-label {
          display: block;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          letter-spacing: 0.3px;
        }

        .required-star {
          color: #ef4444;
          margin-left: 2px;
        }

        .input-field {
          width: 100%;
          padding: 0.9rem 1.2rem;
          border: 2px solid #e2e8f0;
          border-radius: 15px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
          color: #1e293b;
          font-family: 'Poppins', sans-serif;
        }

        .input-field:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .input-field::placeholder {
          color: #94a3b8;
        }

        .textarea-field {
          resize: vertical;
          min-height: 120px;
          font-family: 'Poppins', sans-serif;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .checkbox-wrapper {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border-radius: 15px;
          margin: 1.5rem 0;
          transition: all 0.3s ease;
        }

        .checkbox-wrapper:hover {
          transform: scale(1.02);
        }

        .checkbox-input {
          width: 22px;
          height: 22px;
          margin-right: 0.75rem;
          cursor: pointer;
          accent-color: #667eea;
        }

        .checkbox-label {
          color: #1e293b;
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          user-select: none;
        }

        .button-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn-primary {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 15px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:active {
          transform: translateY(-1px);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          padding: 1rem 2rem;
          background: white;
          color: #64748b;
          border: 2px solid #e2e8f0;
          border-radius: 15px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .btn-secondary:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }

        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          margin-right: 0.5rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .page-container {
            padding: 1rem;
          }

          .form-card {
            padding: 2rem 1.5rem;
            border-radius: 20px;
          }

          .form-title {
            font-size: 2rem;
          }

          .grid-2 {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .button-group {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="page-container">
        <div className="animated-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="content-wrapper">
          <Link href="/" className="back-lin bg-slate-600 py-2 px-4 rounded-full inline-flex items-center mt-7 mb-2 hover:bg-slate-700 text-white font-medium transition">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Library
          </Link>

          <div className="form-card">
            <div className="form-header">
              <div className="icon-wrapper">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L3 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V7.89l7-3.78v8.88z"/>
                  <path d="M11 7h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
              <h1 className="form-title">Add New Book</h1>
              <p className="form-subtitle">Expand your library collection with a new masterpiece</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Book Title <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter the book's captivating title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="author" className="form-label">
                  Author <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Who penned this masterpiece?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category <span className="required-star">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field textarea-field"
                  placeholder="Tell us what makes this book special..."
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label htmlFor="publishYear" className="form-label">
                    Publish Year
                  </label>
                  <input
                    type="number"
                    id="publishYear"
                    name="publishYear"
                    value={formData.publishYear}
                    onChange={handleChange}
                    min="1000"
                    max={new Date().getFullYear()}
                    className="input-field"
                    placeholder="e.g., 2023"
                  />
                </div>

                
              </div>

              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="available"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <label htmlFor="available" className="checkbox-label">
                  📚 Available for borrowing
                </label>
              </div>

              <div className="button-group">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading && <span className="loading-spinner"></span>}
                  {loading ? 'Adding Book...' : '✨ Add to Library'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}