import React, { useState, useEffect } from 'react';
import { Youtube, Brain, Loader2 } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import mermaid from 'mermaid';

const Explain = () => {
  const [urls, setUrls] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [diagram, setDiagram] = useState(null); 
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize Mermaid
    if (diagram) {
      mermaid.initialize({ startOnLoad: true });
      mermaid.contentLoaded();
    }
  }, [diagram]);

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const addUrlInput = () => {
    if (urls.length < 3) {
      setUrls([...urls, '']);
    }
  };

  const handleExplain = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setExplanation(null);
    setDiagram(null);

    try {
      const response = await axios.post(
        'quick-notes-backend-three.vercel.app/fetch-transcript/',
        { urls },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setExplanation(response.data.transcript);
      setDiagram(response.data.diagram); // Set the Mermaid diagram from the response
    } catch (err) {
      setError('Unable to summarize this video. Please check the URL or try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([explanation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'explanation.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const components = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-6 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-4 mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
    ),
    code: ({ inline, className, children }) => {
      if (inline) {
        return <code className="bg-gray-700 px-1.5 py-0.5 rounded text-sm">{children}</code>;
      }
      return (
        <pre className="bg-gray-700 p-4 rounded-lg mb-4 overflow-x-auto">
          <code className={className}>{children}</code>
        </pre>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Brain className="h-12 w-16 text-gray-400 animate-pulse" />
            <h1 className="text-4xl font-bold ml-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Video Explanations
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Enter up to 3 YouTube video URLs to receive AI-powered explanations</p>
          <p className="text-gray-400 text-lg">Note: The total length of all combined videos should not exceed 60 minutes.</p>
        </div>

        <form onSubmit={handleExplain} className="space-y-6">
          <div className="space-y-4">
            {urls.map((url, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Youtube className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  placeholder="Paste YouTube video URL here"
                  className="block w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500 text-white transition-all duration-200 hover:border-gray-600"
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              type="button"
              onClick={addUrlInput}
              disabled={urls.length >= 3}
              className="px-6 py-3 rounded-xl font-semibold text-indigo-400 border border-indigo-400 hover:bg-indigo-400/10 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>Add Another Video</span>
              {urls.length < 3 && <span className="text-sm">({3 - urls.length} left)</span>}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5" />
                  <span>Explain Videos</span>
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-8 bg-red-500/10 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl animate-fade-in">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}
        {!explanation && !loading && !error && (
          <div className="text-center bg-gray-800 border border-gray-700 rounded-lg p-8 mt-6">
            <Youtube className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-400">Enter YouTube URLs above to get started</p>
          </div>
        )}
        {explanation && (
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 animate-fade-in shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Brain className="h-6 w-6 text-indigo-400" />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> AI Explanation Diagram</span>
            </h2>
            <ReactMarkdown components={components} className="prose prose-invert prose-lg text-gray-300 leading-relaxed">
              {explanation}
            </ReactMarkdown>
            
            <div className="flex justify-end mt-4">
              <button
                onClick={handleDownload}
                className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transition-all duration-200"
              >
                Download Explanation
              </button>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Explain;
