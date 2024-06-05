import { useState, useRef, useEffect } from "react";

import { SearchBarProps } from "@/Lib/Types";

function SearchBar({ apiEndpoint, resultType }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear any existing timeout
    }

    timeoutRef.current = setTimeout(async () => {
      if (!searchQuery) return; // Handle empty search

      try {
        const response = await fetch(
          `${apiEndpoint}&searchString=${searchQuery}`
        );
        const data = await response.json();
        setSearchResults(data.results || []); // Assuming results data structure
      } catch (error) {
        console.error("Error fetching search results:", error);
        // Handle errors gracefully (e.g., display an error message)
      }
    }, 500); // Adjust delay as needed (in milliseconds)
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery) return; // Handle empty search

    try {
      const response = await fetch(
        `${apiEndpoint}&searchString=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data.results || []); // Assuming results data structure
    } catch (error) {
      console.error("Error fetching search results:", error);
      // Handle errors gracefully (e.g., display an error message)
    }
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
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id || result.someUniqueIdentifier}>
                {/* Display search result information here */}
                {result.name || result.username}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
