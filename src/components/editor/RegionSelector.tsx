import { useState, useRef, useCallback } from 'react';
import { Square, Pencil, Pentagon } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Region } from '@/types';

interface RegionSelectorProps {
  imageUrl: string;
  onRegionSelected: (region: Region) => void;
}

export function RegionSelector({ imageUrl, onRegionSelected }: RegionSelectorProps) {
  const [tool, setTool] = useState<'rectangle' | 'polygon' | 'freehand'>('rectangle');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startPoint = useRef<{ x: number; y: number } | null>(null);

  const startDrawing = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    startPoint.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setIsDrawing(true);
  }, []);

  const draw = useCallback(
    (e: React.MouseEvent) => {
      if (!isDrawing || !canvasRef.current || !startPoint.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const currentPoint = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;

      if (tool === 'rectangle') {
        ctx.strokeRect(
          startPoint.current.x,
          startPoint.current.y,
          currentPoint.x - startPoint.current.x,
          currentPoint.y - startPoint.current.y
        );
      }
    },
    [isDrawing, tool]
  );

  const stopDrawing = useCallback(() => {
    if (!isDrawing || !canvasRef.current || !startPoint.current) return;

    const region: Region = {
      id: crypto.randomUUID(),
      type: tool === 'rectangle' ? 'rectangle' : 'freeform',
      coordinates: [[startPoint.current.x, startPoint.current.y]],
    };

    onRegionSelected(region);
    setIsDrawing(false);
    startPoint.current = null;
  }, [isDrawing, tool, onRegionSelected]);

  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt="Edit canvas"
        className="max-w-full h-auto"
        onLoad={(e) => {
          if (canvasRef.current) {
            canvasRef.current.width = e.currentTarget.width;
            canvasRef.current.height = e.currentTarget.height;
          }
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <div className="absolute top-4 right-4">
        <ToggleGroup type="single" value={tool} onValueChange={(value: any) => setTool(value)}>
          <ToggleGroupItem value="rectangle" aria-label="Rectangle tool">
            <Square className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="polygon" aria-label="Polygon tool">
            <Pentagon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="freehand" aria-label="Freehand tool">
            <Pencil className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}