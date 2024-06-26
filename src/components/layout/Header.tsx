import Component from "./SearchInput";

const Header = () => {
  return (
    <header className="bg-[#500000] text-white p-4">
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
        <div className="relative">
          <Component />
        </div>
      </div>
    </header>
  );
};

export default Header;
