/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Howl } from 'howler';
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";

const NowPlaying = () => {
  const [playing, setPlaying] = useState(false);
  const song = useAppSelector((state) => state?.playlist?.plyingSong);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    if (!song || !song.url) return;

    if (sound) {
      // @ts-ignore
      sound.stop();
      // @ts-ignore
      sound.unload();
    }

    const newSound = new Howl({
      src: [song.url],
      html5: true,
      onload: () => {
        console.log('Audio loaded successfully');
        setPlaying(false);
      },
      onplay: () => {
        console.log('Audio started playing');
        setPlaying(true);
      },
      onpause: () => {
        console.log('Audio paused');
        setPlaying(false);
      },
      onstop: () => {
        console.log('Audio stopped');
        setPlaying(false);
      },
      onend: () => {
        console.log('Audio finished playing');
        setPlaying(false);
      },
      onloaderror: (_id, error) => console.error('Error loading audio:', error),
      onplayerror: (_id, error) => console.error('Error playing audio:', error),
    });

    // @ts-ignore
    setSound(newSound);

  }, [song]);

  const handlePlaying = () => {
    if (!sound) return;

    if (playing) {
      // @ts-ignore
      sound.pause();
    } else {
      // @ts-ignore
      sound.play();
    }
  };

  return (
    <div className="h-screen bg-[#270909] bg-gradient-to-t from-black/100 to-transparent w-1/6 p-6 flex flex-col justify-between rounded-lg">
      <div className="bg-[#300000] text-white p-4 fixed bottom-0 right-0 w-1/6">
        <img src={song?.image} alt="Now Playing" className="w-full rounded" />
        <div className="mt-2">
          <div className="font-bold">{song?.title ?? '"Nothing Playing"'}</div>
          <div className="text-sm">{song?.artist ?? "Unknown Artist"}</div>
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