'use client'

import { useState, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

interface VideoMetadata {
  duration: number;
  fps: number;
}

export const useFFmpeg = () => {
  const [ffmpeg] = useState(() => new FFmpeg());
  const [loaded, setLoaded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [compositeImage, setCompositeImage] = useState<string | null>(null);

  useEffect(() => {
    loadFFmpeg();
  }, []);

  const loadFFmpeg = async () => {
    if (!ffmpeg.loaded) {
      try {
        console.log('Starting FFmpeg loading...');
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
        console.log('Using baseURL:', baseURL);
        
        const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript");
        const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm");
        
        console.log('Core URLs created:', { coreURL, wasmURL });
        
        await ffmpeg.load({
          coreURL,
          wasmURL,
        });
        
        setLoaded(true);
        console.log('FFmpeg loaded successfully');
      } catch (error: any) {
        console.error('Error loading FFmpeg:', error);
        console.error('Error details:', {
          message: error?.message || 'Unknown error',
          stack: error?.stack,
          name: error?.name
        });
        throw new Error(`Failed to load FFmpeg: ${error?.message || 'Unknown error'}`);
      }
    }
  };

  const getVideoMetadata = async (file: File): Promise<VideoMetadata> => {
    try {
      return await new Promise((resolve, reject) => {
        let resolved = false;
        const video = document.createElement('video');
        
        // Set crossOrigin to anonymous to prevent CORS issues
        video.crossOrigin = 'anonymous';
        video.preload = 'metadata';
        
        // Set a timeout in case the video fails to load
        const timeoutId = setTimeout(() => {
          if (!resolved) {
            URL.revokeObjectURL(video.src);
            reject(new Error('Timeout loading video metadata'));
          }
        }, 5000);

        video.onloadedmetadata = () => {
          resolved = true;
          clearTimeout(timeoutId);
          URL.revokeObjectURL(video.src);

          // Check if we got valid metadata
          if (!video.duration || isNaN(video.duration)) {
            reject(new Error('Invalid video duration'));
            return;
          }

          resolve({
            duration: video.duration,
            fps: 30 // Default assumption
          });
        };
        
        video.onerror = (e) => {
          resolved = true;
          clearTimeout(timeoutId);
          URL.revokeObjectURL(video.src);
          console.error('Video error:', video.error);
          reject(new Error(`Failed to load video: ${video.error?.message || 'Unknown error'}`));
        };

        // Try loading the video
        try {
          const objectUrl = URL.createObjectURL(file);
          console.log('Created object URL for video:', objectUrl);
          video.src = objectUrl;
        } catch (error) {
          resolved = true;
          clearTimeout(timeoutId);
          reject(new Error('Failed to create URL for video'));
        }
      });
    } catch (error) {
      console.warn('Failed to get video metadata, using fallback values:', error);
      // Return fallback metadata
      return {
        duration: 10, // Assume 10 seconds
        fps: 30
      };
    }
  };

  const extractFrames = async (video: File, metadata: VideoMetadata): Promise<string[]> => {
    if (!loaded) throw new Error("FFmpeg not loaded");
    
    console.log('Processing video:', {
      type: video.type,
      size: video.size,
      name: video.name
    });
    
    setProcessing(true);
    try {
      // Clean up any existing frames first
      try {
        const files = await ffmpeg.listDir('/');
        for (const file of files) {
          if (file.name.startsWith('frame-') || file.name === 'composite.png' || file.name === 'input.mp4') {
            await ffmpeg.deleteFile(file.name);
          }
        }
        console.log('Cleaned up previous files');
      } catch (error) {
        console.warn('Error cleaning up files:', error);
      }

      console.log('Writing input file...');
      await ffmpeg.writeFile("input.mp4", await fetchFile(video));

      // Try to extract frames with different frame counts
      const frameCounts = [30, 20, 10];
      let extractedFrames: string[] = [];
      let successfulFrameCount = 0;

      for (const targetFrames of frameCounts) {
        try {
          // Clean up any existing frame files before each attempt
          try {
            const files = await ffmpeg.listDir('/');
            for (const file of files) {
              if (file.name.startsWith('frame-')) {
                await ffmpeg.deleteFile(file.name);
              }
            }
          } catch (error) {
            console.warn('Error cleaning up frame files:', error);
          }

          const frameInterval = Math.max(0.1, metadata.duration / targetFrames);
          console.log(`Attempting to extract ${targetFrames} frames with interval:`, frameInterval);
          
          await ffmpeg.exec([
            '-i', 'input.mp4',
            '-vf', `fps=1/${frameInterval}`,
            '-frame_pts', '1',
            '-vsync', '0',
            'frame-%d.png'
          ]);

          // Try reading the frames
          const frames = [];
          for (let i = 1; i <= targetFrames; i++) {
            try {
              const frameData = await ffmpeg.readFile(`frame-${i}.png`);
              const frameBlob = new Blob([frameData], { type: "image/png" });
              const frameURL = URL.createObjectURL(frameBlob);
              frames.push(frameURL);
              console.log(`Frame ${i}/${targetFrames} extracted successfully`);
            } catch (error) {
              console.error(`Error reading frame ${i}:`, error);
              break;
            }
          }

          if (frames.length >= targetFrames * 0.8) { // If we got at least 80% of frames
            extractedFrames = frames;
            successfulFrameCount = targetFrames;
            console.log(`Successfully extracted ${frames.length} frames at ${targetFrames} target`);
            break;
          } else {
            console.log(`Only got ${frames.length}/${targetFrames} frames, trying lower frame count...`);
            // Clean up the partial frames
            frames.forEach(url => URL.revokeObjectURL(url));
          }
        } catch (error) {
          console.error(`Failed at ${targetFrames} frames, trying lower frame count...`, error);
          continue;
        }
      }

      if (extractedFrames.length === 0) {
        throw new Error("Could not extract any frames at any quality level");
      }

      console.log(`Successfully extracted ${extractedFrames.length} frames`);

      // Create composite image with appropriate grid layout
      console.log('Creating composite image...');
      try {
        // Calculate grid dimensions based on frame count
        let cols, rows;
        if (successfulFrameCount === 30) {
          cols = 6;
          rows = 5;
        } else if (successfulFrameCount === 20) {
          cols = 5;
          rows = 4;
        } else {
          cols = 5;
          rows = 2;
        }

        await ffmpeg.exec([
          '-pattern_type', 'sequence',
          '-i', 'frame-%d.png',
          '-vf', `tile=${cols}x${rows}:padding=10:margin=20`,
          'composite.png'
        ]);

        // Read the composite image
        const compositeData = await ffmpeg.readFile('composite.png');
        const compositeBlob = new Blob([compositeData], { type: 'image/png' });
        const compositeURL = URL.createObjectURL(compositeBlob);
        setCompositeImage(compositeURL);
        console.log('Composite image created successfully');
      } catch (error) {
        console.error('Error creating composite:', error);
        throw new Error('Failed to create composite image');
      }

      return extractedFrames;
    } catch (error) {
      console.error('Error in extractFrames:', error);
      throw error;
    } finally {
      setProcessing(false);
    }
  };

  return {
    loaded,
    processing,
    getVideoMetadata,
    extractFrames,
    compositeImage,
    setCompositeImage
  };
}; 