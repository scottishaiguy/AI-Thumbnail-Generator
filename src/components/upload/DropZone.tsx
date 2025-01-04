import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { validateFile } from '@/lib/file-validation';

interface DropZoneProps {
  onFileAccepted: (file: File) => void;
  onError: (error: string) => void;
}

export function DropZone({ onFileAccepted, onError }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      try {
        await validateFile(file);
        setUploadProgress(0);
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 10;
          });
        }, 100);
        
        onFileAccepted(file);
      } catch (error) {
        onError(error instanceof Error ? error.message : 'Upload failed');
      }
    },
    [onFileAccepted, onError]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
        isDragging ? 'border-primary bg-primary/5' : 'border-border'
      )}
    >
      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">Drop your image here</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Supports JPG, PNG, WEBP up to 10MB
      </p>
      <Button variant="secondary" className="mt-4">
        Browse Files
      </Button>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <Progress value={uploadProgress} className="mt-4" />
      )}
    </div>
  );
}