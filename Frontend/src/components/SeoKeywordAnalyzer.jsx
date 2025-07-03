import { useState } from "react";
import SearchBar from "./SearchBar";
import KeywordCard from "./KeywordCard";
import RecommendedKeywords from "./RecommendedKeywords";

export default function SeoKeywordAnalyzer() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResult({ error: "Please enter a keyword to search." });
      return;
    }
    setLoading(true);
    setResult(null);
    setShowAll(false);
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/seo?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.log("Error fetching data:", error);
      setResult({ error: "Failed to fetch data" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-2 sm:p-4 overflow-x-hidden">
      <div className="w-full max-w-xl bg-white rounded-lg shadow p-3 sm:p-6 mb-4 sm:mb-8 mx-auto">
        <h1 className="text-base sm:text-2xl font-bold mb-3 text-center text-blue-700 break-words">
          SEO Keyword Analyzer
        </h1>
        <div className="w-full overflow-x-hidden">
          <SearchBar
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
            loading={loading}
          />
        </div>
        {result && result.error && (
          <div className="text-red-600 text-center text-xs sm:text-base mt-2 break-words">
            {result.error}
          </div>
        )}
      </div>

      {!loading && result && result.primary_keywords && (
        <>
          <div className="w-full max-w-6xl flex flex-col sm:flex-row justify-center items-center gap-4 mb-4 sm:mb-6 px-2">
            {result.primary_keywords.length > 0 && (
              <KeywordCard item={result.primary_keywords[0]} />
            )}
          </div>

          {!showAll && result.primary_keywords.length > 1 && (
            <button
              className="mb-4 sm:mb-8 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition w-full sm:w-auto text-xs sm:text-base cursor-pointer"
              onClick={() => setShowAll(true)}
            >
              Show Recommended Keywords
            </button>
          )}

          {showAll && result.primary_keywords.length > 1 && (
            <>
              <hr className="w-full max-w-4xl border-t-2 border-blue-200 mb-4 sm:mb-8 mt-2" />
              <div className="w-full flex flex-col items-center px-2">
                <RecommendedKeywords
                  keywords={result.primary_keywords.slice(1)}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
