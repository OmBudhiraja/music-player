import { Track } from '../types';
import { baseUrl } from '../utils/constants';
import { useState } from 'react';
import { cn } from '../utils/utils';
import { FaAngleDown as MinimizeIcon } from 'react-icons/fa6';
import AudioControls from './AudioControls';

type TrackPlayerProps = {
  track: Track;
  handleNext: (curTrack: Track) => void;
  handlePrev: (curTrack: Track) => void;
  isMobile: boolean;
};

function TrackPlayer({ track, handleNext, handlePrev, isMobile }: TrackPlayerProps) {
  const [showMinimized, setShowMinimized] = useState(true);

  return (
    <div
      onClick={() => {
        if (isMobile && showMinimized) {
          setShowMinimized(false);
        }
      }}
      className={cn(
        'flex transition-all overflow-y-auto overflow-x-hidden duration-300 md:w-[420px] lg:w-[480px] max-w-full flex-col gap-6 fixed md:static',
        {
          'bottom-5 bg-black px-5 pb-0.5 pt-3 w-[95%] rounded-lg cursor-pointer gap-0.5':
            showMinimized && isMobile,
          'w-full h-full bottom-0 p-5': !showMinimized && isMobile,
        }
      )}
      style={{
        background: isMobile
          ? `linear-gradient(to bottom right, ${track.accent} 0%, #000 100%)`
          : 'transparent',
      }}
    >
      <div
        className={cn('flex md:flex-col gap-6', {
          'flex-row-reverse justify-end': showMinimized && isMobile,
          'flex-col max-w-lg mx-auto flex-1': !showMinimized && isMobile,
        })}
      >
        <div
          className={cn('flex flex-col md:gap-1 items-start relative', {
            'gap-0': showMinimized && isMobile,
            'gap-1 items-center': !showMinimized && isMobile,
          })}
        >
          <p
            className={cn('line-clamp-1 md:text-3xl font-semibold text-white', {
              'text-lg': showMinimized && isMobile,
              'text-3xl': !showMinimized && isMobile,
            })}
          >
            {track.name}
          </p>
          <p className="text-white/60">{track.artist}</p>
          {!showMinimized && isMobile && (
            <button
              onClick={() => setShowMinimized(true)}
              className="absolute text-white left-2 top-2"
            >
              <MinimizeIcon size={24} />
            </button>
          )}
        </div>
        <div
          className={cn('md:mt-2', {
            'w-14 h-14': showMinimized && isMobile,
            'mt-2 flex-1 flex items-center': !showMinimized && isMobile,
          })}
        >
          <img
            src={`${baseUrl}/assets/${track.cover}`}
            alt="name"
            className="aspect-square w-full object-cover object-center rounded-lg"
          />
        </div>
      </div>

      <AudioControls
        track={track}
        showMinimized={showMinimized}
        isMobile={isMobile}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  );
}

export default TrackPlayer;
