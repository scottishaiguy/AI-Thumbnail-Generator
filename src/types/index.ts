export interface ImageVersion {
  id: string;
  url: string;
  timestamp: Date;
  description: string;
  modifiedRegions?: Region[];
}

export interface Region {
  id: string;
  type: 'rectangle' | 'freeform';
  coordinates: number[][];
}

export interface EditorState {
  currentImage: ImageVersion | null;
  versions: ImageVersion[];
  selectedRegion: Region | null;
  isLoading: boolean;
  error: string | null;
}