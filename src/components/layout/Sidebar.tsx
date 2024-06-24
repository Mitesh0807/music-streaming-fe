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
    <Icon />
    <span>{text}</span>
  </a>
);

const Sidebar = () => {
  return (
    <aside className="w-1/6 bg-black text-white p-6 flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold mb-10 flex items-center">
          <span className="text-[#FF0000]">Dream</span>Music
        </div>
        <nav className="space-y-4">
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
