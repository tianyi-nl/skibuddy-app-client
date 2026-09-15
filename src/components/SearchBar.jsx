import { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/searchbarbg.jpg"

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/trips?location=${searchValue}`);
  };

  return (
    <section className="relative text-center mt-[240px] pb-[0px]">
      {/* Square image behind everything */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[320px] w-[1280px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={image}
          alt="Ski destination"
          className="h-full w-full object-cover object-bottom"
        />
      </div>
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 w-[960px] mx-auto h-16 rounded-full border border-gray-300 shadow-sm bg-white px-3 mt-[48px]"
      >
        <input
          type="text"
          placeholder="Search your ski trip..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 pl-3"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition"
        >
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchBar;