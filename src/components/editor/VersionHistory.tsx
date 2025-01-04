import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ImageVersion } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface VersionHistoryProps {
  versions: ImageVersion[];
  onVersionSelect: (version: ImageVersion) => void;
  currentVersionId: string | null;
}

export function VersionHistory({
  versions,
  onVersionSelect,
  currentVersionId,
}: VersionHistoryProps) {
  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      <div className="space-y-4">
        {versions.map((version) => (
          <div
            key={version.id}
            className={`p-4 rounded-lg border ${
              version.id === currentVersionId
                ? 'border-primary'
                : 'border-border'
            }`}
          >
            <div className="aspect-video relative overflow-hidden rounded-md mb-2">
              <img
                src={version.url}
                alt={`Version from ${formatDistanceToNow(version.timestamp)} ago`}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {formatDistanceToNow(version.timestamp)} ago
            </p>
            <p className="text-sm mb-2">{version.description}</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onVersionSelect(version)}
              disabled={version.id === currentVersionId}
              className="w-full"
            >
              Restore This Version
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}