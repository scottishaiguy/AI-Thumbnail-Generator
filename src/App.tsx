import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { ImageEditor } from '@/components/editor/ImageEditor';
import { VersionHistory } from '@/components/editor/VersionHistory';
import { ImageVersion, Region } from '@/types';

export default function App() {
  const [editorState, setEditorState] = useState({
    currentImage: null,
    versions: [],
    selectedRegion: null,
    isLoading: false,
    error: null,
  });

  const handleRegionSelect = (region: Region) => {
    setEditorState((prev) => ({ ...prev, selectedRegion: region }));
  };

  const handlePromptSubmit = async (prompt: string) => {
    setEditorState((prev) => ({ ...prev, isLoading: true }));
    try {
      // TODO: Implement Replicate API integration
      // For now, just log the prompt
      console.log('Processing prompt:', prompt);
    } catch (error) {
      setEditorState((prev) => ({
        ...prev,
        error: 'Failed to process image',
      }));
    } finally {
      setEditorState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        <div className="grid gap-6 md:grid-cols-[1fr,300px]">
          <ImageEditor
            currentImage={editorState.currentImage}
            onRegionSelect={handleRegionSelect}
            onPromptSubmit={handlePromptSubmit}
            isLoading={editorState.isLoading}
          />
          <VersionHistory
            versions={editorState.versions}
            onVersionSelect={(version) =>
              setEditorState((prev) => ({ ...prev, currentImage: version }))
            }
            currentVersionId={editorState.currentImage?.id ?? null}
          />
        </div>
      </main>
    </div>
  );
}