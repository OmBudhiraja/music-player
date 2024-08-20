import { clsx } from 'clsx';
import { type Track } from '../types';

type TrackItemProps = {
  item: Track;
  selected: boolean;
  onSelect: (item: Track) => void;
};

function TrackItem({ item, selected, onSelect }: TrackItemProps) {
  return (
    <button
      className={clsx(
        'p-4 rounded-lg flex items-center gap-4 text-white cursor-pointer w-full transition-colors',
        {
          'bg-white/10': selected,
          'bg-transparent': !selected,
        }
      )}
      onClick={() => onSelect(item)}
    >
      <div className="h-12 w-12 overflow-hidden shrink-0">
        <img
          className="w-full h-full object-cover rounded-full"
          src={`https://cms.samespace.com/assets/${item.cover}`}
          alt=""
        />
      </div>
      <div className="flex-1 flex flex-col items-start">
        <p className="text-lg line-clamp-1">{item.name}</p>
        <p className="text-sm opacity-60">{item.artist}</p>
      </div>
      <div className="shrink-0 opacity-60 text-lg">5:32</div>
    </button>
  );
}

export default TrackItem;
