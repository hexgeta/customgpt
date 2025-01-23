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
        
        // Create blob URLs first
        console.log('Creating blob URLs...');
        const coreURL = await toBlobURL(
          new URL('/ffmpeg-core.js', window.location.href).href,
          'text/javascript'
        );
        console.log('Core URL created');
        
        const wasmURL = await toBlobURL(
          new URL('/ffmpeg-core.wasm', window.location.href).href,
          'application/wasm'
        );
        console.log('WASM URL created');

        // Load FFmpeg
        console.log('Loading FFmpeg with blob URLs...');
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
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        resolve({
          duration: video.duration,
          fps: 30 // Default assumption
        });
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const extractFrames = async (video: File, metadata: VideoMetadata): Promise<string[]> => {
    if (!loaded) throw new Error("FFmpeg not loaded");
    
    setProcessing(true);
    try {
      // Write the input video file
      await ffmpeg.writeFile("input.mp4", await fetchFile(video));

      // Extract frames using fps filter
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-vf', `fps=1/${(metadata.duration/20)}`,  // Extract 20 frames evenly spaced
        '-frame_pts', '1',
        '-vsync', '0',
        'frame-%d.png'
      ]);

      // Read the extracted frames
      const extractedFrames = [];
      for (let i = 1; i <= 20; i++) {
        try {
          const frameData = await ffmpeg.readFile(`frame-${i}.png`);
          const frameBlob = new Blob([frameData], { type: "image/png" });
          const frameURL = URL.createObjectURL(frameBlob);
          extractedFrames.push(frameURL);
        } catch (error) {
          console.error(`Error reading frame ${i}:`, error);
        }
      }

      if (extractedFrames.length === 0) {
        throw new Error("No frames were extracted");
      }

      // Create composite image with 5x4 grid layout
      try {
        await ffmpeg.exec([
          '-pattern_type', 'sequence',
          '-i', 'frame-%d.png',
          '-vf', 'tile=5x4:padding=10:margin=20',
          'composite.png'
        ]);

        // Read the composite image
        const compositeData = await ffmpeg.readFile('composite.png');
        const compositeBlob = new Blob([compositeData], { type: 'image/png' });
        const compositeURL = URL.createObjectURL(compositeBlob);
        setCompositeImage(compositeURL);
      } catch (error) {
        console.error('Error creating composite:', error);
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
    compositeImage
  };
}; 