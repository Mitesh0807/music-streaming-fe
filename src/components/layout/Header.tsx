import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-[#500000] text-white flex items-center justify-between p-4">
      <nav className="flex space-x-6">
        <a href="#" className="hover:text-[#FF0000]">
          Music
        </a>
        <a href="#" className="hover:text-[#FF0000]">
          Podcast
        </a>
        <a href="#" className="hover:text-[#FF0000]">
          Live
        </a>
        <a href="#" className="hover:text-[#FF0000]">
          Radio
        </a>
      </nav>
      <button className="p-2">
        <FaSearch className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Header;
