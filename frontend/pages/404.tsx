import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const NotFoundPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <Head>
        <title>Page Not Found - Weather App</title>
        <meta name="description" content="The page you were looking for was not found" />
      </Head>

      <div className="text-center px-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-6">Page Not Found</h2>
        <p className="mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link href="/" className="btn btn-primary">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;