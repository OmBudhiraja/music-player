import { useCallback, useEffect, useRef, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { FaBackward as BackwardIcon, FaForward as ForwardIcon } from 'react-icons/fa';
import {
  IoVolumeMute as MuteIcon,
  IoPauseCircleSharp as PauseIcon,
  IoPlayCircle as PlayIcon,
  IoVolumeHigh as VolumeIcon,
} from 'react-icons/io5';
import { HiDotsHorizontal as IndicatorIcon } from 'react-icons/hi';

import { Track } from '../types';
import { cn } from '../utils/utils';

type AudioControlsProps = {
  track: Track;
  showMinimized: boolean;
  isMobile: boolean;
  handleNext: (curTrack: Track) => void;
  handlePrev: (curTrack: Track) => void;
};

function AudioControls({
  track,
  showMinimized,
  isMobile,
  handleNext,
  handlePrev,
}: AudioControlsProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const mounted = useRef(false);

  const handlePlayPause = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, []);

  const handleAutoPlayAfterSrcChange = useCallback(() => {
    if (!audioRef.current) return;

    if (audioRef.current.error) {
      audioRef.current.load();
    }

    audioRef.current.play();
  }, []);

  const onProgressBarChange = useCallback((val: number) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = val;
    setCurrentTime(val);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (mounted.current) {
      handleAutoPlayAfterSrcChange();
    } else {
      mounted.current = true;
    }
  }, [handleAutoPlayAfterSrcChange, track]);

  return (
    <div
      className={cn('text-white flex w-full mx-auto flex-col gap-3', {
        'max-w-lg': !showMinimized && isMobile,
        'gap-0': showMinimized && isMobile,
      })}
    >
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime);
        }}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        src={track.url}
        onEnded={() => handleNext(track)}
      ></audio>

      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onChange={onProgressBarChange}
        showThumb={!showMinimized && isMobile}
      />
      <div id="controls" className="flex items-center justify-between">
        <div>
          <button
            className={cn(
              'h-10 w-10 bg-white/10 rounded-full flex items-center justify-center p-2',
              {
                hidden: showMinimized && isMobile,
              }
            )}
          >
            <IndicatorIcon className="text-white" size={21} />
          </button>
        </div>
        <div className="flex gap-3.5 items-center">
          <button
            onClick={() => handlePrev(track)}
            className={cn('p-2 rounded-full', {
              hidden: showMinimized && isMobile,
            })}
          >
            <BackwardIcon className="text-white/60" size={26} />
          </button>
          <button
            onClick={handlePlayPause}
            className={cn('p-2 rounded-full outline-none', {
              'absolute top-1/2 -translate-y-[58%] right-5': showMinimized && isMobile,
            })}
          >
            {isPlaying ? (
              <PauseIcon className="text-white" size={56} />
            ) : (
              <PlayIcon className="text-white" size={56} />
            )}
          </button>
          <button
            onClick={() => {
              handleNext(track);
            }}
            className={cn('p-2 rounded-full', {
              hidden: showMinimized && isMobile,
            })}
          >
            <ForwardIcon className="text-white/60" size={26} />
          </button>
        </div>
        <div>
          <button
            onClick={() => setVolume((prev) => (prev === 0 ? 1 : 0))}
            className={cn(
              'h-10 w-10 bg-white/10 rounded-full flex items-center justify-center p-2',
              {
                hidden: showMinimized && isMobile,
              }
            )}
          >
            {volume === 0 ? (
              <MuteIcon className="text-white" size={21} />
            ) : (
              <VolumeIcon className="text-white" size={21} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const ProgressBar = ({
  currentTime,
  duration,
  onChange,
  showThumb,
}: {
  currentTime: number;
  duration: number;
  onChange: (val: number) => void;
  showThumb: boolean;
}) => {
  const [activeVal, setActiveVal] = useState(0);
  const [seeking, setSeeking] = useState(false);

  useEffect(() => {
    if (seeking) return;

    setActiveVal(currentTime);
  }, [currentTime, seeking]);

  return (
    <Slider.Root
      className="relative flex items-center select-none touch-none w-full h-5"
      max={duration}
      value={[activeVal]}
      step={1}
      onValueChange={(value) => {
        setActiveVal(value[0]);
        setSeeking(true);
      }}
      onValueCommit={(value) => {
        setActiveVal(value[0]);
        setSeeking(false);
        onChange(value[0]);
      }}
    >
      <Slider.Track className="bg-white/20 relative grow rounded-full h-1.5">
        <Slider.Range className="absolute bg-white rounded-full h-full" />
      </Slider.Track>

      <Slider.Thumb
        className={cn('w-4 h-4 bg-white rounded-full focus:outline-none md:block', {
          hidden: !showThumb,
          block: showThumb,
        })}
        aria-label="current time"
      />
    </Slider.Root>
  );
};

export default AudioControls;
