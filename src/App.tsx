import { useEffect, useState } from 'react';
import { useSongs } from './api/queries';
import TrackPlayer from './components/TrackPlayer';
import { Track } from './types';
import { type Tab, Tabs } from './utils/constants';
import Sidebar from './components/Sidebar';
import TrackList from './components/TrackList';
import { useMediaQuery } from './hooks/useMediaQuery';

function App() {
  const { data: allSongs } = useSongs();
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const [activeTab, setActiveTab] = useState<Tab>(Tabs.ForYou);
  const [activeTabSongs, setActiveTabSongs] = useState<Track[]>([]);

  const isMobile = !useMediaQuery('(min-width: 768px)');

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
        background: isMobile
          ? 'rgba(0, 0, 0, 0.95)'
          : `linear-gradient(to bottom right, ${selectedTrack?.accent} 0%, #000 100%)`,
      }}
      className="default-gradient h-screen transition-colors duration-700 p-4 md:p-8 flex flex-col items-center lg:flex-row xl:gap-28 gap-4"
    >
      <Sidebar />
      <div className="flex h-full items-center justify-center lg:justify-center w-full lg:gap-20 xl:gap-28 gap-8 md:gap-12 overflow-hidden">
        <TrackList
          tracks={activeTabSongs}
          selectedTrack={selectedTrack}
          setSelectedTrack={setSelectedTrack}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {selectedTrack && (
          <TrackPlayer
            track={selectedTrack}
            handleNext={handleNext}
            handlePrev={handlePrev}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  );
}

export default App;
