import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

export default function BookDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.API_URL}/books/${id}`);
      setBook(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch book details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`${process.env.API_URL}/books/${id}`);
        toast.success('Book deleted successfully');
        router.push('/');
      } catch (error) {
        toast.error('Failed to delete book');
        console.error(error);
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  if (!book) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">Book not found</p>
          <Link href="/" className="text-primary-600 hover:underline mt-4">
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${book.title} - Library System`}>
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-primary-600 hover:underline mb-6 inline-block"
        >
          ← Back to Books
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl font-bold text-gray-900">{book.title}</h1>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                book.available
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {book.available ? 'Available' : 'Borrowed'}
            </span>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Author</h3>
              <p className="text-gray-600">{book.author}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700">Category</h3>
              <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-lg">
                {book.category}
              </span>
            </div>

            {book.publishYear && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Published Year
                </h3>
                <p className="text-gray-600">{book.publishYear}</p>
              </div>
            )}

            {book.isbn && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700">ISBN</h3>
                <p className="text-gray-600">{book.isbn}</p>
              </div>
            )}

            {book.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {book.description}
                </p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Added on
              </h3>
              <p className="text-gray-600">
                {new Date(book.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          {isAdmin && (
            <div className="flex space-x-4 pt-6 border-t">
              <Link
                href={`/admin/books/edit/${book._id}`}
                className="btn-primary"
              >
                Edit Book
              </Link>
              <button onClick={handleDelete} className="btn-secondary bg-red-100 hover:bg-red-200 text-red-700">
                Delete Book
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
