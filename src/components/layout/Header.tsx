import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-[#500000] text-white z-10 p-4">
      <div className="flex items-center justify-between">
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
    </header>
  );
};

export default Header;
