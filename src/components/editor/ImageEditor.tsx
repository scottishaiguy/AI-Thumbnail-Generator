import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageVersion, Region } from '@/types';

interface ImageEditorProps {
  currentImage: ImageVersion | null;
  onRegionSelect: (region: Region) => void;
  onPromptSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export function ImageEditor({
  currentImage,
  onRegionSelect,
  onPromptSubmit,
  isLoading,
}: ImageEditorProps) {
  const [prompt, setPrompt] = useState('');

  if (!currentImage) {
    return (
      <Card className="p-6 text-center">
        <p>No image selected. Upload an image or generate one to start editing.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative border rounded-lg overflow-hidden">
        <img
          src={currentImage.url}
          alt="Current version"
          className="w-full h-auto"
        />
        {/* Region selection overlay will go here */}
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder="Describe the changes you want to make..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button 
          onClick={() => onPromptSubmit(prompt)}
          disabled={isLoading || !prompt.trim()}
          className="w-full"
        >
          {isLoading ? 'Processing...' : 'Apply Changes'}
        </Button>
      </div>
    </div>
  );
}