import { useState } from 'react';
import { useSongs } from './api/queries';
import TrackItem from './components/TrackItem';
import { Track } from './types';
import TrackPlayer from './components/TrackPlayer';

function App() {
  const { data: allSongs } = useSongs();
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  return (
    <div className="h-screen p-10 bg-zinc-800 flex gap-10">
      <div>
        {allSongs?.map((item) => (
          <TrackItem
            item={item}
            selected={item.id === selectedTrack?.id}
            onSelect={setSelectedTrack}
          />
        ))}
      </div>
      {selectedTrack && <TrackPlayer track={selectedTrack} />}
    </div>
  );
}

export default App;
