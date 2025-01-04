import { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ImageVersion } from '@/types';

interface DownloadManagerProps {
  versions: ImageVersion[];
  onDownload: (versions: ImageVersion[], format: string, quality: number) => Promise<void>;
}

export function DownloadManager({ versions, onDownload }: DownloadManagerProps) {
  const [format, setFormat] = useState('jpg');
  const [quality, setQuality] = useState(90);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    setIsDownloading(true);
    setProgress(0);

    try {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
      }, 100);

      await onDownload(versions, format, quality);
      
      clearInterval(interval);
      setProgress(100);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Select value={format} onValueChange={setFormat}>
          <SelectTrigger>
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jpg">JPG</SelectItem>
            <SelectItem value="png">PNG</SelectItem>
            <SelectItem value="webp">WEBP</SelectItem>
          </SelectContent>
        </Select>
        <Select value={quality.toString()} onValueChange={(v) => setQuality(Number(v))}>
          <SelectTrigger>
            <SelectValue placeholder="Quality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="90">High (90%)</SelectItem>
            <SelectItem value="75">Medium (75%)</SelectItem>
            <SelectItem value="50">Low (50%)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full"
      >
        {isDownloading ? (
          <Progress value={progress} className="w-full" />
        ) : progress === 100 ? (
          <>
            <Check className="mr-2 h-4 w-4" /> Downloaded
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" /> Download ({versions.length} files)
          </>
        )}
      </Button>
    </div>
  );
}