import clsx from 'clsx';
import { type Tab, Tabs } from '../utils/constants';
import TrackItem from './TrackItem';
import { Track } from '../types';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { CiSearch as SearchIcon } from 'react-icons/ci';
import { useEffect, useState } from 'react';

type TrackListProps = {
  tracks: Track[];
  selectedTrack: Track | null;
  setSelectedTrack: (track: Track) => void;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
};

function TrackList({
  tracks,
  selectedTrack,
  setSelectedTrack,
  activeTab,
  setActiveTab,
}: TrackListProps) {
  const [searchValue, setSearchValue] = useState('');
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);

  useEffect(() => {
    if (!searchValue) {
      setFilteredTracks(tracks);
      return;
    }

    const searchValueLower = searchValue.toLowerCase();
    const filtered = tracks.filter(
      (item) =>
        item.name.toLowerCase().includes(searchValueLower) ||
        item.artist.toLowerCase().includes(searchValueLower)
    );

    setFilteredTracks(filtered);
  }, [searchValue, tracks]);

  const [animationParent] = useAutoAnimate();

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden w-80 lg:w-96 max-w-full">
      <div className="flex items-center gap-6 font-semibold px-2">
        <button
          onClick={() => setActiveTab(Tabs.ForYou)}
          className={clsx('capitalize text-2xl outline-none p-2 rounded-md focus:bg-white/10', {
            'text-white': activeTab === Tabs.ForYou,
            'text-white/50': activeTab !== Tabs.ForYou,
          })}
        >
          {Tabs.ForYou}
        </button>
        <button
          onClick={() => setActiveTab(Tabs.TopTracks)}
          className={clsx('capitalize text-2xl outline-none p-2 rounded-md focus:bg-white/10', {
            'text-white': activeTab === Tabs.TopTracks,
            'text-white/50': activeTab !== Tabs.TopTracks,
          })}
        >
          {Tabs.TopTracks}
        </button>
      </div>
      <div className="relative px-2">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          className="bg-white/10 rounded-lg py-2.5 pl-4 pr-8 w-full text-white/80 outline-none"
          placeholder="Search Song, Artist"
        />
        <SearchIcon size={24} className="absolute right-8 top-1/2 -translate-y-1/2 text-white/60" />
      </div>
      <div
        className="h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
        ref={animationParent}
      >
        {filteredTracks.map((item) => (
          <TrackItem
            key={item.id}
            item={item}
            selected={item.id === selectedTrack?.id}
            onSelect={setSelectedTrack}
          />
        ))}
      </div>
    </div>
  );
}

export default TrackList;
