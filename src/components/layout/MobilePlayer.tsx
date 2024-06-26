import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const MobilePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const song = useAppSelector((state) => state?.playlist?.plyingSong);
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    if (!song || !song.url) return;

    if (sound) {
      sound.stop();
      sound.unload();
    }

    const newSound = new Howl({
      src: [song.url],
      html5: true,
      onload: () => {
        setIsPlaying(false);
      },
      onplay: () => {
        setIsPlaying(true);
      },
      onpause: () => {
        setIsPlaying(false);
      },
      onstop: () => {
        setIsPlaying(false);
      },
      onend: () => {
        setIsPlaying(false);
      },
      onloaderror: (_id, error) => console.error("Error loading audio:", error),
      onplayerror: (_id, error) => console.error("Error playing audio:", error),
    });

    setSound(newSound);
  }, [song, sound]);

  const handlePlaying = () => {
    if (!sound) return;

    if (isPlaying) {
      sound.pause();
    } else {
      sound.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (sound && !isPlaying) {
      sound.stop();
    }
  }, [sound, isPlaying]);

  return (
    <div className="md:hidden border border-white text-white sticky bottom-1 bg-gray-800 h-[60px] flex items-center justify-between px-4">
      <div className="flex items-center">
        <img src={song?.image} alt="Music" className="w-10 h-10 rounded" />
        <div className="ml-3">
          <p className="text-sm">{song?.title}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button className="mx-2">
          <FaBackward />
        </button>
        <button className="mx-2" onClick={handlePlaying}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="mx-2">
          <FaForward />
        </button>
      </div>
    </div>
  );
};

export default MobilePlayer;
