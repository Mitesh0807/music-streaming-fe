import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchplaylist,
  searchPlaylists,
} from "@/store/slices/playlist/playlist.actions";

export default function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector((state) => state.playlist.searchResults);

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      dispatch(searchPlaylists(searchTerm));
    }, 300); // Debounce search for better performance

    return () => clearTimeout(searchTimer);
  }, [searchTerm, dispatch]);

  const handlePlaylistSelect = (playlistId: string) => {
    dispatch(fetchplaylist(playlistId));
    setSearchTerm("");
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 rounded-md border border-[#500000] bg-[#300000] text-white focus:border-[#FF0000] focus:ring-[#FF0000]"
        />
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
      </div>
      {searchResults.length > 0 && (
        <div className="mt-2 rounded-md border border-[#500000] overflow-hidden bg-[#300000] text-white">
          <ul className="divide-y divide-[#500000]">
            {searchResults.map((result) => (
              <li
                key={result._id}
                className="px-4 py-3 hover:bg-[#500000] transition-colors cursor-pointer"
                onClick={() => handlePlaylistSelect(result._id)}
              >
                {result.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
