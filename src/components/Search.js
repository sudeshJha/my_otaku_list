const Search = ({ query, setQuery }) => {
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="🔍 Search Anime"
      value={query}
      onChange={handleQuery}
      className="search"
    />
  );
};

export default Search;
