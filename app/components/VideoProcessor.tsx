'use client'

import React, { useState, useCallback } from "react";
import { useFFmpeg } from "../hooks/useFFmpeg";

const VideoProcessor = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [frames, setFrames] = useState<string[]>([]);
  const [metadata, setMetadata] = useState<{ duration: number; fps: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { loaded, processing, getVideoMetadata, extractFrames, compositeImage, setCompositeImage } = useFFmpeg();

  const handleFile = async (file: File) => {
    try {
      console.log('Handling file:', {
        type: file.type,
        size: file.size,
        name: file.name
      });

      // Check file size (100MB limit)
      if (file.size > 100 * 1024 * 1024) {
        alert('File is too large. Please upload a video smaller than 100MB.');
        return;
      }

      // Accept any video file, even if MIME type is not set correctly
      const validExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv'];
      const hasValidExtension = validExtensions.some(ext => 
        file.name.toLowerCase().endsWith(ext)
      );

      if (!file.type.startsWith('video/') && !hasValidExtension) {
        alert('Please upload a valid video file (mp4, webm, mov, avi, mkv)');
        return;
      }

      setVideo(file);
      setFrames([]);
      setCompositeImage(null);

      console.log('Getting video metadata...');
      const metadata = await getVideoMetadata(file);
      console.log('Video metadata:', metadata);
      setMetadata(metadata);
      
    } catch (error: any) {
      console.error('Error handling file:', error);
      alert(error?.message || 'Error handling file. Please try again.');
      setVideo(null);
      setMetadata(null);
      setFrames([]);
      setCompositeImage(null);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const processVideo = async () => {
    if (!video || !metadata) return alert("Please upload a video first!");
    if (!loaded) return alert("FFmpeg is not loaded yet. Please wait.");

    try {
      setFrames([]); // Clear previous frames
      setCompositeImage(null); // Clear previous composite
      console.log('Starting video processing...');
      const extractedFrames = await extractFrames(video, metadata);
      console.log('Video processing complete');
      setFrames(extractedFrames);
    } catch (error: any) {
      console.error('Error processing video:', error);
      alert(error?.message || 'Error processing video. Please check console for details.');
      setFrames([]);
      setCompositeImage(null);
    }
  };

  const handleDownload = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div 
        className={`w-[400px] h-[225px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center mb-8 transition-colors ${
          isDragging ? 'border-[#ff69b4] bg-[#ff69b4]/10' : 'border-[#00ffff]'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept=".mp4,.webm,.mov,.avi,.mkv,video/*"
          onChange={handleFileChange}
          className="hidden"
          id="video-upload"
        />
        <label 
          htmlFor="video-upload" 
          className="cursor-pointer text-center p-4"
        >
          <p className="text-[#00ffff] text-lg mb-1">DROP VIDEO HERE</p>
          <p className="text-[#00ffff]/60 text-sm">[ mp4 / webm / mov / avi / mkv ]</p>
          {metadata && (
            <div className="mt-2 text-[#ff69b4] text-sm">
              <p>Duration: {metadata.duration.toFixed(2)} seconds</p>
              <p>FPS: {metadata.fps}</p>
              {metadata.duration === 10 && (
                <p className="text-yellow-400 text-xs mt-1">
                  ⚠️ Using estimated duration
                </p>
              )}
            </div>
          )}
        </label>
      </div>

      <div className="w-[400px] flex justify-center gap-4 mb-8">
        <button 
          onClick={processVideo}
          disabled={!video || processing || !loaded}
          className={`px-8 py-2 border rounded-md ${
            !video || processing || !loaded 
              ? 'border-gray-600 text-gray-600' 
              : 'border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff]/10'
          } transition-colors`}
        >
          {!loaded ? "Loading FFmpeg..." : processing ? "Processing..." : "Extract Frames"}
        </button>
      </div>

      {frames.length > 0 && (
        <div className="w-[400px] space-y-8">
          <div className="space-y-4">
            <h2 className="text-[#00ffff] text-xl text-center">Individual Frames</h2>
            <div className="grid grid-cols-3 gap-2">
              {frames.map((frame, index) => (
                <div 
                  key={index} 
                  className="relative group cursor-pointer"
                  onClick={() => handleDownload(frame, `frame-${index + 1}.png`)}
                >
                  <div className="aspect-video w-full relative">
                    <img
                      src={frame}
                      alt={`Frame ${index + 1}`}
                      className="w-full h-full object-cover rounded-md border border-[#00ffff]/20"
                    />
                    <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs">
                      {index + 1}
                    </div>
                    <button
                      className="absolute top-2 right-2 bg-[#ff69b4] text-white w-6 h-6 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                      title="Download frame"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {compositeImage && (
            <div className="space-y-4">
              <h2 className="text-[#00ffff] text-xl text-center">Composite Timeline</h2>
              <div 
                className="relative group cursor-pointer" 
                onClick={() => handleDownload(compositeImage, 'composite-timeline.png')}
              >
                <div className="relative">
                  <img
                    src={compositeImage}
                    alt="All frames combined"
                    className="w-full rounded-md border border-[#00ffff]/20"
                  />
                  <button
                    className="absolute top-2 right-2 bg-[#ff69b4] text-white w-6 h-6 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                    title="Download timeline"
                  >
                    ↓
                  </button>
                </div>
              </div>
              <p className="text-[#00ffff]/60 text-sm text-center">
                Click on any frame to download it
              </p>
              <p className="text-[#00ffff]/60 text-sm text-center mt-4">
                Prompt: Recreate this UI animation as a demo component for me in react ignore the cursor and focus on recreating the UI functionality only. Use Shadcn, framer motion or any other libraries or code you think you need. But simple is best.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoProcessor; 