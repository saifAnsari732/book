import Navbar from './Navbar';
import Head from 'next/head';

const Layout = ({ children, title = 'Library System' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Library Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
