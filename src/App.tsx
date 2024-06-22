const TrackList = () => {
  const tracks = [
    {
      title: "Billie Jean",
      plays: "1,040,811,084",
      length: "4:53",
      album: "Thriller 25 Sup...",
    },
    {
      title: "Beat It",
      plays: "643,786,045",
      length: "4:18",
      album: "Thriller 25 Sup...",
    },
    {
      title: "Smooth Criminal - 2012 Rema...",
      plays: "407,234,004",
      length: "4:17",
      album: "Thriller 25 Sup...",
    },
    {
      title: "Don't Stop 'Til You Get Enough",
      plays: "316,391,952",
      length: "6:05",
      album: "Bad 25th Anni...",
    },
    {
      title: "Rock With You - Single Version",
      plays: "268,187,218",
      length: "3:40",
      album: "Off The Wall",
    },
  ];

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Popular</h2>
        <button className="text-gray-400 hover:text-white">See All</button>
      </div>
      <table className="w-full text-left text-gray-300">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="pb-2 font-normal text-gray-400">#</th>
            <th className="pb-2 font-normal text-gray-400">TITLE</th>
            <th className="pb-2 font-normal text-gray-400">PLAYING</th>
            <th className="pb-2 font-normal text-gray-400">TIME</th>
            <th className="pb-2 font-normal text-gray-400">ALBUM</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <tr key={index} className="hover:bg-white/10 transition-colors">
              <td className="py-3">{index + 1}</td>
              <td className="py-3 flex items-center">
                <img
                  src={`path_to_album_cover_${index + 1}`}
                  alt={track.title}
                  className="w-10 h-10 mr-3"
                />
                {track.title}
              </td>
              <td className="py-3">{track.plays}</td>
              <td className="py-3">{track.length}</td>
              <td className="py-3">{track.album}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// const Header = () => {
//   return (
//     <div className="bg-red-900 text-[#E5DDDD] flex items-center p-6">
//       <img
//         src="path_to_michael_jackson_image"
//         alt="Michael Jackson"
//         className="w-24 h-24 mr-6"
//       />
//       <div>
//         <div className="text-xl font-bold">Michael Jackson</div>
//         <div>27,852,501 monthly listeners</div>
//       </div>
//       <input
//         type="text"
//         placeholder="Michael Jackson"
//         className="ml-auto p-2 rounded bg-[#2C0000] text-white"
//       />
//       <button className="ml-2 p-2 bg-[#2C0000] rounded">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 text-white"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M12.9 14.32a8 8 0 111.414-1.415l4.283 4.284a1 1 0 01-1.415 1.414l-4.283-4.284zm-1.415-5.914a6 6 0 100 12 6 6 0 000-12z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>
//     </div>
//   );
// };

// import {
//   FaHome,
//   FaFire,
//   FaMusic,
//   FaCompass,
//   FaCog,
//   FaSignOutAlt,
// } from "react-icons/fa";

// const Sidebar = () => {
//   return (
//     <div className="bg-[#0E0E0E] text-white h-screen w-1/5 p-6 flex flex-col justify-between">
//       <div>
//         <div className="text-3xl font-bold mb-10 flex items-center">
//           <img
//             src="path_to_logo"
//             alt="DreamMusic Logo"
//             className="h-8 w-8 mr-2"
//           />
//           <span className="text-[#E91E1E]">Dream</span>Music
//         </div>
//         <nav className="space-y-4">
//           <a
//             href="#"
//             className="flex items-center space-x-3 hover:text-[#E91E1E]"
//           >
//             <FaHome />
//             <span>Home</span>
//           </a>
//           <a
//             href="#"
//             className="flex items-center space-x-3 hover:text-[#E91E1E]"
//           >
//             <FaFire />
//             <span>Trends</span>
//           </a>
//           <a
//             href="#"
//             className="flex items-center space-x-3 hover:text-[#E91E1E]"
//           >
//             <FaMusic />
//             <span>Library</span>
//           </a>
//           <a
//             href="#"
//             className="flex items-center space-x-3 hover:text-[#E91E1E]"
//           >
//             <FaCompass />
//             <span>Discover</span>
//           </a>
//         </nav>
//       </div>
//       <div className="space-y-4">
//         <a
//           href="#"
//           className="flex items-center space-x-3 hover:text-[#E91E1E]"
//         >
//           <FaCog />
//           <span>Settings</span>
//         </a>
//         <a
//           href="#"
//           className="flex items-center space-x-3 hover:text-[#E91E1E]"
//         >
//           <FaSignOutAlt />
//           <span>Log Out</span>
//         </a>
//       </div>
//     </div>
//   );
// };

import {
  FaHome,
  FaFire,
  FaMusic,
  FaCompass,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaPlay,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";

export default function App() {
  return (
    <div className="flex bg-[#500000] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <MainContent />
      </div>
      <NowPlaying />
    </div>
  );
}

const Sidebar = () => {
  return (
    <div className="bg-black text-white h-screen w-1/6 p-6 flex flex-col justify-between">
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
    </div>
  );
};

const MenuItem = ({ icon: Icon, text }) => (
  <a href="#" className="flex items-center space-x-3 hover:text-[#FF0000]">
    <Icon />
    <span>{text}</span>
  </a>
);

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

import background from "/Background.png";
import artistImage from "/Michael.png";
const MainContent = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-8 relative">
        <img
          src={background}
          alt="Background"
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg"></div>
        <div className="absolute bottom-4 left-4 flex items-end">
          <div className="text-white">
            <div className="flex items-center mb-2">
              <span className="bg-blue-500 text-xs px-2 py-1 rounded-full mr-2">
                Verified Artist
              </span>
            </div>
            <h1 className="text-4xl font-bold">Michael Jackson</h1>
            <p>27,855,501 monthly listeners</p>
          </div>
        </div>
      </div>
      <TrackList />
    </div>
  );
};
const NowPlaying = () => {
  return (
    <div className="bg-[#300000] text-white p-4 fixed bottom-0 right-0 w-1/6">
      <img
        src="path_to_beat_it_image"
        alt="Now Playing"
        className="w-full rounded"
      />
      <div className="mt-2">
        <div className="font-bold">Beat It</div>
        <div className="text-sm">Michael Jackson</div>
      </div>
      <div className="flex justify-between mt-2">
        <button>
          <FaStepBackward />
        </button>
        <button>
          <FaPlay />
        </button>
        <button>
          <FaStepForward />
        </button>
      </div>
    </div>
  );
};
