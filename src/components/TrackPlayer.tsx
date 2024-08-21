import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { IoPlayCircle as PlayIcon, IoPauseCircleSharp as PauseIcon } from 'react-icons/io5';
import { FaForward as ForwardIcon, FaBackward as BackwardIcon } from 'react-icons/fa';
import { Track } from '../types';
import { baseUrl } from '../utils/constants';
import { useState } from 'react';
import { cn } from '../utils/utils';
import { FaAngleDown as MinimizeIcon } from 'react-icons/fa6';
import { HiDotsHorizontal as IndicatorIcon } from 'react-icons/hi';

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
        'flex transition-colors duration-700 media-player md:w-[420px] lg:w-[480px] max-w-full flex-col gap-6 fixed md:static',
        {
          'bottom-5 bg-black px-5 pb-0 pt-3 w-[95%] rounded-lg cursor-pointer gap-0':
            showMinimized && isMobile,
          'w-full inset-0 p-5': !showMinimized && isMobile,
          'minimized-view': showMinimized && isMobile,
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
          'flex-col max-w-lg mx-auto': !showMinimized && isMobile,
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
              className="absolute text-white left-2 top-1/2 -translate-y-1/2"
            >
              <MinimizeIcon size={24} />
            </button>
          )}
        </div>
        <div
          className={cn('md:mt-2', {
            'w-14 h-14': showMinimized && isMobile,
            'mt-2': !showMinimized && isMobile,
          })}
        >
          <img
            src={`${baseUrl}/assets/${track.cover}`}
            alt="name"
            className="aspect-square w-full object-cover object-center rounded-lg"
          />
        </div>
      </div>
      <div
        className={cn('mx-auto w-full', {
          'max-w-lg': !showMinimized && isMobile,
        })}
      >
        <AudioPlayer
          src={track.url}
          showDownloadProgress={false}
          showSkipControls={showMinimized && isMobile ? false : true}
          showJumpControls={false}
          {...(showMinimized && isMobile ? { customVolumeControls: [] } : {})}
          customIcons={{
            previous: <BackwardIcon className="text-white/60" size={26} />,
            next: <ForwardIcon className="text-white/60" size={26} />,
            play: <PlayIcon className="text-white" size={56} />,
            pause: <PauseIcon className="text-white" size={56} />,
          }}
          customAdditionalControls={[
            <button
              className={cn(
                'h-10 w-10 bg-white/10 rounded-full flex items-center justify-center p-2',
                {
                  hidden: showMinimized && isMobile,
                }
              )}
            >
              <IndicatorIcon className="text-white" size={21} />
            </button>,
          ]}
          onClickNext={() => handleNext(track)}
          onClickPrevious={() => handlePrev(track)}
          onEnded={() => handleNext(track)}
        />
      </div>
    </div>
  );
}

export default TrackPlayer;
