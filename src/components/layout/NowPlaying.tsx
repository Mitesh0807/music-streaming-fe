import { FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import { Button } from "@/components/ui/button";

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
        <Button>
          <FaStepBackward />
        </Button>
        <Button>
          <FaPlay />
        </Button>
        <Button>
          <FaStepForward />
        </Button>
      </div>
    </div>
  );
};

export default NowPlaying;
