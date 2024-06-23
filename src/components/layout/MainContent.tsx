import TrackList from "@/components/layout/Tracklist";
import background from "/Background.png";

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

export default MainContent;
