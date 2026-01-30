import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function EditBook() {
  const router = useRouter();
  const { id } = router.query;
  const { isAdmin, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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

  // Redirect if not admin
  if (!isAuthenticated || !isAdmin) {
    router.replace('/');
    return;
  }

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      setFetching(true);
      const res = await axios.get(`${process.env.API_URL}/books/${id}`);
      const book = res.data.data;
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        available: book.available,
        description: book.description || '',
        publishYear: book.publishYear || '',
        isbn: book.isbn || '',
      });
    } catch (error) {
      toast.error('Failed to fetch book details');
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

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

      await axios.put(`${process.env.API_URL}/books/${id}`, submitData);
      toast.success('Book updated successfully!');
      router.push(`/books/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update book');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Edit Book - Library System">
      <div className="max-w-2xl mx-auto">
        <Link
          href={`/books/${id}`}
          className="text-primary-600 hover:underline mb-6 inline-block"
        >
          ← Back to Book Details
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Book</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Book Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Enter book title"
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Enter author name"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category *
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

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="input-field"
                placeholder="Enter book description (optional)"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="publishYear"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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

              <div>
                <label
                  htmlFor="isbn"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  ISBN
                </label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter ISBN (optional)"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label
                htmlFor="available"
                className="ml-2 block text-sm text-gray-700"
              >
                Available for borrowing
              </label>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating Book...' : 'Update Book'}
              </button>
              <button
                type="button"
                onClick={() => router.push(`/books/${id}`)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}