function SearchBar({ query, onChange, onSubmit, onSampleClick, loading }) {
  return (
    <div>
      <form className="search-form" onSubmit={onSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Enter medicine brand name (e.g. Crocin)..."
          value={query}
          onChange={onChange}
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="sample-queries">
        <span>Example medicine:</span>
        <button
          type="button"
          className="sample-btn"
          onClick={() => onSampleClick('Crocin')}
        >
          Crocin
        </button>
      </div>
    </div>
  )
}

export default SearchBar
