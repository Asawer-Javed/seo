import PropTypes from "prop-types";

export default function SearchBar({ query, setQuery, handleSearch, loading }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter keyword"
        className="flex-1 px-4 py-2 border border-gray-400 rounded 
             focus:outline-none focus:border-blue-500"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <button
        onClick={handleSearch}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center cursor-pointer w-full sm:w-auto"
        disabled={loading}
      >
        {loading ? (
          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 50 50">
            <circle
              className="opacity-20"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
            />
            <path
              className="opacity-80"
              fill="currentColor"
              d="M25 5a20 20 0 0 1 20 20"
            />
          </svg>
        ) : (
          "Search"
        )}
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
