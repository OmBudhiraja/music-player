import { useState } from 'react';
import { useSongs } from './api/queries';
import TrackItem from './components/TrackItem';
import { Track } from './types';

function App() {
  const { data } = useSongs();
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  return (
    <div className="h-screen p-10 bg-zinc-800 flex">
      <div>
        {data?.map((item) => (
          <TrackItem
            item={item}
            selected={item.id === selectedTrack?.id}
            onSelect={setSelectedTrack}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
