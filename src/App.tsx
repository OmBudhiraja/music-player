import { useEffect, useState } from 'react';
import { useSongs } from './api/queries';
import TrackPlayer from './components/TrackPlayer';
import { Track } from './types';
import { type Tab, Tabs } from './utils/constants';
import Sidebar from './components/Sidebar';
import TrackList from './components/TrackList';

function App() {
  const { data: allSongs } = useSongs();
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const [activeTab, setActiveTab] = useState<Tab>(Tabs.ForYou);
  const [activeTabSongs, setActiveTabSongs] = useState<Track[]>([]);

  useEffect(() => {
    if (!allSongs) return;

    setSelectedTrack(allSongs[0]);
  }, [allSongs]);

  useEffect(() => {
    if (!allSongs) return;

    if (activeTab === Tabs.ForYou) {
      setActiveTabSongs(allSongs);
    } else {
      setActiveTabSongs(allSongs.filter((item) => item.top_track));
    }
  }, [activeTab, allSongs]);

  function handleNext(curTrack: Track) {
    const idx = activeTabSongs.findIndex((item) => item.id === curTrack.id);
    if (idx === -1) {
      // setSelectedTrack(allSongs);
    }
    setSelectedTrack(activeTabSongs[(idx + 1) % activeTabSongs.length]);
  }

  function handlePrev(curTrack: Track) {
    const idx = activeTabSongs.findIndex((item) => item.id === curTrack.id);
    if (idx === -1) {
      // setSelectedTrack(allSongs);
    }
    setSelectedTrack(activeTabSongs[(idx - 1 + activeTabSongs.length) % activeTabSongs.length]);
  }

  return (
    <div
      style={{
        background: `linear-gradient(to bottom right, ${selectedTrack?.accent} 0%, #000 100%)`,
      }}
      className="default-gradient h-screen transition-colors p-5 md:p-8 bg-zinc-800 flex flex-col items-center lg:flex-row lg:gap-20 xl:gap-28 gap-8"
    >
      <Sidebar />
      <div className="flex h-full items-center justify-center md:justify-between lg:justify-center w-full lg:gap-20 xl:gap-28 gap-8 md:gap-6 overflow-hidden">
        <TrackList
          tracks={activeTabSongs}
          selectedTrack={selectedTrack}
          setSelectedTrack={setSelectedTrack}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {selectedTrack && (
          <TrackPlayer track={selectedTrack} handleNext={handleNext} handlePrev={handlePrev} />
        )}
      </div>
    </div>
  );
}

export default App;
