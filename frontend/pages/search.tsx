import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { WeatherProvider } from '../context/WeatherContext';
import SearchBar from '../components/SearchBar';
import { searchCities } from '../services/weatherService'
import { SearchResult } from '../types/Weather';
import { debounce } from '../utils/debounced';


const SearchResultsContent = () => {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await searchCities(query);
        if (!response.success) throw new Error(response.message || 'Failed to fetch search results');
        setResults(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch search results');
        console.error('Error searching cities:', err);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );
  
  useEffect(() => {
    if (typeof q === 'string' && q.trim() !== '') {
      debouncedSearch(q);
    }
  }, [q, debouncedSearch]);

  const handleResultClick = (result: SearchResult) => {
    router.push({
      pathname: '/city/[name]',
      query: { 
        name: result.name,
        lat: result.lat,
        lon: result.lon 
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Search Results</h1>
        <SearchBar />
      </div>
      
      {loading ? (
        <div className="flex justify-center p-8">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      ) : (
        <>
          <p className="text-lg">Showing results for <strong>"{q}"</strong></p>
          
          {results.length === 0 ? (
            <div className="card bg-base-200 p-6">
              <p>No cities found matching your search. Please try another query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map(result => (
                <div 
                  key={result.id} 
                  className="card bg-base-200 shadow-sm hover:shadow-md cursor-pointer transition-shadow"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="card-body">
                    <h2 className="card-title">{result.name}</h2>
                    <p>{result.state ? `${result.state}, ` : ''}{result.country}</p>
                    <p className="text-sm text-base-content/70">
                      Lat: {result.lat.toFixed(2)}, Lon: {result.lon.toFixed(2)}
                    </p>
                    <div className="card-actions justify-end mt-2">
                      <button 
                        onClick={() => handleResultClick(result)} 
                        className="btn btn-primary btn-sm"
                      >
                        View Weather
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { q } = router.query;

  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
        <Head>
          <title>{q ? `Search: ${q}` : 'Search'} - Weather App</title>
          <meta name="description" content="Search for cities to view weather information" />
        </Head>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link href="/" className="btn btn-outline">
              ← Back to Home
            </Link>
          </div>

          <SearchResultsContent />

          <footer className="mt-12 text-center text-sm text-base-content/70">
            <p>Powered by OpenWeatherMap API</p>
          </footer>
        </main>
      </div>
    </WeatherProvider>
  );
};

export default SearchPage;