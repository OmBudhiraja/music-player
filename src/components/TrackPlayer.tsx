import 'react-h5-audio-player/lib/styles.css';
import { Track } from '../types';

type TrackPlayerProps = {
  track: Track;
};

function TrackPlayer({ track }: TrackPlayerProps) {
  return (
    <div>
      <div className="played_songs_details">
        <div className="song_played">{track.name}</div>
        <div className="artist_played">{track.artist}</div>
      </div>
      <div className="cover_art_container">
        <img
          src={`https://cms.samespace.com/assets/${track.cover}`}
          alt="name"
          className="cover_art"
        />
      </div>
      {/* <AudioPlayer
        src={track.url}
        showDownloadProgress={false}
        showSkipControls={true}
        showJumpControls={false}
        // onClickNext={(e) => handleNext(selectedSong)}
        // onClickPrevious={(e) => handlePrev(selectedSong)}
        // onEnded={() => handleNext(selectedSong)}
        // other props here
      /> */}
    </div>
  );
}

export default TrackPlayer;
