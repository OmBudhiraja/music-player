import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { IoPlayCircle as PlayIcon, IoPauseCircleSharp as PauseIcon } from 'react-icons/io5';
import { FaForward as ForwardIcon, FaBackward as BackwardIcon } from 'react-icons/fa';
import { Track } from '../types';

type TrackPlayerProps = {
  track: Track;
};

function TrackPlayer({ track }: TrackPlayerProps) {
  return (
    <div className="media-player w-[480px] max-w-full flex flex-col gap-6">
      <div className="flex flex-col gap-1 items-start">
        <p className="line-clamp-1 text-3xl font-semibold text-white">{track.name}</p>
        <p className="text-white/60 ">{track.artist}</p>
      </div>
      <div className="mt-2">
        <img
          src={`https://cms.samespace.com/assets/${track.cover}`}
          alt="name"
          className="aspect-square w-full object-cover object-center rounded-lg"
        />
      </div>
      <AudioPlayer
        src={track.url}
        showDownloadProgress={false}
        showSkipControls={true}
        showJumpControls={false}
        customIcons={{
          previous: <BackwardIcon className="text-white/60" size={26} />,
          next: <ForwardIcon className="text-white/60" size={26} />,
          play: <PlayIcon className="text-white" size={56} />,
          pause: <PauseIcon className="text-white" size={56} />,
        }}
      />
    </div>
  );
}

export default TrackPlayer;
