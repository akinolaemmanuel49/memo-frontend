import { useState } from "react";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality here
  };

  return (
    <div className="flex flex-col items-center w-full">
      <form
        onSubmit={handleSearchSubmit}
        className="w-full flex justify-center mb-4"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="px-4 py-2 border rounded-lg w-full md:w-80"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-gray-800 text-white rounded-lg"
        >
          Search
        </button>
      </form>
      <div>
        {/* Results will be displayed here */}
        Results are displayed here.
      </div>
    </div>
  );
}

export default SearchBar;
