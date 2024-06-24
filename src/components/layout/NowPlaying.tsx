import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import ReactHowler from "react-howler";
import { useState } from "react";

const NowPlaying = () => {
  const [playing, setPlaying] = useState(false);

  const handlePlaying = () => {
    setPlaying((prev) => !prev);
  };

  return (
    <div className="h-screen bg-[#270909] bg-gradient-to-t from-black/100 to-transparent w-1/6 p-6 flex flex-col justify-between rounded-lg">
      <div className="bg-[#300000] text-white p-4 fixed bottom-0 right-0 w-1/6">
        <ReactHowler
          src="http://goldfirestudios.com/proj/howlerjs/sound.ogg"
          playing={playing}
        />
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
          <Button onClick={handlePlaying}>
            {playing ? <FaPause /> : <FaPlay />}
          </Button>
          <Button>
            <FaStepForward />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
