import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { DragHandleButton } from "@atlaskit/pragmatic-drag-and-drop-react-accessibility/drag-handle-button";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { getReorderDestinationIndex } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index";

const TrackListContext = createContext(null);

const useTrackListContext = () => {
  const context = useContext(TrackListContext);
  if (!context) {
    throw new Error(
      "useTrackListContext must be used within a TrackListProvider"
    );
  }
  return context;
};

const TrackItem = ({ track, index }) => {
  const { registerItem, instanceId } = useTrackListContext();
  const ref = useRef(null);
  const [closestEdge, setClosestEdge] = useState(null);
  const dragHandleRef = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const dragHandle = dragHandleRef.current;
    if (!element || !dragHandle) return;

    const data = { track, index, instanceId };

    return combine(
      registerItem({ trackId: track.title, element }),
      draggable({
        element: dragHandle,
        getInitialData: () => data,
      }),
      dropTargetForElements({
        element,
        canDrop: ({ source }) => source.data.instanceId === instanceId,
        getData: ({ input }) =>
          attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          }),
        onDrag: ({ self, source }) => {
          const isSource = source.element === element;
          if (isSource) {
            setClosestEdge(null);
            return;
          }
          setClosestEdge(extractClosestEdge(self.data));
        },
        onDragLeave: () => setClosestEdge(null),
        onDrop: () => setClosestEdge(null),
      })
    );
  }, [track, index, instanceId, registerItem]);

  return (
    <tr ref={ref} className="hover:bg-white/10 transition-colors">
      <td className="py-3">
        <DragHandleButton
          ref={dragHandleRef}
          label={`Reorder ${track.title}`}
        />
      </td>
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
      {closestEdge && <DropIndicator edge={closestEdge} gap="1px" />}
    </tr>
  );
};

const TrackList = () => {
  const [tracks, setTracks] = useState([
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
  ]);

  const [instanceId] = useState(() => Symbol("instance-id"));

  const reorderTrack = useCallback(({ startIndex, finishIndex }) => {
    setTracks((currentTracks) =>
      reorder({
        list: currentTracks,
        startIndex,
        finishIndex,
      })
    );
  }, []);

  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => source.data.instanceId === instanceId,
      onDrop: ({ location, source }) => {
        const target = location.current.dropTargets[0];
        if (!target) return;

        const sourceIndex = source.data.index;
        const targetIndex = tracks.findIndex(
          (track) => track.title === target.data.track.title
        );
        const closestEdgeOfTarget = extractClosestEdge(target.data);

        const finishIndex = getReorderDestinationIndex({
          startIndex: sourceIndex,
          indexOfTarget: targetIndex,
          closestEdgeOfTarget,
          axis: "vertical",
        });

        reorderTrack({ startIndex: sourceIndex, finishIndex });
      },
    });
  }, [instanceId, tracks, reorderTrack]);

  const registerItem = useCallback(({ trackId, element }) => {
    // Implementation of item registration if needed
    return () => {
      // Cleanup function
    };
  }, []);

  const contextValue = {
    registerItem,
    reorderTrack,
    instanceId,
  };

  return (
    <TrackListContext.Provider value={contextValue}>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Popular</h2>
          <button className="text-gray-400 hover:text-white">See All</button>
        </div>
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="pb-2 font-normal text-gray-400"></th>
              <th className="pb-2 font-normal text-gray-400">#</th>
              <th className="pb-2 font-normal text-gray-400">TITLE</th>
              <th className="pb-2 font-normal text-gray-400">PLAYING</th>
              <th className="pb-2 font-normal text-gray-400">TIME</th>
              <th className="pb-2 font-normal text-gray-400">ALBUM</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, index) => (
              <TrackItem key={track.title} track={track} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </TrackListContext.Provider>
  );
};

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
