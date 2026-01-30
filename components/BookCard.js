import Link from 'next/link';

const BookCard = ({ book }) => {
  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&family=Playfair+Display:wght@600;700&display=swap');

        .book-card {
          background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 20px;
          padding: 1.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 
            0 5px 10px rgba(99, 102, 241, 3.45),
            0 0 0 1px rgba(99, 102, 241, 0.1);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .book-card:hove {
          transform: translateY(-8px);
          box-shadow: 
            0 15px 40px rgba(99, 102, 241, 0.15),
            0 0 0 1px rgba(99, 102, 241, 0.1);
          border-color: rgba(99, 102, 241, 0.3);
        }

        .book-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, 
            rgba(99, 102, 241, 0.8) 0%,
            rgba(139, 92, 246, 0.8) 50%,
            rgba(236, 72, 153, 0.8) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .book-card:hover::before {
          opacity: 1;
        }

        .card-header {
          margin-bottom: 1.25rem;
          position: relative;
          min-height: 48px;
        }

        .book-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #1f2937;
          line-height: 1.3;
          margin-bottom: 0.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.3s ease;
        }

        .book-card:hover .book-title {
          color: #4f46e5;
        }

        .availability-badge {
          position: absolute;
          top: 0;
          right: 0;
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .available {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.12), rgba(34, 197, 94, 0.08));
          color: #16a34a;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .borrowed {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(239, 68, 68, 0.08));
          color: #dc2626;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .author-section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: rgba(249, 250, 251, 0.8);
          border-radius: 12px;
          border-left: 3px solid rgba(99, 102, 241, 0.3);
        }

        .author-icon {
          color: #6366f1;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .author-name {
          font-family: 'Poppins', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: #4b5563;
        }

        .category-section {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          padding: 0.5rem 0.75rem;
          background: rgba(99, 102, 241, 0.05);
          border-radius: 10px;
          border: 1px solid rgba(99, 102, 241, 0.1);
        }

        .category-icon {
          color: #6366f1;
          font-size: 0.8rem;
        }

        .category-name {
          font-family: 'Poppins', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: #6366f1;
          text-transform: capitalize;
        }

        .description-section {
          flex-grow: 1;
          margin-bottom: 1.25rem;
          padding: 0.75rem;
          background: rgba(249, 250, 251, 0.5);
          border-radius: 12px;
          border: 1px solid rgba(226, 232, 240, 0.5);
        }

        .description-text {
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
          line-height: 1.5;
          color: #6b7280;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .details-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(226, 232, 240, 0.6);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .year-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.8rem;
          background: rgba(107, 114, 128, 0.05);
          border-radius: 8px;
          font-size: 0.8rem;
          color: #6b7280;
          font-weight: 500;
        }

        .year-icon {
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .details-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          color: white;
      
          border-radius: 12px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          border:2px solid black;
          letter-spacing: 0.3px;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }

        .details-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        }

        .details-btn:active {
          transform: translateY(0);
        }

        .btn-icon {
          font-size: 0.9rem;
          transition: transform 0.3s ease;
        }

        .details-btn:hover .btn-icon {
          transform: translateX(3px);
        }

        /* Compact layout adjustments */
        .compact-mode .book-card {
          padding: 1.25rem;
        }

        .compact-mode .book-title {
          font-size: 1.2rem;
        }

        .compact-mode .author-section,
        .compact-mode .description-section {
          padding: 0.6rem;
        }

        .compact-mode .details-btn {
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
        }

        @media (max-width: 768px) {
          .book-card {
            padding: 1.25rem;
          }

          .book-title {
            font-size: 1.2rem;
          }

          .author-name {
            font-size: 0.9rem;
          }

          .description-text {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .book-card {
            padding: 1rem;
            border-radius: 16px;
          }

          .book-title {
            font-size: 1.1rem;
          }

          .availability-badge {
            padding: 0.2rem 0.6rem;
            font-size: 0.7rem;
          }

          .details-btn {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }

          .details-footer {
            flex-direction: column;
            gap: 0.75rem;
            align-items: stretch;
          }

          .year-badge {
            align-self: flex-start;
          }
        }
      `}</style>

      <div className="book-card ">
        <div className="card-header">
          <h3 className="book-title" title={book.title}>
            {book.title}
          </h3>
          <div className={`availability-badge ${book.available ? 'available' : 'borrowed'}`}>
            {book.available ? 'Available' : 'Borrowed'}
          </div>
        </div>

        <div className="author-section">
          <span className="author-icon">✍️</span>
          <p className="author-name" title={book.author}>
            {book.author}
          </p>
        </div>

        <div className="category-section">
          <span className="category-icon">🏷️</span>
          <span className="category-name">{book.category}</span>
        </div>

        {book.description && (
          <div className="description-section">
            <p className="description-text" title={book.description}>
              {book.description}
            </p>
          </div>
        )}

        <div className="details-footer">
          {book.publishYear && (
            <div className="year-badge ">
              <span className="year-icon">📅</span>
              <span >{book.publishYear}</span>
            </div>
          )}
          
          <Link href={`/books/${book._id}`} className="details-btn bg-primary-400 p-2 rounded-md w-48 text-center text-white font-semibold ">
            View Details
            <span className="btn-icon">→</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BookCard;