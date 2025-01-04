import { useState } from 'react';
import { ImageVersion } from '@/types';
import { Slider } from '@/components/ui/slider';
import { formatDistanceToNow } from 'date-fns';

interface ComparisonViewProps {
  beforeVersion: ImageVersion;
  afterVersion: ImageVersion;
}

export function ComparisonView({ beforeVersion, afterVersion }: ComparisonViewProps) {
  const [position, setPosition] = useState(50);

  return (
    <div className="space-y-4">
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={beforeVersion.url}
          alt="Before"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div
          className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={afterVersion.url}
            alt="After"
            className="absolute top-0 right-0 w-full h-full object-cover"
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${position}%` }}
        />
      </div>
      <Slider
        value={[position]}
        onValueChange={(value) => setPosition(value[0])}
        className="w-full"
      />
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-medium">Before</p>
          <p className="text-muted-foreground">
            {formatDistanceToNow(beforeVersion.timestamp)} ago
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium">After</p>
          <p className="text-muted-foreground">
            {formatDistanceToNow(afterVersion.timestamp)} ago
          </p>
        </div>
      </div>
    </div>
  );
}