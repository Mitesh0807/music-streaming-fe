import {
  FaHome,
  FaFire,
  FaMusic,
  FaCompass,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";

const MenuItem = ({ icon: Icon, text }: { icon: IconType; text: string }) => (
  <a href="#" className="flex items-center space-x-3 hover:text-[#FF0000]">
    <Icon className="h-5 w-5 " />
    <span className="hidden md:inline">{text}</span>
  </a>
);

const Sidebar = () => {
  return (
    <aside className="w-[80px] md:w-1/6 bg-black text-white p-6 flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold mb-10 flex items-center justify-center md:justify-start">
          <span className="text-[#FF0000] hidden md:inline">Dream</span>
          <span className="md:hidden text-[#FF0000]">D</span>
          <span className="hidden md:inline">Music</span>
          <span className="md:hidden">M</span>
        </div>
        <nav className="space-y-4 ml-1 md:ml-0">
          <MenuItem icon={FaHome} text="Home" />
          <MenuItem icon={FaFire} text="Trends" />
          <MenuItem icon={FaMusic} text="Library" />
          <MenuItem icon={FaCompass} text="Discover" />
        </nav>
      </div>
      <div className="space-y-4">
        <MenuItem icon={FaCog} text="Settings" />
        <MenuItem icon={FaSignOutAlt} text="Log Out" />
      </div>
    </aside>
  );
};

export default Sidebar;